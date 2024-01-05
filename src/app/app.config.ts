import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { getFirestore, provideFirestore, Firestore, initializeFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { getAuth, provideAuth, connectAuthEmulator, Auth} from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";


export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom([
        // provideFirebaseApp(() => initializeApp(environment.firebase)),
        // provideFirestore(() => {return getFirestore();
        // }),
        // provideAuth(() => {
        //     let auth: Auth = getAuth();
        //     return auth;
        // })
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
    ]),
    provideAnimations()
]
};
