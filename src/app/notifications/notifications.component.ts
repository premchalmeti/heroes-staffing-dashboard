import { Component, OnInit } from '@angular/core';
import { Notification } from '../interfaces/notification.interface';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[];

  constructor(public notificationSVC: NotificationService) {
  }

  ngOnInit(): void {
    this.notificationSVC.getNotifications()
      .subscribe(notifications => this.notifications = notifications);
  }

  clearNotification(): void{
    this.notificationSVC.clearNotifications();
  }

}
