import { Component, OnInit, AfterViewChecked, AfterViewInit, DoCheck } from "@angular/core";
import { request, getFile, getImage, getJSON, getString, HttpResponse } from "tns-core-modules/http";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ApiService } from "../services/api.service";
import { Constants } from "../constants/urls";
import { Location } from "@angular/common";
import { Start } from "../types/Start";

@Component({
    selector: "Starts",
    moduleId: module.id,
    templateUrl: "./starts.component.html",
    styleUrls: ["./../app.component.css"]
})
export class StartsComponent implements AfterViewInit {

    race: any = {};

    class: string | undefined;

    starts: Start[] = [];

    constructor(
        private router: Router,
        private api: ApiService,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) {
        this.activatedRoute.queryParams.subscribe(val => {
            this.race = JSON.parse(val.race);
            this.class = val.class;
            console.log("How does this goes: ", this.race);
            console.log("How does classes work: ", this.class);

        }).unsubscribe();

        router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this.getStarts();
            }
          })
    }

    ngAfterViewInit(): void {
        this.getStarts();
    }

    getStarts() {
        if (!this.race.id) {
            return;
        }
        const formData = new FormData();
        formData.append("id", this.race.id);
        this.api.get$(Constants.GET_STARTS, "POST", formData).subscribe(response => {
            this.starts = JSON.parse(response.content).filter(s => s.classId === this.class);
        });
    }

    onItemTap(event: any) {
        const params = {
            queryParams: this.starts[event.index]
        }
        this.router.navigate(["start", event.index], params);
    }

    onBack() {
        this.location.back();
    }

    onAdd() {
        const params = {
            queryParams: this.race
        }
        this.router.navigate(["add-start"], params);
    }
}
