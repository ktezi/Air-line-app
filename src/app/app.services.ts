import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Flights } from './models/flights.modals';
import { Passengers } from './models/passengers.modals';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
    providedIn: 'root',
  })
export class FlightsServices {
  private baseUrl = 'https://fake-rest-api3.herokuapp.com/flights';
  private baseUrll = 'https://fake-rest-api3.herokuapp.com/passengers/';
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getFlights(): Observable<any> {
    return this.http.get<Flights[]>(this.baseUrl).pipe(
      tap((flights) => {
        return flights;
      }),
      catchError(this.handleError('getFlights', []))
    );
  }

  getPassengers(): Observable<any> {
    return this.http.get<any>(this.baseUrll).pipe(
      tap((passengers) => {
        return passengers;
      }),
      catchError(this.handleError('getPassengers', []))
    );
  }

  updatePassengers(passenger: Passengers): Observable<Passengers> {
    const id = passenger[0].id;
    return this.http.put<Passengers>(this.baseUrll + id, passenger[0]).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((passenger) => {
        console.log('Data====>', passenger);
      }),
      catchError(this.handleError('addPassengers', passenger))
    );
  }

  addPassengers(passenger: Passengers): Observable<Passengers> {
    return this.http.post<Passengers>(this.baseUrll, passenger).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((passenger) => {
        console.log('Data====>', passenger);
      }),
      catchError(this.handleError('addPassengers', passenger))
    );
  }

  addAncillaryServices(flight: Flights): Observable<Flights> {
    const id = flight.id;
    console.log('Flights', flight);
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((flight) => {
        console.log('Data====>', flight);
      }),
      catchError(this.handleError('addAncillaryServices', flight))
    );
  }

  UpdateAncillary(flight: Flights): Observable<Flights> {
    const id = flight.id;
    console.log('Flights', flight);
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((flight) => {
        console.log('Data====>', flight);
      }),
      catchError(this.handleError('UpdateAncillary', flight))
    );
  }

  DeleteAncillary(flight: Flights): Observable<Flights> {
    const id = flight.id;
    console.log('Flights', flight);
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((flight) => {
        console.log('Data====>', flight);
      }),
      catchError(this.handleError('DeleteAncillary', flight))
    );
  }

  CreateSpecialMeals(flight: Flights): Observable<Flights> {
    const id = flight.id;
    console.log('Flights', flight);
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((flight) => {
        console.log('Data====>', flight);
      }),
      catchError(this.handleError('CreateSpecialMeals', flight))
    );
  }

  UpdateSpecialMeals(flight: Flights): Observable<Flights> {
    const id = flight.id;
    console.log('Flights', flight);
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((flight) => {
        console.log('Data====>', flight);
      }),
      catchError(this.handleError('UpdateSpecialMeals', flight))
    );
  }

  DeleteSpecialMeals(flight: Flights): Observable<Flights> {
    const id = flight.id;
    console.log('Flights', flight);
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((flight) => {
        console.log('Data flight====>', flight);
      }),
      catchError(this.handleError('DeleteSpecialMeals', flight))
    );
  }
  CreateShoppingItems(flight: Flights): Observable<Flights> {
    const id = flight.id;
    console.log('Flights', flight);
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((flight) => {
        console.log('Data====>', flight);
      }),
      catchError(this.handleError('CreateShoppingItems', flight))
    );
  }
  UpdateShoppingItems(flight: Flights): Observable<Flights> {
    const id = flight.id;
    console.log('Flights', flight);
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((flight) => {
        console.log('Data====>', flight);
      }),
      catchError(this.handleError('UpdateShoppingItems', flight))
    );
  }

  DeleteShoppingItems(flight: Flights): Observable<Flights> {
    const id = flight.id;
    console.log('Flights', flight);
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((flight) => {
        console.log('Data flight====>', flight);
      }),
      catchError(this.handleError('DeleteShoppingItems', flight))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}



