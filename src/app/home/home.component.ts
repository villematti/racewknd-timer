import { Component, OnInit } from "@angular/core";
import { request, getFile, getImage, getJSON, getString, HttpResponse } from "tns-core-modules/http";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { Constants } from "../constants/urls";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./../app.component.css"]
})
export class HomeComponent implements OnInit {

    starts: any[] = []

    constructor(private router: Router, private api: ApiService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.api.get$(Constants.GET_STARTS).subscribe(response => {
            const value = response.content.toJSON();
            value.forEach(v => {
                this.starts.push(v);
            });
        });
    }

    onItemTap(event: any) {
        const params = {
            queryParams: this.starts[event.index]

        }
        this.router.navigate(["start", event.index], params);
    }
}
