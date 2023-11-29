import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-appbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.scss'
})
export class AppbarComponent {

  notification = [
    {id: 1, title: 'Notification 1', description: 'Description 1', date: '2023-02-15', body: 'jsidnbvsakjvaivjasvnasviknavikavf a' },
    {id: 2, title: 'Notification 2', description: 'Description 2', date: '2022-07-31', body: 'jsidnbvsakjvaivjasvnasviknavikavf a' },
    {id: 3, title: 'Notification 3', description: 'Description 3', date: '2023-01-01', body: 'jsidnbvsakjvaivjasvnasviknavikavf a' },
  ]

}
