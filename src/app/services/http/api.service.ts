import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';
import { Observable as __Observable, throwError, from } from 'rxjs';
import { map as __map, filter as __filter, catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient, 
    protected config: ApiConfiguration
    ) { }

    public get(url: any): __Observable<[]> {    
      return this.httpClient.get<[]>(url, {responseType: 'json'})    
      .pipe(catchError(this.handleError))  
    }

    public post(url,data:any):__Observable<any>{    
      let headers = { 'Content-Type':'application/json' };     
      return this.httpClient.post<any>(url, data, {headers,responseType: 'json'})
      .pipe(catchError(this.handleError))  
    }

    // Error handling   
    handleError(error) {      
      let errorMessage = '';      
      if(error.error instanceof ErrorEvent) {        
        // Get client-side error        
        errorMessage = error.error.message;      
      } else {        
        // Get server-side error        
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;      
      }      
      return throwError(errorMessage);  
    }


}
