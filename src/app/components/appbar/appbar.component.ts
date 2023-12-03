import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Notification } from '../../interfaces/notification';

@Component({
    selector: 'app-appbar',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './appbar.component.html',
    styleUrl: './appbar.component.scss'
})
export class AppbarComponent implements OnInit {
    
    @ViewChild('message') 
    message?:TemplateRef<any>;
    currentShown:Notification = {};
    unreadNotifications:number = 0;

    notifications: Notification[] = [
        { id: 1, title: 'Notification 1', description: 'Description 1', date: '2023-02-15', body: 'jsidnbvsakjvaivjasvnasviknavikavf a', status: 'unread' },
        { id: 2, title: 'Notification 2', description: 'Description 2', date: '2023-07-31', body: 'jsidnbvsakjvaivjasvnasviknavikavf a', status: 'read' },
        { id: 3, title: 'Notification 3', description: 'Description 3', date: '2023-01-01', body: 'jsidnbvsakjvaivjasvnasviknavikavf a', status: 'unread' },
        { id: 4, title: 'Notification 4', description: 'Description 4', date: '2023-01-01', body: 'jsidnbvsakjvaivjasvnasviknavikavf a', status: 'read' }
    ]

    constructor() {}

    ngOnInit(): void {
        /*
            popolamento "notifications"
        */
        this.updateNotifications();
    }

    openNotification(notification:Notification) {
        notification.status = 'read';
        this.currentShown = notification;
        this.notifications.filter(el => el.id == notification.id)[0].status = 'read';
        this.updateNotifications();
    }

    unread(notification:Notification) {
        this.notifications.filter(el => el.id == notification.id)[0].status = 'unread';
        this.updateNotifications();
    }

    sortUnreadedFirst() {
        this.notifications = this.notifications.sort((a,b) => {            
            const statusComparison = (a.status === 'unread' ? 0 : 1) - (b.status === 'unread' ? 0 : 1);            
            return (statusComparison !== 0) ? statusComparison : (a.date && b.date) ? Date.parse(b.date) - Date.parse(a.date) : 0;            
        })
    }
    
    updateNotifications() {
        this.sortUnreadedFirst();
        this.unreadNotifications = this.notifications.filter(el => el.status == "unread").length;
    }

}
