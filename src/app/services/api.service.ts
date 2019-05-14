import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { request, HttpRequestOptions } from "tns-core-modules/http/http";

@Injectable()
export class ApiService {
    get$(path: string, method?: string, params?: string | FormData): Observable<any>{
        const options: HttpRequestOptions = {
            url: path,
            method: method ? method : "GET"
        };

        if (params) {
            options.content = params;
        }

        return from(request(options));
    }
}
