import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit{

    constructor(private router: Router, private afAuth: AngularFireAuth, private authService: AuthService) {
    }

    displayName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    users: any;
    selectedUid: string | undefined;

    isModalOpen = false;

    ngOnInit(): void {
        this.authService.getAllUsers().subscribe(users => {
            this.users = users;
            console.log(this.users);
        });
    }

    // addUser() {
    //     if (this.displayName && this.email && this.password) {
    //         this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
    //             .then((userCredential) => {
    //                 const user = userCredential.user;
    //                 user?.updateProfile({displayName: this.displayName})
    //                     .then(() => {
    //                         console.log('Registered successfully!');

    //                         this.authService.addUser(user.uid, {
    //                             displayName: this.displayName,
    //                             email: this.email,
    //                             userUID: user.uid,
    //                             admin: false,
    //                             tickets: [
    //                                 // {
    //                                 //     number: 1,
    //                                 //     title: 'Ticket 1',
    //                                 //     status: 'open',
    //                                 //     name: this.displayName,
    //                                 //     email: this.email,
    //                                 //     chat: [
    //                                 //         {
    //                                 //             message: 'Welcome to the chat!',
    //                                 //             sender: this.displayName,
    //                                 //             timestamp: new Date()
    //                                 //         }
    //                                 //     ]
    //                                 // },

    //                             ],

    //                         })
    //                             .then(() => {
    //                                 console.log('User added to Firestore successfully!');
    //                             })
    //                             .catch(error => {
    //                                 console.error('Error adding user to Firestore:', error);
    //                             });
    //                     })
    //                     .catch(error => {
    //                         console.error('Error updating display name:', error);
    //                     });
    //             })
    //             .catch(error => {
    //                 console.error('Error registering:', error);
    //             });
    //     } else {
    //         console.error('Display name, email, and password are required.');
    //     }
    // }

    addUser() {
        if (this.displayName && this.email && this.password) {
        this.authService.createAccount(this.email, this.password, this.displayName);
        } else {
            console.error('Display name, email, and password are required.');
        }
    }

    selectUidToDelete(uid: string) {
        this.selectedUid = uid;
        console.log(this.selectedUid)
    }

    deleteUser() {
        this.authService.deleteUserById(this.selectedUid!);
    }

}
