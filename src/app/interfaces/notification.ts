export interface Notification {
    id?: number,
    title?: string,
    description?: string,
    date?: string,
    body?: string,
    status?: 'read' | 'unread'
}
