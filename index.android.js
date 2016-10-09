import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View } from 'react-native'
import email from 'emailjs'
import Share from 'react-native-share'
import SmsAndroid from 'react-native-sms-android'
import Settings from './components/settings'

const defaultMessage = `Hey I am in danger here, find me here!`

const getSecuritySetting = (host) => {
  const microsoftHost = 'smtp-mail.outlook.com'
  return host === microsoftHost ? { ciphers: 'SSLv3' } : true
}

let server = null

class Exclamation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      emails: null,
      host: null,
      message: null,
      notified: false,
      password: null,
      phones: null,
      subject: null,
      user: null
    }
  }

  sendEmail () {
    const { emails, host, message, password, subject, user } = this.state
    if (!server && host && password && user) {
      const connectionSettings = {
        host: host,
        password: password,
        tls: getSecuritySetting(host),
        user: user
      }

      server = email.server.connect(connectionSettings)
    }

    if (server) {
      emails.split(',').forEach(email => {
        server.send(
          { text: message, from: user, to: email.trim(), subject: subject, 'reply-to': user },
          (err, message) =>
            message
              // TODO: ST - Replace with sane logs
              ? alert(JSON.stringify(message, null, 2))
              : alert(JSON.stringify(err, null, 2))
        )
      })
    }
  }

  sendMessage (phones, message, position) {
    if (!this.state.notified) {
      let { coords } = position
      let alert_message = message || defaultMessage
      let map_url = `http://maps.google.com/maps?q=${coords.latitude},${coords.longitude}`

      let shareOptions = {
        title: 'DANGER',
        message: alert_message,
        url: map_url
      }

      if (phones && phones.length) {
        const sanitizedPhones = []
        phones.split(',').forEach(p => sanitizedPhones.push(p.replace(/\D/g, '')))

        sanitizedPhones.forEach(phone => {
          SmsAndroid.sms(
            phone, // phone number to send sms to
            `${alert_message} ${map_url}`, // sms message
            'sendDirect',
            (err, message) => {
              if (err) {
                console.log('error')
              } else {
                console.log(message) // callback message
              }
            }
          )
        })
      }

      Share.shareSingle(Object.assign(shareOptions, { 'social': 'whatsapp' }))
      this.setState({ notified: true })
    }
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.sendMessage(position)
      },
      (error) => alert(error.message),
      { timeout: 20000, maximumAge: 1000 }
    )

    navigator.geolocation.watchPosition((position) => {
      this.sendMessage(position)
    })
  }

  render () {
    const { emails, host, message, password, phones, subject, user } = this.state

    return (
      <View style={styles.container}>
        <Settings
          emails={ emails } updateEmails={ (emails) => this.setState({ emails }) }
          host={ host } updateHost={ (host) => this.setState({ host }) }
          message={ message } updateMessage={ (message) => this.setState({ message }) }
          phones={ phones } updatePhones={ (phones) => this.setState({ phones }) }
          password={ password } updatePassword={ (password) => this.setState({ password }) }
          subject={ subject } updateSubject={ (subject) => this.setState({ subject }) }
          user={ user } updateUser={ (user) => this.setState({ user }) } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

AppRegistry.registerComponent('Exclamation', () => Exclamation)
