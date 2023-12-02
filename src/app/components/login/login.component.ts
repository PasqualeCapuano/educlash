import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {AuthService} from "../../services/auth.service";



@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    email: string = '';
    password: string = '';
    errorMessage: string | null = null;

    constructor(private router: Router, private authService: AuthService) { }

    login() {
        this.authService.login(this.email, this.password)
            .then(() => {
                console.log('User logged in');
                this.router.navigate(['/home/homepage']);

            })
            .catch(error => {
                this.errorMessage = error.message;
            });
    }

}


