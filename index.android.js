import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native'
import Share from 'react-native-share'

class Exclamation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      notified: false
    }
  }

  sendMessage (position) {
    if (!this.state.notified) {
      let { coords } = position
      let shareOptions = {
        title: "DANGER",
        message: `Hey I am in danger here, find me here!`,
        url: `http://maps.google.com/maps?q=${coords.latitude},${coords.longitude}`
      };
      Share.shareSingle(Object.assign(shareOptions, {
        "social": "whatsapp"
      }));
      this.setState({
        notified: true
      });
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.sendMessage(position)
      },
      (error) => alert(error.message),
      {timeout: 20000, maximumAge: 1000}
    );

    navigator.geolocation.watchPosition((position) => {
      this.sendMessage(position)
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Panic button</Text>
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
