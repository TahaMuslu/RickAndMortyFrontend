export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";


export const showNotification = (notificationModel) => {
    return {
        type: SHOW_NOTIFICATION,
        payload: notificationModel
    }
}