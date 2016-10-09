import React, { Component } from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import { Container, Header, Title, Content, Spinner } from 'native-base'
// import email from 'emailjs'
import Settings from './components/settings'
import Share from 'react-native-share'

let server = null
const defaultMessage = `Hey I am in danger here, find me here!`

const getSecuritySetting = (host) => {
  const microsoftHost = 'smtp-mail.outlook.com'
  return host === microsoftHost ? { ciphers: 'SSLv3' } : true
}

class Exclamation extends Component {
  constructor (props) {
    super(props)

    this.state = { notified: false }
  }

  componentWillMount () {
    AsyncStorage.getItem('settingsReady')
      .then((value) => this.setState({ ready: !!value }))
  }

  initializeEmailServer (user) {
    const host = AsyncStorage.getItem('host').then(host => host)
    const password = AsyncStorage.getItem('password').then(password => password)

    alert(JSON.stringify(host, null, 2))
    alert(JSON.stringify(password, null, 2))

    if (!server && host && password && user) {
      const connectionSettings = {
        host: host,
        password: password,
        tls: getSecuritySetting(host),
        user: user
      }

      server = email.server.connect(connectionSettings)
    }

    return server
  }

  sendEmail () {
    const emails = AsyncStorage.getItem('emails').then(emails => emails)
    const msg = AsyncStorage.getItem('msg').then(msg => msg)
    const subject = AsyncStorage.getItem('subject').then(subject => subject)
    const user = AsyncStorage.getItem('user').then(user => user)

    alert(JSON.stringify(emails, null, 2))
    alert(JSON.stringify(msg, null, 2))
    alert(JSON.stringify(subject, null, 2))
    alert(JSON.stringify(user, null, 2))

    const server = this.initializeEmailServer(user)
    if (server) {
      emails.split(',').forEach(email => {
        server.send(
          { text: msg, from: user, to: email.trim(), subject: subject, 'reply-to': user },
          (err, message) =>
            message
              // TODO: ST - Replace with sane logs
              ? alert(JSON.stringify(message, null, 2))
              : alert(JSON.stringify(err, null, 2))
        )
      })
    }
  }

  sendMessage (position) {
    if (!this.state.notified) {
      AsyncStorage.getItem('msg').then((alert_message) => {
        let { coords } = position
        const messageBody = alert_message || defaultMessage
        let map_url = `http://maps.google.com/maps?q=${coords.latitude},${coords.longitude}`

        let shareOptions = {
          title: 'DANGER',
          message: messageBody,
          url: map_url
        }

        var SmsAndroid = require('react-native-sms-android')
        AsyncStorage.getItem('phone_list').then((list) => {
          list.split(',').forEach((telf) => {
            SmsAndroid.sms(
              telf, // phone number to send sms to
              `${messageBody} ${map_url}`, // sms body
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
        })

        Share.shareSingle(Object.assign(shareOptions, {
          'social': 'whatsapp'
        }))
        this.setState({
          notified: true
        })
      })
    }
  }

  notify () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.sendMessage(position)
      },
      (error) => alert(error.message),
      {timeout: 20000, maximumAge: 1000}
    )

    navigator.geolocation.watchPosition((position) => {
      this.sendMessage(position)
    })
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
