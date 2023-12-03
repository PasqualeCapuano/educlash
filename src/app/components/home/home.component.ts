import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {RouterOutlet} from "@angular/router";
import {AppbarComponent} from "../appbar/appbar.component";
import {AuthService} from "../../services/auth.service";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet, AppbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

    uid: any = localStorage.getItem('userID');

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.getUserById(this.uid).subscribe((res: any) => {
            console.log(res);
        });
    }



}
