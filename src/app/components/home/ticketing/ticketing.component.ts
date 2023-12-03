import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {DataService} from "../../../services/data.service";
import {FormsModule} from "@angular/forms";
import {SearchPipe} from "./search.pipe";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-ticketing',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe],
  templateUrl: './ticketing.component.html',
  styleUrl: './ticketing.component.scss'
})
export class TicketingComponent implements OnInit {

    uid:any = localStorage.getItem('userID');
    admin: boolean = false;
    tableData: [] = [];

  constructor(private router: Router, private dataService: DataService, private authService: AuthService) {}

    ngOnInit() {
      if (this.admin){
          this.authService.getAllUsers().subscribe((res: any) => {
                console.log(res);
          });
      } else {
          this.authService.getUserById(this.uid).subscribe((res: any) => {
              this.tableData = res.tickets;
          });
      }
    }


  searchText: string = '';

  openDetailPage(data: any) {
    this.dataService.setCurrentRowData(data);
    this.router.navigate(['/home/ticketing/' + data.id]);
  }

}
