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

@Component({
    selector: "Start",
    moduleId: module.id,
    templateUrl: "./start.component.html",
    styleUrls: ["./../app.component.css"]
})
export class StartComponent implements OnInit, OnDestroy {

    start: Start | undefined;

    competitors: any[] = [];

    disabledIndex: number[] = [];

    subscriptions = new Subscription();

    currentLap = 1;

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
            this.getCompetitors();
            this.startSubscription()
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
        if (this.disabledIndex.indexOf(event.index) !== -1) {
            return;
        }

        this.disableBtn(event.index);

        const competitor = this.competitors[event.index];

        const formData = new FormData()
        formData.append("competitorId", competitor.id);
        formData.append("startId", this.start.id);


        this.api.get$(Constants.ADD_LAPTIME, "POST", formData).subscribe((result) => {
            const res = JSON.parse(result.content);
            if (res.code === 200) {
                // this.competitors[event.index] = res.competitor;
            }
        })
    }

    onEdit() {
        const params = {
            queryParams: this.start
        }
        this.router.navigate(["edit-start"], params);
    }

    onCompetitorInfo() {
        const params = {
            queryParams: this.start
        }
        this.router.navigate(["check-competitors"], params);
    }

    disableBtn(index: number): void {
        if (this.disabledIndex.indexOf(index) !== -1) {
            return;
        }

        this.disabledIndex.push(index);

        setTimeout(() => {
            this.disabledIndex = this.disabledIndex.filter(i => i !== index);
        }, 10000);
    }

    startSubscription() {
        const sub = this.theSocket().subscribe((res: any) => {
            this.ngZone.run(() => {
                res.forEach(c => {
                    if (c.position === 1) {
                        this.currentLap = c.currentLap;
                    }
                });
                res.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
                this.competitors = res;
            })
        })

        this.subscriptions.add(sub);
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

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
