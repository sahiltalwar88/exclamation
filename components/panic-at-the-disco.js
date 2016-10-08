import React, { Component } from 'react'
import Button from 'react-native-button'

class PanicAtTheDisco extends Component {
  ohShitSon () {
    alert('SENDING LOCATION TO WHATSAPP')
  }

  render () {
    return (
      <Button style={{width: 200, height: 200, backgroundColor: 'black'}} onPress={this.ohShitSon}>
        !
      </Button>
    )
  }
}

export default PanicAtTheDisco
