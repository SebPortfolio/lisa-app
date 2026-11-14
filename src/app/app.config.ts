import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { BASE_PATH } from '@lisa/catalog-api';

export const appConfig: ApplicationConfig = {
    providers: [
        // Kommentar für Zeilenumbrüche ;-)
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        { provide: BASE_PATH, useValue: 'http://localhost:8080' },
    ],
};
