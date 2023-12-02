import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { getFirestore, provideFirestore, Firestore, initializeFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { getAuth, provideAuth, connectAuthEmulator, Auth} from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

// Anche solo dichiararla fa crashare tutto
// export const app = initializeApp(environment.firebase);

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        importProvidersFrom([
            provideFirebaseApp(() => initializeApp(environment.firebase)),
            provideFirestore(() => {
                if (environment.useEmulators) {
                    let firestore: Firestore = initializeFirestore(getApp(), {});
                    connectFirestoreEmulator(firestore, 'localhost', 8080);
                    return firestore;
                };
                return getFirestore();
            }),
            provideAuth(() => {
                let auth: Auth = getAuth();
                if (environment.useEmulators) connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
                return auth;
            })
            /*

            Si possono sostituire ai 2 providers elencati sopra quando useEmulators saranno 'False' di default

            provideFirestore(() => getFirestore()),
            provideAuth(() => getAuth())

            */
        ])
    ]
};
