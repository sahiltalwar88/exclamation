import React, { Component } from 'react'

class Settings extends Component {
  state = {
    text: ''
  }

  render () {
    return (
      <View>
        <Text>'Please enter a comma-separated list of the numbers you would like in this network'</Text>
        <TextInput
          editable
          multiline
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ (text) => this.setState({ text }) }
          value={ this.state.text }
        />
      </View>
    );
  }
}

export default Settings
