import { inject } from "@angular/core";
import { Services } from "../../../environments/services/services.dev";
import { HttpClient } from "@angular/common/http";


export abstract class BaseApiService {

    protected baseUrl = Services.gestorGrafo;
    protected http = inject(HttpClient);

    constructor(base: string, endpoint: string) {

    }
}