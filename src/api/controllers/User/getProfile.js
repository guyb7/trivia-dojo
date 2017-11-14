const getProfile = req => {
  return {
    success: true,
    id: '1234-1234-1234-1234',
    role: 'user', // guest, user, editor, admin
    name: 'Rick',
    xp: 270
  }
}

export {
  getProfile
}
