import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
    imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

    constructor(private authService: AuthService, private router: Router) { }

  isSidebarHidden = false;


    logout() {
        localStorage.removeItem('userID');
        this.authService.logout()
            .then(() => {
                console.log('User logged out');
                this.router.navigate(['/']);
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
    }

  toggleSidebar() {
    if (this.isSidebarHidden) {
      this.isSidebarHidden = false;

      return;
    } else {
      this.isSidebarHidden = true;
      return;
    }
  }

}
