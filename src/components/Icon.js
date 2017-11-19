import React, { Component } from 'react'

import AccountBalance from 'material-ui-icons/AccountBalance'
import Close from 'mdi-material-ui/Close'
import Creation from 'mdi-material-ui/Creation'
import FlaskOutline from 'mdi-material-ui/FlaskOutline'
import Food from 'mdi-material-ui/Food'
import Football from 'mdi-material-ui/Football'
import LocalMovies from 'material-ui-icons/LocalMovies'
import LocalOffer from 'material-ui-icons/LocalOffer'
import MusicNote from 'material-ui-icons/MusicNote'
import NotFound from 'material-ui-icons/HelpOutline'
import Palette from 'material-ui-icons/Palette'
import Public from 'material-ui-icons/Public'
import SdStorage from 'material-ui-icons/SdStorage'
import Security from 'material-ui-icons/Security'
import Star from 'material-ui-icons/Star'

class Icon extends Component {
  render() {
    let IconComponent = NotFound
    switch (this.props.type) {
      case 'Bank':
        IconComponent = AccountBalance
        break;
      case 'Close':
        IconComponent = Close
        break;
      case 'Stars':
        IconComponent = Creation
        break;
      case 'Food':
        IconComponent = Food
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
        IconComponent = FlaskOutline
        break;
      case 'Shield':
        IconComponent = Security
        break;
      case 'Sport':
        IconComponent = Football
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
