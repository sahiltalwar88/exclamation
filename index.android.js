import React, { Component } from 'react'
import { AppRegistry, StyleSheet, AsyncStorage } from 'react-native'
import Settings from './components/settings'
import Share from 'react-native-share'
import { Container, Header, Title, Content, Spinner } from 'native-base'

class Exclamation extends Component {
  constructor (props) {
    super(props)

    this.state = { notified: false }
  }

  componentWillMount() {
    AsyncStorage.getItem('settingsReady').then((value) => this.setState({ready: value?true:false}))
  }

  sendMessage (position) {
    if (!this.state.notified) {
      AsyncStorage.getItem('msg').then((alert_message) => {

        let { coords } = position
        let map_url = `http://maps.google.com/maps?q=${coords.latitude},${coords.longitude}`

        let shareOptions = {
          title: 'DANGER',
          message: alert_message,
          url: map_url
        }

        var SmsAndroid = require('react-native-sms-android');
        AsyncStorage.getItem('phone_list').then((list) => {
          list.split(",").forEach((telf) => {
            SmsAndroid.sms(
              telf, // phone number to send sms to
              `${alert_message} ${map_url}`, // sms body
              'sendDirect',
              (err, message) => {
                if (err) {
                  console.log("error");
                } else {
                  console.log(message); // callback message
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
      title = 'Notifiyng...'
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
