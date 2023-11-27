import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-ticketing-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticketing-detail.component.html',
  styleUrl: './ticketing-detail.component.scss'
})
export class TicketingDetailComponent implements OnInit{

  constructor(private dataService: DataService) {
  }

  rowData: any;
  ngOnInit() {
    this.rowData = this.dataService.getCurrentRowData();
    console.log(this.rowData)
  }
}
