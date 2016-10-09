import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'

class SmsSettings extends Component {
  render () {
    return (
      <View>
        <Text>'Please enter a comma-separated list of the numbers you would like to broadcast your message to - example: 111-222-3333,123-456-7890,098-765-4321.'</Text>
        <TextInput
          editable
          multiline
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ this.props.updatePhones }
          value={ this.state.text }
        />
      <Text>'Please enter the message you would like to broadcast.'</Text>
      <TextInput
        editable
        multiline
        style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
        onChangeText={ this.props.updateMessage }
        value={ this.state.text } />
      </View>
    )
  }
}

export default SmsSettings
