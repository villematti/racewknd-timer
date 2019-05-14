import { Component } from "@angular/core";
import { Constants } from "../constants/urls";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ApiService } from "../services/api.service";
import { Location } from "@angular/common";
import { Start } from "../types/Start";

@Component({
    selector: "ClassesComponent",
    moduleId: module.id,
    templateUrl: "./classes.component.html",
    styleUrls: ["./../app.component.css"]
})
export class ClassesComponent {
    race: any = {};

    classes = [];

    constructor(
        private router: Router,
        private api: ApiService,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) {
        this.activatedRoute.queryParams.subscribe(val => {
            this.race = val;
        }).unsubscribe();
    }

    ngAfterViewInit(): void {
        this.getClasses();
    }

    getClasses() {
        this.api.get$(Constants.GET_CLASSES).subscribe(response => {
            this.classes = JSON.parse(response.content);
        })
    }

    onItemTap(event: any) {
        const params = {
            queryParams: {
                class: this.classes[event.index].id,
                race: JSON.stringify(this.race)
            }
        }
        this.router.navigate(["starts"], params);
    }

    onBack() {
        this.location.back();
    }
}