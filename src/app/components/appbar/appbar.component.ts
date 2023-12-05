import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Notification } from '../../interfaces/notification';
import {AuthService} from "../../services/auth.service";

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

    notifications: Notification[] = []
    messages: any = [];

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.getAllNotifications().subscribe((notifications) => {
            this.messages = notifications;
            console.log(this.messages.length);
        });

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
