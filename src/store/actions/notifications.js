export default {
  addNotification(notification) {
    /*
    notification structure:
    {
      id: 'achievement-music-master',
      text: 'Music Master',
      icon: 'Music',
      style: {
        backgroundColor: '#f00'
      },
      autoHideDuration: number / null
    }
    */
    return {
      type: 'ADD_NOTIFICATION',
      notification: {
        autoHideDuration: 3000,
        ...notification
      }
    }
  },
  removeNotification(notificationId) {
    return {
      type: 'REMOVE_NOTIFICATION',
      id: notificationId
    }
  }
}
