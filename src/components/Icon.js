import React, { Component } from 'react'

import AccountBalance from 'material-ui-icons/AccountBalance'
import Colorize from 'material-ui-icons/Colorize'
import GolfCourse from 'material-ui-icons/GolfCourse'
import LocalMovies from 'material-ui-icons/LocalMovies'
import LocalOffer from 'material-ui-icons/LocalOffer'
import MusicNote from 'material-ui-icons/MusicNote'
import NotFound from 'material-ui-icons/HelpOutline'
import Palette from 'material-ui-icons/Palette'
import Public from 'material-ui-icons/Public'
import Restaurant from 'material-ui-icons/Restaurant'
import SdStorage from 'material-ui-icons/SdStorage'
import Star from 'material-ui-icons/Star'

class Icon extends Component {
  render() {
    let IconComponent = NotFound
    switch (this.props.type) {
      case 'Bank':
        IconComponent = AccountBalance
        break;
      case 'Food':
        IconComponent = Restaurant
        break;
      case 'Golf':
        IconComponent = GolfCourse
        break;
      case 'Globe':
        IconComponent = Public
        break;
      case 'Label':
        IconComponent = LocalOffer
        break;
      case 'Movie':
        IconComponent = LocalMovies
        break;
      case 'MusicNote':
        IconComponent = MusicNote
        break;
      case 'Palette':
        IconComponent = Palette
        break;
      case 'Technology':
        IconComponent = SdStorage
        break;
      case 'Science':
        IconComponent = Colorize
        break;
      case 'Star':
        IconComponent = Star
        break;
      default:
    }
    return <IconComponent style={{ ...this.props.style }} />
  }
}

export default Icon
