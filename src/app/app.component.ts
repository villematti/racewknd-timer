import { Component, OnInit } from "@angular/core";
import { SocketIO } from "nativescript-socketio/socketio";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    constructor(private socketIo: SocketIO) {}

    ngOnInit() {
        
        this.socketIo.connect();
    }
}
