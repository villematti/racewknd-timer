import { Component, OnInit } from "@angular/core";
import { request, getFile, getImage, getJSON, getString, HttpResponse } from "tns-core-modules/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { ApiService } from "~/app/services/api.service";
import { Constants } from "~/app/constants/urls";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { TextField } from "tns-core-modules/ui/text-field";
import { createChangeDetectorRef } from "@angular/core/src/view/refs";

@Component({
    selector: "Add-start",
    moduleId: module.id,
    templateUrl: "./add-start.component.html",
    styleUrls: ["./../../app.component.css"]
})
export class AddStartComponent implements OnInit {

    race: any = {};

    classes: any[] = [];

    classList: any[] = [];

    laps = Array.from(new Array(30),(val,index)=>index);

    selectedLap = 0;

    startName = "";

    selectedClassId = "";

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly location: Location,
        private readonly api: ApiService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(val => {
            this.race = val;
        }).unsubscribe();

        this.api.get$(Constants.GET_CLASSES).subscribe(result => {
            try {
                this.classes = JSON.parse(result.content);
                this.classList = this.classes.map(c => c.className);
            } catch (e) {
                console.log("Errors on getting classes: ", e);
            }
        });
    }

    onBack() {
        this.location.back();
    }

    classChange(e: any) {
        let picker = <ListPicker>e.object;
        this.classes.forEach((c, i) => {
            if (i === picker.selectedIndex) {
                this.selectedClassId = c.id;
            }
        })
    }

    lapChange(e: any) {
        let picker = <ListPicker>e.object;
        this.laps.forEach((c, i) => {
            if (i === picker.selectedIndex) {
                this.selectedLap = c;
            }
        })
    }

    onNameChange(e: any) {
        let textField = <TextField>e.object;
        this.startName = textField.text;
    }

    onSubmit() {
        if (!this.startName || !this.selectedClassId) {
            return;
        }

        const formData = new FormData();
        formData.append("raceId", this.race.id);
        formData.append("classId", this.selectedClassId);
        formData.append("startName", this.startName);
        formData.append("laps", this.selectedLap.toString());

        this.api.get$(Constants.CREATE_START, "POST", formData)
            .subscribe(result => {
                try {
                    const res = JSON.parse(result.content);
                    if (res.status === "Job Done") {
                        this.onBack();
                    }
                } catch (e) {
                    console.log("Error creating start: ", e);
                }
            });
    }
}
