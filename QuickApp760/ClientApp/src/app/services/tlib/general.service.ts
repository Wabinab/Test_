import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConfigurationService } from '../configuration.service';
import { catchError } from 'rxjs/operators';
import { EndpointBase } from '../endpoint-base.service';
import { AuthService } from '../auth.service';


@Injectable()
export class GeneralService extends EndpointBase {
  baseUrl: string;
  http: HttpClient;
  apiUrl = "api/General";

  constructor(http: HttpClient, configurations: ConfigurationService, authService: AuthService) {
    super(http, authService);
    this.baseUrl = configurations.homeUrl;
  }

  getSetting(): Observable<any> {
    const url = `${this.baseUrl}${this.apiUrl}/Setting`;
    return this.http.get(url,this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getSetting());
      }));
  }
  updSetting(model: any): Observable<any> {
    const url = `${this.baseUrl}${this.apiUrl}/Setting`;
    const body = JSON.stringify(model);
    return this.http.put(url, body, this.requestHeaders);
  }

  getHost(): Observable<any> {
    const url = `${this.baseUrl}${this.apiUrl}/Host`;
    return this.http.get<any>(url, this.requestHeaders);
  }

}
