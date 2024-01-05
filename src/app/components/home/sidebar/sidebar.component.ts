import {Component, OnInit, ViewChild} from '@angular/core';
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
export class SidebarComponent implements OnInit{

    constructor(private authService: AuthService, private router: Router) { }

  isSidebarHidden = false;
  userLoggedData: any;

    ngOnInit(): void {
         this.authService.getUserLoggedData().subscribe((u: any) => {
        console.log(u.uid);
        this.authService.getUserById(u.uid).subscribe((user => {
            this.userLoggedData = user;
            console.log(this.userLoggedData);
        }))
       });
    }

    logout() {
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
