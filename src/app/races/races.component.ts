import { Component, OnInit } from "@angular/core";
import { request, getFile, getImage, getJSON, getString, HttpResponse, HttpRequestOptions } from "tns-core-modules/http";
import { NavigationOptions } from "nativescript-angular/router/ns-location-strategy";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ApiService } from "../services/api.service";
import { Constants } from "../constants/urls";

@Component({
    selector: "Races",
    moduleId: module.id,
    templateUrl: "./races.component.html",
    styleUrls: ["./../app.component.css"]
})
export class RacesComponent implements OnInit {

    races: any = {};

    constructor(
        private api: ApiService,
        private router: Router
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.api.get$(Constants.GET_RACES).subscribe(response => {
            this.races = JSON.parse(response.content);
        });
    }

    onItemTap(event: any) {
        const params = {
            queryParams: this.races[event.index]

        }
        this.router.navigate(["/classes"], params);
    }
}
