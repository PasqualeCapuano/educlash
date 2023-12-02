import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

    async login(email: string, password: string): Promise<void> {
        try {
            await this.afAuth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            throw error;
        }
    }
    async logout(): Promise<void> {
        try {
            await this.afAuth.signOut();
        } catch (error) {
            throw error;
        }
    }

    isLoggedIn(): Observable<boolean> {
        return new Observable(subscriber => {
            this.afAuth.authState.subscribe(user => {
                subscriber.next(!!user);
                subscriber.complete();
            });
        });
    }

    addUser(uid: string, userData: any) {
        return this.firestore.collection('users').doc(uid).set(userData);
    }

}
