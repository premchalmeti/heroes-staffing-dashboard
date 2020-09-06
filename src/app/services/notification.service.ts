import { Injectable } from '@angular/core';
import { Notification, NotificationTypes } from '../interfaces/notification.interface';
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications: Notification[];
  id: number;

  constructor() {
    this.id = 0;
    this.notifications = [];
  }

  getNotifications(): Observable<Notification[]> {
    return of(this.notifications);
  }

  addNotification(type: NotificationTypes, message: string): void {
    this.id += 1;

    this.notifications.push({
      'id': this.id,
      'type': type,
      'message': message,
      'notification_date': new Date()
    });
  }

  clearNotifications(): void {
    this.notifications = [];
  }

}
