import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>('assets/data/people.json');
  }

  search(q: string): Observable<Person[]> {
    q = !q || q === '*' ? '' : q.toLowerCase();

    return this.getAll().pipe(
      map((data: Person[]) => data.filter(item => JSON.stringify(item).toLowerCase().includes(q)))
    );
  }

  get(id: number): Observable<Person> {
    return this.getAll().pipe(map((all: Person[]) => {
      if (localStorage['person' + id]) {
        return JSON.parse(localStorage['person' + id]);
      }
      return all.find((e: Person) => e.id === id);
    }));
  }

  save(person: Person) {
    localStorage['person' + person.id] = JSON.stringify(person);
  }
}

export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor(obj?: any) {
    this.street = obj?.street;
    this.city = obj?.city;
    this.state = obj?.state;
    this.zip = obj?.zip;
  }
}


export class Person {
  id: number;
  name: string;
  phone: string;
  address: Address;

  constructor(obj?: any) {
    this.id = obj?.id;
    this.name = obj?.name;
    this.phone = obj?.phone;
    this.address = obj?.address;
  }
}
