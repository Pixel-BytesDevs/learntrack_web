import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LocalStorage{
    
    save(key: string, value: string ){
        localStorage.setItem(key,value);
    }

}