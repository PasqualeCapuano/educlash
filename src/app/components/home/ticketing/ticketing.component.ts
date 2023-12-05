import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {DataService} from "../../../services/data.service";
import {FormsModule} from "@angular/forms";
import {SearchPipe} from "./search.pipe";
import {AuthService} from "../../../services/auth.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-ticketing',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe],
  templateUrl: './ticketing.component.html',
  styleUrl: './ticketing.component.scss'
})
export class TicketingComponent implements OnInit {

    uid: any = localStorage.getItem('userID');
    admin: any;
    tableData: [] = [];
    user: any = {};
    title: string = '';
    message: string = '';
    tickets: any = [];
    allTickets: any = [];
    allUsers: any = [];
    ticketIdCount: number = 0;

    constructor(private router: Router, private dataService: DataService, private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.getAllUsers().subscribe((res: any) => {
            this.allUsers = res;
            res.forEach((user: any) => {
                user.tickets.forEach((ticket: any) => {
                    this.allTickets.push(ticket);
                });
            });
            this.user.tickets = this.allTickets;

        });

        this.authService.getUserById(this.uid).subscribe((res: any) => {
            this.user = res;
            this.admin = this.user.admin;

            this.tableData = this.user.tickets;
        });
    }


    searchText: string = '';

  openDetailPage(data: any) {
    this.dataService.setCurrentRowData(data);
    this.router.navigate(['/home/ticketing/' + data.id]);
  }

    addTicket() {

      console.log('all users', this.allUsers);
      this.allUsers.forEach((user: any) => {
          console.log('singolo user length dei tickets', user.tickets.length);

            // this.ticketIdCount = user.tickets.length + 1;
      });

      console.log('ticket id count', this.ticketIdCount);

        if (!this.user || !this.user.tickets) {
            console.error('User or user tickets array not initialized');
            return;
        }

        this.user.tickets.push(
          {
              email: this.user.email,
              name: this.user.displayName,
              number: this.ticketIdCount,
              status: 'open',
              title: this.title,
              message: this.message,
              sender: this.user.displayName,
              timestamp: new Date(),
          }
      );

        console.log('Updating user with new ticket', this.user);

        this.authService.updateUser(this.uid, this.user).then((res: any) => {
            console.log('User updated');
        }).catch((error) => {
            console.error('Error updating user:', error);
        });
    }



}
