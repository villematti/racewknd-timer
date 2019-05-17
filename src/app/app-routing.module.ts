import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { StartComponent } from "./start/start.component";
import { HomeComponent } from "./home/home.component";
import { RacesComponent } from "./races/races.component";
import { StartsComponent } from "./starts/starts.component";
import { AddStartComponent } from "./starts/add-start/add-start.component";
import { EditStartComponent } from "./start/edit-start/edit-start.component";
import { CreateCompetitorComponent } from "./competitors/create-competitor.component";
import { ClassesComponent } from "./classes/classes.component";
import { StartCompetitorsComponent } from "./start/start-competitors.component";

const routes: Routes = [
    { path: "", redirectTo: "/races", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "races", component: RacesComponent },
    { path: "starts", component: StartsComponent },
    { path: "start/:id",  component: StartComponent },
    { path: "add-start", component: AddStartComponent },
    { path: "edit-start", component: EditStartComponent },
    { path: "create-competitor", component: CreateCompetitorComponent},
    { path: "classes", component: ClassesComponent },
    { path: "check-competitors", component: StartCompetitorsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
