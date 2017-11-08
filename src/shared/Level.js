const GRIND_SPEED = 0.01
const STARTING_LEVEL = 1
/*
Level   XP      To Next
1       0       100
2       100     300
3       400     500
4       900     700
5       1600    900
*/

export default {
  calcLevel(xp) {
    return Math.floor(STARTING_LEVEL + Math.sqrt(xp * GRIND_SPEED))
  },
  getXpStart(level) {
    return Math.pow(level - STARTING_LEVEL, 2) / GRIND_SPEED
  }
}
