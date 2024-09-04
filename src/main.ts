import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if ( !navigator.geolocation ) {
  alert('Navegador no soporta la geolocalización.');
  throw new Error('Navegador no soporta la geolocalización.');
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
