import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Start } from "../types/Start";
import { ActivatedRoute } from "@angular/router";
import { Constants } from "../constants/urls";

Component({
    selector: "CreateCompetitor",
    templateUrl: "./create-competitor.component.html",
    styleUrls: ["./../add.component.css"]
})
export class CreateCompetitorComponent implements OnInit {

    start: Start | undefined;
    drivers = [];

    constructor(
        private readonly api: ApiService,
        private readonly activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.queryParams.subscribe((val: Start) => {
            this.start = val;
            this.getDrivers();
        }).unsubscribe();
    }
    
    ngOnInit() {

    }

    onCreateCompetitor() {

    }

    onDriverChange() {

    }

    getDrivers() {
        const formData = new FormData();

        formData.append("classId", this.start.classId);

        this.api.get$(Constants.GET_DRIVERS, "POST", formData).subscribe(result => {
            this.drivers = JSON.parse(result.content);
        })
    }
}
