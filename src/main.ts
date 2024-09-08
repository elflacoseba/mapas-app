import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiZWxmbGFjb3NlYmEiLCJhIjoiY2x2dHQ5ZXVmMWVpNzJqcGd3ZGxxczdnNCJ9.fPfAV9MvOJ4PoSeOytNHKg';


if ( !navigator.geolocation ) {
  alert('Navegador no soporta la geolocalización.');
  throw new Error('Navegador no soporta la geolocalización.');
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
