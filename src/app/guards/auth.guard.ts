import { Injectable } from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate: CanActivateFn = (): Observable<boolean> => {
        return this.authService.isLoggedIn().pipe(
            take(1),
            map(isLoggedIn => {
                if (!isLoggedIn) {
                    this.router.navigate(['/login']); // Redirect to login if not authenticated
                    return false;
                }
                return true;
            })
        );
    }
}
