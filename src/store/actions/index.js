import Categories from './categories'
import Level from './level'
import Notifications from './notifications'
import User from './user'

export const setUser = User.setUser

export const setLevelXp = Level.setLevelXp

export const loadCategories = Categories.loadCategories
export const addCategories = Categories.addCategories
export const markCategoriesAsNotNew = Categories.markCategoriesAsNotNew

export const addNotification = Notifications.addNotification
export const removeNotification = Notifications.removeNotification
