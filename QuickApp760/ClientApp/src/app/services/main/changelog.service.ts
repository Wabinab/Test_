import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConfigurationService } from '../configuration.service';
import { catchError } from 'rxjs/operators';
import { EndpointBase } from '../endpoint-base.service';
import { AuthService } from '../auth.service';
import { CfUtil } from '../tlib/cf-util';

@Injectable({
  providedIn: 'root'
})
export class ChangelogService extends EndpointBase {
  baseUrl: string;
  http: HttpClient;
  apiUrl = "api/Changelogs";

  constructor(http: HttpClient, configurations: ConfigurationService, authService: AuthService) {
    super(http, authService);
    this.baseUrl = configurations.homeUrl;
  }

  gets(filter: any, pageNumber: number, size: number): Observable<any> {
    const url = `${this.baseUrl}${this.apiUrl}/SList?keyword=${filter.keyword.trim()}&table=${filter.table}&user=${filter.userName}&action=${filter.action}&dStart=${CfUtil.dateToYMDStr(filter.dStart)}&dEnd=${CfUtil.dateToYMDStr(filter.dEnd)}&pageNo=${pageNumber}&pageSize=${size}`;
    return this.http.get(url, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.gets(filter.keyword, pageNumber, size));
      }));
  }
  get(id: number): Observable<any> {
    const url = `${this.baseUrl}${this.apiUrl}/${id}`;
    return this.http.get(url, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.get(id));
      }));
  }

  getFilters(): Observable<any> {
    const url = `${this.baseUrl}${this.apiUrl}/Filters`;
    return this.http.get(url, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getFilters());
      }));
  }

  getKeyList(table: string, keyVal: string): Observable<any> {
    //-keyVal: Primary key eg.Id
    const url = `${this.baseUrl}${this.apiUrl}/KeyList?table=${table}&keyval=${keyVal}`;
    return this.http.get(url, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getKeyList(table,keyVal));
      }));
  }
}
