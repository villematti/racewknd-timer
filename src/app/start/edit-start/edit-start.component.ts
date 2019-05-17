import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Start } from "~/app/types/Start";
import { Location } from "@angular/common";
import { ApiService } from "~/app/services/api.service";
import { Constants } from "~/app/constants/urls";

@Component({
    selector: "Edit-start",
    moduleId: module.id,
    templateUrl: "./edit-start.component.html",
    styleUrls: ["./../../app.component.css"]
})
export class EditStartComponent implements OnInit {

    @ViewChild("yellowFlagSwitch") _yellowFlagSwitch: ElementRef;
    @ViewChild("redFlagSwitch") _redFlagSwitch: ElementRef;
    @ViewChild("blackFlagSwitch") _blackFlagSwitch: ElementRef;

    start: Start | undefined;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly location: Location,
        private readonly api: ApiService,
        private readonly router: Router
    ) {
        this.activatedRoute.queryParams.subscribe((val: Start) => {
            this.start = val;
            this.updateStart();
        }).unsubscribe();

        router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this.updateStart();
            }
          })
    }

    ngOnInit(): void {
        
    }

    updateStart() {
        if (!this.start) {
            return;
        }

        const formData = new FormData();

        formData.append("id", this.start.id);
        this.api.get$(Constants.GET_START_BY_ID, "POST", formData).subscribe((result) => {
            this.start = JSON.parse(result.content);
            this.setFlagView();
        });
    }

    onBack() {
        this.location.back();
    }

    toggleFlag(flag: string) {
        this.start[flag] = !this.start[flag];

        const formData = new FormData();

        formData.append("id", this.start.id);
        formData.append("flagType", flag);
        formData.append("flagValue", `${this.start[flag]}`);

        this.api.get$(Constants.SET_START_FLAG, "POST", formData)
            .subscribe((result) => {
                this.start = JSON.parse(result.content);
                this.setFlagView();
            });
    }

    setFlagView() {
        this._yellowFlagSwitch.nativeElement.checked = this.start.yellowFlag;
        this._blackFlagSwitch.nativeElement.checked = this.start.blackFlag;
        this._redFlagSwitch.nativeElement.checked = this.start.redFlag;
    }

    onLoaded() {
        return true;
    }

    onTapStart() {
        if (this.start.started) {
            return;
        }

        const formData = new FormData();

        formData.append("id", this.start.id);

        this.api.get$(Constants.START_START, "POST", formData)
            .subscribe((result) => {
                console.log(result);
            });
    }
}