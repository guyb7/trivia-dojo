export default {
  setUser(user) {
    return {
      type: 'SET_USER',
      ...user
    }
  },
  openDrawer() {
    return {
      type: 'OPEN_USER_DRAWER'
    }
  },
  closeDrawer() {
    return {
      type: 'CLOSE_USER_DRAWER'
    }
  }
}
