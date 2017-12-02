import Achievements from './achievements'
import Categories from './categories'
import Level from './level'
import Notifications from './notifications'
import Statistics from './statistics'
import User from './user'

export const setUser = User.setUser
export const openUserDrawer = User.openDrawer
export const closeUserDrawer = User.closeDrawer

export const setLevelXp = Level.setLevelXp

export const setStatistics = Statistics.setStatistics

export const setCategories = Categories.setCategories
export const addCategories = Categories.addCategories
export const markCategoriesAsNotNew = Categories.markCategoriesAsNotNew

export const addNotification = Notifications.addNotification
export const removeNotification = Notifications.removeNotification

export const setAchievements = Achievements.setAchievements
export const completeAchievement = Achievements.completeAchievement
