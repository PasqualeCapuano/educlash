import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "../../services/auth.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

    constructor(private router: Router, private afAuth: AngularFireAuth, private authService: AuthService) {
    }

    displayName: string | undefined;
    email: string | undefined;
    password: string | undefined;


    register() {
        if (this.displayName && this.email && this.password) {
            this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    user?.updateProfile({displayName: this.displayName})
                        .then(() => {
                            console.log('Registered successfully!');

                            this.authService.addUser(user.uid, {
                                displayName: this.displayName,
                                email: this.email,
                                userUID: user.uid,
                                admin: false
                            })
                                .then(() => {
                                    console.log('User added to Firestore successfully!');
                                })
                                .catch(error => {
                                    console.error('Error adding user to Firestore:', error);
                                });
                            this.router.navigate(['/login']);

                        })
                        .catch(error => {
                            console.error('Error updating display name:', error);
                        });
                })
                .catch(error => {
                    console.error('Error registering:', error);
                });
        } else {
            console.error('Display name, email, and password are required.');
        }
    }

}
