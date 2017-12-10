import React, { Component } from 'react'

import AccountBalance from 'material-ui-icons/AccountBalance'
import AccountMultiple from 'mdi-material-ui/AccountMultiple'
import Add from 'material-ui-icons/Add'
import ArrowLeft from 'mdi-material-ui/ArrowLeft'
import Close from 'mdi-material-ui/Close'
import Creation from 'mdi-material-ui/Creation'
import FlaskOutline from 'mdi-material-ui/FlaskOutline'
import Food from 'mdi-material-ui/Food'
import Football from 'mdi-material-ui/Football'
import ImageFilterNone from 'mdi-material-ui/ImageFilterNone'
import LocalMovies from 'material-ui-icons/LocalMovies'
import LocalOffer from 'material-ui-icons/LocalOffer'
import MusicNote from 'material-ui-icons/MusicNote'
import NotFound from 'material-ui-icons/HelpOutline'
import Palette from 'material-ui-icons/Palette'
import Public from 'material-ui-icons/Public'
import SdStorage from 'material-ui-icons/SdStorage'
import Security from 'material-ui-icons/Security'
import Star from 'material-ui-icons/Star'
import TagMultiple from 'mdi-material-ui/TagMultiple'

class Icon extends Component {
  render() {
    let IconComponent = NotFound
    switch (this.props.type) {
      case 'Back':
        IconComponent = ArrowLeft
        break;
      case 'Bank':
        IconComponent = AccountBalance
        break;
      case 'Categories':
        IconComponent = TagMultiple
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
      case 'Plus':
        IconComponent = Add
        break;
      case 'Questions':
        IconComponent = ImageFilterNone
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
      case 'Users':
        IconComponent = AccountMultiple
        break;
      default:
    }
    return <IconComponent style={{ ...this.props.style }} />
  }
}

export default Icon
