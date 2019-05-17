import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StartComponent } from "./start/start.component";
import { HomeComponent } from "./home/home.component";
import { RacesComponent } from "./races/races.component";
import { ApiService } from "./services/api.service";
import { StartsComponent } from "./starts/starts.component";
import { AddStartComponent } from "./starts/add-start/add-start.component";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { EditStartComponent } from "./start/edit-start/edit-start.component";
import { ClassesComponent } from "./classes/classes.component";
import { StartCompetitorsComponent } from "./start/start-competitors.component";
import { SocketIOModule } from "nativescript-socketio/angular";
import { LaptimePipe } from "./pipes/laptime-pipe";

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUIListViewModule,
        SocketIOModule.forRoot("https://racewkndapp.com"),
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        StartComponent,
        RacesComponent,
        StartsComponent,
        AddStartComponent,
        EditStartComponent,
        ClassesComponent,
        StartCompetitorsComponent,
        LaptimePipe
    ],
    providers: [
        ApiService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
