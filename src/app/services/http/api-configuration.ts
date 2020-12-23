import { Injectable } from '@angular/core';
/** * Global configuration for Api services */
@Injectable({  
    providedIn: 'root',
})

export class ApiConfiguration {
    baseUrl ='http://localhost:3000/api/';
    allUsers = "users/all";     
    fifaTable = "table/fifa"; 
    allGames = "table/all-games"
    fixturesFifa = "fixture/fifa";
    fixturesNba = "fixture/nba";
    fifaScore = "fixture/fifa/score";
    nbaTable = "table/nba"; 
    nbaScore = "fixture/nba/score"

}

// export interface ApiConfigurationInterface {    } 