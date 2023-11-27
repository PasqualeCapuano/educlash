import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-challenge-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenge-detail.component.html',
  styleUrl: './challenge-detail.component.scss'
})
export class ChallengeDetailComponent implements OnInit{

  constructor(private dataService: DataService) {}

  rowData: any;
  ngOnInit() {
    this.rowData = this.dataService.getCurrentRowData();
    console.log(this.rowData)
  }
}
