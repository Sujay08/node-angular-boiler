import { Injectable } from '@angular/core';
/** * Global configuration for Api services */
@Injectable({  
    providedIn: 'root',
})

export class ApiConfiguration {
    baseUrl ='http://localhost:3000/api/';
    allUsers = "users/all";     
    fixturesFifa = "fixture/fifa";
    fifaScore = "fixture/fifa/score";

}

// export interface ApiConfigurationInterface {    } 