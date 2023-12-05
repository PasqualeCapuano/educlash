import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class AuthService {


    user$: any;

    constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
        this.user$ = afAuth.authState;
    }

    config = {
        apiKey: "AIzaSyAG0hszH-LeA5KP1PQUYzZuPRp98ump2Ow",
        authDomain: "test-fb550.firebaseapp.com",
        databaseURL: "https://test-fb550-default-rtdb.europe-west1.firebasedatabase.app"
    };
    secondaryApp = firebase.initializeApp(this.config, "Secondary");


    createAccount(em: string, pwd: string, name: string) {
        this.secondaryApp.auth().createUserWithEmailAndPassword(em, pwd).then((firebaseUser) => {
            this.secondaryApp.auth().signOut();
            const user = firebaseUser.user;
            user?.updateProfile({ displayName: name })
                .then(() => {
                    console.log('Registered successfully!');

                    this.addUser(user.uid, {
                        displayName: name,
                        email: em,
                        userUID: user.uid,
                        admin: false,
                        tickets: [
                            // {
                            //     number: 1,
                            //     title: 'Ticket 1',
                            //     status: 'open',
                            //     name: this.displayName,
                            //     email: this.email,
                            //     chat: [
                            //         {
                            //             message: 'Welcome to the chat!',
                            //             sender: this.displayName,
                            //             timestamp: new Date()
                            //         }
                            //     ]
                            // },
                        ],
                    })
                        .then(() => {
                            console.log('User added to Firestore successfully!');
                        })
                        .catch(error => {
                            console.error('Error adding user to Firestore:', error);
                        });
                })
        });
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


    getUserById(uid: string) {
        return this.firestore.collection('users').doc(uid).valueChanges();
    }

    getAllUsers() {
        return this.firestore.collection('users').valueChanges();
    }

    addTicket(uid: string, ticketData: any) {
        return this.firestore.collection('users').doc(uid).update({
            tickets: ticketData
        });
    }

    deleteUserById(uid: string) {
        return this.firestore.collection('users').doc(uid).delete();
    }

}
