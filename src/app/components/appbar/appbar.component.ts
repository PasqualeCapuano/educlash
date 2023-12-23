import { Component, TemplateRef, ViewChild, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Notification } from '../../interfaces/notification';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormsModule} from "@angular/forms";
import { OverlayContainer} from '@angular/cdk/overlay';



@Component({
    selector: 'app-appbar',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
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

    //aggiunte
    uid: any = localStorage.getItem('userID');
    title: string = '';
    text: string = '';
    allUsers: any = [];
    user: any = {};
    ticketIdCount: number = 0;
    admin: any;

    switchDark = false;
    @HostBinding('class') className = '';
    darkThemeClass = 'theme-dark';
    lightThemeClass = 'theme-light';
    isDarkMode = false;
    disabledBtn: boolean = true;

    constructor(private authService: AuthService, private overlay : OverlayContainer) {
    }

    ngOnInit(): void {
        this.authService.getAllNotifications().subscribe((notifications) => {
            this.messages = notifications;
            console.log(this.messages.length);
        });

        this.updateNotifications();

        this.authService.getUserById(this.uid).subscribe((res: any) => {
            this.user = res;
            this.admin = this.user.admin;
        });

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

    svuotaCampi() {
        this.title = '';
        this.text = '';
      }

    controllaCampi(){
        if(this.title === '' || this.text === ''){
            this.disabledBtn = true;
        } else{
            this.disabledBtn = false;
        }
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
                message: this.text,
                sender: this.user.displayName,
                timestamp: new Date(),
            }
        );

        this.svuotaCampi();
          console.log('Updating user with new ticket', this.user);

          this.authService.updateUser(this.uid, this.user).then((res: any) => {
              console.log('User updated');
          }).catch((error) => {
              console.error('Error updating user:', error);
          });
      }

      toggleDark() {
        this.switchDark = !this.switchDark;
        const html = document.getElementsByTagName('html')[0];

    if (this.switchDark) {
        html.setAttribute('data-bs-theme', 'dark');
    } else {
        html.removeAttribute('data-bs-theme');
    }
}
}
