import { Component, OnInit } from "@angular/core";
import { request, getFile, getImage, getJSON, getString, HttpResponse, HttpRequestOptions } from "tns-core-modules/http";
import { NavigationOptions } from "nativescript-angular/router/ns-location-strategy";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ApiService } from "../services/api.service";
import { Constants } from "../constants/urls";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { Start } from "../types/Start";

@Component({
    selector: "Start",
    moduleId: module.id,
    templateUrl: "./start.component.html",
    styleUrls: ["./../app.component.css"]
})
export class StartComponent implements OnInit {

    start: Start | undefined;

    competitors: any[] = [];

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly location: Location,
        private readonly api: ApiService,
        private readonly router: Router
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((val: Start) => {
            this.start = val;
            this.getCompetitors();
        }).unsubscribe();
    }

    getCompetitors() {
        if (!this.start || this.start.competitors.length === 0) {
            return;
        }
        const formData = new FormData();
        formData.append("ids", this.start.competitors.join(","));
        this.api.get$(Constants.GET_COMPETITORS, "POST", formData).subscribe(response => {
            const resp = response.content.toJSON();
            resp.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
            this.competitors = resp;
        });
    }

    onBack() {
        this.location.back();
    }

    onItemTap(event: any) {
        const competitor = this.competitors[event.index];

        const formData = new FormData()
        formData.append("competitorId", competitor.id);
        formData.append("startId", this.start.id);


        this.api.get$(Constants.ADD_LAPTIME, "POST", formData).subscribe((result) => {
            
        })
    }

    onEdit() {
        const params = {
            queryParams: this.start
        }
        this.router.navigate(["edit-start"], params);
    }
}
