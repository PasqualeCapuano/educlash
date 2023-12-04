import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class AuthService {

    user$: any;

    constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
        this.user$ = afAuth.authState;
    }

    getUserLoggedData() {
        return this.user$;
    }

    login(email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then(result => {
                return result.user;
            })
            .catch(error => {
                throw error;
            });
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

    updateUser(uid: string, userData: any) {
        return this.firestore.collection('users').doc(uid).update(userData);
    }

    getUserById(uid: string) {
        return this.firestore.collection('users').doc(uid).valueChanges();
    }

    getAllUsers() {
        return this.firestore.collection('users').valueChanges();
    }

    getAllNotifications() {
        return this.firestore.collection('notification').valueChanges();
    }

    deleteUserById(uid: string) {
        return this.firestore.collection('users').doc(uid).delete();
    }

}
