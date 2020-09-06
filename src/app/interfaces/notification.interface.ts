export enum NotificationTypes {
    REMINDER = 'reminder',
    FEATURE = 'feature',
    INFO = 'info'
}


export interface Notification {
    id: Number,
    type: NotificationTypes,
    message: string,
    notification_date: Date
}
