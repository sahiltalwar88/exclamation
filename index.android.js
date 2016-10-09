import React, { Component } from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import { Container, Header, Title, Content, Spinner } from 'native-base'
import Settings from './components/settings'
import Share from 'react-native-share'
import SmsAndroid from 'react-native-sms-android'

const Mailer = require('NativeModules').RNMail

class Exclamation extends Component {
  constructor (props) {
    super(props)
    this.state = { notified: false }
  }

  componentWillMount () {
    AsyncStorage.getItem('settingsReady')
      .then((value) => this.setState({ ready: !!value }))
  }

  sendEmail (msg) {
    AsyncStorage.getItem('emailList').then(emails => {
      AsyncStorage.getItem('subject').then(subject => {
        Mailer.mail({ subject: subject, recipients: emails.split(','), body: msg }, () => {})
      })
    })
  }

  sendMessage (position) {
    AsyncStorage.getItem('msg').then((alert_message) => {
      AsyncStorage.getItem('phone_list').then((list) => {
        let { coords } = position
        let map_url = `http://maps.google.com/maps?q=${coords.latitude},${coords.longitude}`
        const fullMessageBody = `${alert_message} ${map_url}`

        list.split(',').forEach((phone) => SmsAndroid.sms(phone, fullMessageBody, 'sendDirect', () => {}))

        if (!this.state.notified) {
          let shareOptions = {
            title: 'DANGER',
            message: alert_message,
            url: map_url
          }

          AsyncStorage.getItem('shareApp').then((shareApp) => {
            if (shareApp.toLowerCase() === 'email') {
              this.sendEmail(fullMessageBody)
            } else if (shareApp.toLowerCase() === 'whatsapp') {
              Share.shareSingle(Object.assign(shareOptions, { 'social': 'whatsapp' }))
              this.setState({ notified: true })
            }
          })
        }
      })
    })
  }

  notify () {
    navigator.geolocation.getCurrentPosition((position) =>
      this.sendMessage(position), () => {}, {timeout: 80000, maximumAge: 1000})

    navigator.geolocation.watchPosition((position) => this.sendMessage(position))
  }

  render () {
    let content = <Settings />
    let title = 'Settings'

    if (this.state.ready) {
      content = <Spinner />
      title = 'Notifying...'
      this.notify()
    }
    return (
      <Container>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Content>
          {content}
        </Content>
      </Container>
    )
  }
}

AppRegistry.registerComponent('Exclamation', () => Exclamation)
