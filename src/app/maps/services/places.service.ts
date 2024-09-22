import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = []

  get isUserLocationReady(): boolean{
    return !!this.userLocation;
  }

  constructor( private http: HttpClient ) {
    this.getUserLocation();
  }

    public async getUserLocation(): Promise<[number, number]> {
      return new Promise( (resolve, reject) => {

        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            this.userLocation = [ coords.longitude, coords.latitude ];
            resolve( this.userLocation );
          },
          ( err ) => {
            alert('No se pudo obtener la geolocalización.');
            console.log(err);
            reject();
          }

        );

      });
    }

    public getPlacesByQuery( query: string ) {
      //todo: evaluar cuando el query es un string vacio

      this.isLoadingPlaces = true;

      this.http.get<PlacesResponse> (`https://api.mapbox.com/search/geocode/v6/forward?q=${ query }&limit=5&proximity=-65.19821101549233,2C-26.824601637804818&language=es&access_token=pk.eyJ1IjoiZWxmbGFjb3NlYmEiLCJhIjoiY2x2dHQ5ZXVmMWVpNzJqcGd3ZGxxczdnNCJ9.fPfAV9MvOJ4PoSeOytNHKg`)
        .subscribe( resp => {
          console.log( resp.features );

          this.isLoadingPlaces = false;
          this.places = resp.features;

        });
    }

}
