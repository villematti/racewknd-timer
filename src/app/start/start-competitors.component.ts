import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import { request, getFile, getImage, getJSON, getString, HttpResponse, HttpRequestOptions } from "tns-core-modules/http";
import { NavigationOptions } from "nativescript-angular/router/ns-location-strategy";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ApiService } from "../services/api.service";
import { Constants } from "../constants/urls";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { Start } from "../types/Start";
import { SocketIO } from "nativescript-socketio/socketio";
import { Observable, Subscription } from "rxjs";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

@Component({
    selector: "StartCompetitors",
    moduleId: module.id,
    templateUrl: "./start-competitors.component.html",
    styleUrls: ["./../app.component.css"]
})
export class StartCompetitorsComponent implements OnInit, OnDestroy {

    start: Start | undefined;

    competitors: any[] = [];

    currentLap: number = 1;

    subscription = new Subscription();

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly location: Location,
        private readonly api: ApiService,
        private readonly router: Router,
        private readonly socket: SocketIO,
        private readonly ngZone: NgZone,
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((val: Start) => {
            this.start = val;
            this.initialCompetitors();
            this.getCompetitors();
        }).unsubscribe();
    }

    initialCompetitors() {
        const formData = new FormData()
        formData.append("startId", this.start.id);

        this.api.get$(Constants.GET_STANDINGS, "POST", formData).subscribe(result => {
            this.competitors = JSON.parse(result.content);

            this.competitors.forEach(c => {
                if (c.position === 1) {
                    this.currentLap = c.currentLap;
                }
            });
        })
    }

    getCompetitors() {
        const sub = this.theSocket().subscribe((res: any) => {
            this.ngZone.run(() => {
                this.competitors = res;
                this.competitors.forEach(c => {
                    if (c.position === 1) {
                        this.currentLap = c.currentLap;
                    }
                });
            })
        })

        this.subscription.add(sub);
    }

    private theSocket() {
        return new Observable(observe => {
            this.socket.on(`standings_${this.start.id}`, (res: any) => {
                observe.next(res);
            });
    
            setTimeout(() => {
                this.socket.emit('subscribeToLaptimes', this.start.id);
            }, 1000)
        })
    }

    onBack() {
        this.location.back();
    }

    onItemTap(event: any) {
        
    }

    onEdit() {
        const params = {
            queryParams: this.start
        }
        this.router.navigate(["edit-start"], params);
    }

    tapOnButton() {
        console.log("Button tapped");
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
