import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  static readonly API_URL = environment.baseUrl;
  public httpCode: number;
  public message: string;
   /* Http get for given Url and header */
   constructor(
      private http: HttpClient,
      private router: Router,
      public toastr: ToastrManager,
    ) { }
    createHeader(header : any){
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Cache-Control', 'no-cache');
      headers = headers.append('Content-Type', 'application/json');
      if (header) {
          for (var key in header) {
            let type = typeof header[key];
            if (type !== 'string') {
              headers = headers.append(key, JSON.stringify(header[key]));
            } else {
              headers = headers.append(key, header[key]);
            }
          }
        }
    
        let httpOptions = {
          headers: headers
        };
        return httpOptions;
    }
    get(url: any, header: any) {
        let httpOptions = this.createHeader(header);
        return this.http.get<any>(`${ApiServicesService.API_URL}/` + url, httpOptions);
    }

    /* Http post for given Url,header and data(Body) */
    post(url: any, header: any, data: any) {
        let httpOptions = this.createHeader(header);
        return this.http.post<any>(`${ApiServicesService.API_URL}/` + url, data ? JSON.stringify(data) : {}, httpOptions);
    }

    /* Http put for given Url,header and data(Body) */
    put(url: any, header: any, data: any) {
        let httpOptions = this.createHeader(header);
        return this.http.put<any>(`${ApiServicesService.API_URL}/` + url, data ? JSON.stringify(data) : {}, httpOptions);
    }

    /* Http delete for given Url and header */
    delete(url: any, header: any) {
        let httpOptions = this.createHeader(header);
        return this.http.delete<any>(`${ApiServicesService.API_URL}/` + url, httpOptions);
    }

    /* success toaster */
    successToast(message: string) {
      this.toastr.successToastr(message);
    }

    /* error toaster */
    errorToast(message: string) {
      this.toastr.errorToastr(message);
    }

  }
