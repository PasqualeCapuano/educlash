import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AuthService } from '../../services/auth.service';

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

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        this.authService.login({email: this.email, password: this.password}).subscribe({
            next: (data) => {
                console.log(data);
                this.router.navigate(['home/homepage']);
            },
            error: (error) => {
                console.log(error.message);
            }
        })
    }
}


