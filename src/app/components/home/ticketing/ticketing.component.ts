import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { DataService } from "../../../services/data.service";
import { FormsModule } from "@angular/forms";
import { SearchPipe } from "./search.pipe";
import { AuthService } from "../../../services/auth.service";

@Component({
    selector: 'app-ticketing',
    standalone: true,
    imports: [CommonModule, FormsModule, SearchPipe],
    templateUrl: './ticketing.component.html',
    styleUrl: './ticketing.component.scss'
})
export class TicketingComponent implements OnInit {

    user: any = {};
    uid: string = "";
    isAdmin: boolean = false;
    tableData: [] = [];
    
    allTickets: any = [];
    allUsers: any = [];
    searchText: string = '';

    

    constructor(private router: Router, private dataService: DataService, private authService: AuthService) { }
    
    ngOnInit() {        
        this.authService.getAllUsers().subscribe((users: any) => {
            console.log(users);
            this.allUsers = users;
            this.authService.getUserLoggedData().subscribe((u: any) => {
                this.uid = u.uid;
                this.user = users.find((u: any) => u.userUID == this.uid);
                this.isAdmin = this.user.admin;
                this.authService.getAllTickets().subscribe((tickets: any) => {
                    this.allTickets = tickets;
                    if (this.isAdmin) {
                        tickets.forEach((t:any) => {
                            const user = users.find((u: any) => u.userUID == t.userUID);
                            t.name = user.displayName;
                            t.email = user.email;
                        })
                        this.tableData = tickets;
                        console.log(this.tableData);

                    }
                    else this.tableData = tickets.filter((t:any) => t.userUID == this.uid);
                });
            });     
        });        
    }

    openDetailPage(ticket: any) {
        this.dataService.setCurrentRowData(ticket);
        this.router.navigate(['/home/ticketing/' + ticket.ticketUID]);
    }

    delete(uid:string) {
        this.authService.deleteTicket(uid);
    }
}
