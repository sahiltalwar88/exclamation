import React, { Component } from 'react'

class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = { text: '' }
}
  render () {
    return (
      <View>
        <Text>'Please enter a comma-separated list of the numbers you would like in this network.'</Text>
        <TextInput
          editable
          multiline
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ (text) => this.setState({ text }) }
          value={ this.state.text }
        />
      </View>
      <View>
      <Text>'Plese enter the message you would like to send out in an emergeny.'
      <TextInput
        editable
        multiline
        style={ { height: 40, borderColor: 'gray' , borderWidth: 1 } }
        onChangeText={ (text) => this.setState({ text }) }
        value={ this.state.text } />
    );
  }
}

export default Settings
