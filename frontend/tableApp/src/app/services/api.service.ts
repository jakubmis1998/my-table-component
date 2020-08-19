import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'token ' + localStorage.getItem('TOKEN')
  });

  constructor(private http: HttpClient) { }

  getFullRequest(sortInfo, paginateInfo, filtersInfo): Observable<any> {
    let url = this.baseUrl + "/persons/?";

    let ordering: string = "";
    if (sortInfo.direction === "desc") {
      ordering = "ordering=".concat(sortInfo.active);
    }
    else if (sortInfo.direction === "asc") {
      ordering = "ordering=-".concat(sortInfo.active);
    }

    let paginating: string = "";
    paginating = "page_size=" + paginateInfo.pageSize + "&page=" + (paginateInfo.pageIndex + 1);

    let filtering: string = "";
    for (let key in filtersInfo) {
      if (filtersInfo[key] != "" && filtersInfo[key] != null && filtersInfo[key] != undefined) {
        filtering = filtering.concat(key + "=" + filtersInfo[key] + "&");
      }
    }

    return this.http.get(
      url + paginating + "&" + ordering + "&" + filtering,
      { headers: this.httpHeaders }
    );
  }

  getProperties(url: string): Observable<any> {
    return this.http.get(
      url,
      { headers: this.httpHeaders }
    );
  }

  getAllPersons(): Observable<any> {
    return this.http.get(
      this.baseUrl + '/persons/',
      {headers: this.httpHeaders}
    );
  }

  getPerson(id: number): Observable<any> {
    return this.http.get(
      this.baseUrl + '/persons/' + id + '/',
      { headers: this.httpHeaders }
    );
  }

  updatePerson(person): Observable<any> {
    const body = { firstname: person.firstname, lastname: person.lastname, age: person.age };
    return this.http.put(
      this.baseUrl + '/persons/' + person.id + '/',
      body,
      { headers: this.httpHeaders }
    );
  }

  createPerson(person): Observable<any> {
    const body = { firstname: person.firstname, lastname: person.lastname, age: person.age };
    return this.http.post(
      this.baseUrl + '/persons/',
      body,
      { headers: this.httpHeaders }
    );
  }

  deletePerson(id): Observable<any> {
    return this.http.delete(
      this.baseUrl + '/persons/' + id + '/',
      { headers: this.httpHeaders }
    );
  }

  getOptions(): Observable<any> {
    return this.http.options(
      this.baseUrl + '/persons/',
      { headers: this.httpHeaders }
    );
  }
}
