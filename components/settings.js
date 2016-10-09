import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'

const emailDirections = 'Please enter a list of the emails you\'d like to broadcast your message to - for example, "Jose <jose@jose.com>, Lauren <lauren@lauren.com>, Sahil <sahil@sahil.com>, Samina <samina@samina.com>"'
class Settings extends Component {
  render () {
    const { emails, host, message, password, phones, subject, user } = this.props

    return (
      <View>
        <Text>'Please enter the message subject you would like to broadcast.'</Text>
        <TextInput
          editable
          multiline
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ this.props.updateSubject }
          value={ subject } />
        <Text>'Please enter the message body you would like to broadcast.'</Text>
        <TextInput
          editable
          multiline
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ this.props.updateMessage }
          value={ message } />
        <Text>'Please enter a comma-separated list of the phone numbers you\'d like to broadcast your message to - for example, "111-222-3333,123-456-7890,098-765-4321"'</Text>
        <TextInput
          editable
          multiline
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ this.props.updatePhones }
          value={ phones }
        />
        <Text>'Please enter your email username'</Text>
        <TextInput
          editable
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ this.props.updateUser }
          value={ user }
        />
        <Text>'Please enter your email password (use an app password or an equivalent instead if you can - https://support.google.com/accounts/answer/185833?hl=en)'</Text>
        <TextInput
          editable
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ this.props.updatePassword }
          value={ password }
        />
        <Text>{ emailDirections }</Text>
        <TextInput
          editable
          multiline
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ this.props.updateEmails }
          value={ emails }
        />
        <Text>'Please enter your email provider's SMTP server URL (you put this into Outlook / Thunderbird too)'</Text>
        <TextInput
          editable
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ this.props.updateHost }
          value={ host } />
      </View>
    )
  }
}

export default Settings
