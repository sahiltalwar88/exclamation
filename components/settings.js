import React, { Component } from 'react'
import { AsyncStorage, ScrollView, BackAndroid } from 'react-native'
import { Container, Content, InputGroup, Input, Icon, Button, List, ListItem, Text, Tabs } from 'native-base'
import myTheme from '../Themes/myTheme'

let _scrollView = ScrollView

class PhoneNumberList extends Component {
  constructor (props) {
    super(props)
    this.state = { phones: [] }
  }

  saveSettings (value, key) {
    try {
      AsyncStorage.setItem(key, value[key])
    } catch (error) {
      // Error saving data
    }
  }

  render () {
    return (
      <Container style={{margin: 10}}>
        <Content>
          <InputGroup borderType='rounded' style={{marginTop: 30, margin: 5}}>
          <Icon name='ios-call' />
          <Input
            placeholder='111222333'
            keyboardType='phone-pad'
            value={(this.state && this.state.currentNumber) || ''}
            onChangeText={(currentNumber) => this.setState({currentNumber})}/>
          </InputGroup>
          <Button block success iconRight style={{marginLeft: 30, marginRight: 30, marginBottom: 15, margin: 5}}
            onPress={() => {
              if (this.state.currentNumber) {
                let new_phones = this.state.phones
                new_phones.push(this.state.currentNumber)
                this.saveSettings({phone_list: new_phones.join(',')}, 'phone_list')
                this.setState({
                  phone_list: new_phones,
                  currentNumber: ''
                })
              }
            }}>
            Add Phone Number
            <Icon name='ios-add-circle' />
          </Button>
          <ScrollView
            scrollEventThrottle={200}
            style={{height: 400, marginBottom: 15}}
            ref={(scrollView) => { _scrollView = scrollView }}>
            <List style={{marginTop: 15, margin: 5}}>
            {this.state.phones.map((item) => {
              return (
                <ListItem key={item}>
                <Text>{item}</Text>
                </ListItem>
              )
            })}
            </List>
          </ScrollView>
        </Content>
      </Container>
    )
  }
}

class EmailList extends Component {
  constructor (props) {
    super(props)
    this.state = { emails: [] }
  }

  saveSettings (value, key) {
    try {
      AsyncStorage.setItem(key, value[key])
    } catch (error) {
      // Error saving data
    }
  }

  render () {
    return (
      <Container style={{margin: 10}}>
        <Content>
          <InputGroup borderType='rounded' style={{marginTop: 30, margin: 5}}>
            <Icon name='ios-laptop' />
            <Input
              placeholder='John <john@smith.com>'
              keyboardType='email-address'
              value={(this.state && this.state.currentEmail) || ''}
              onChangeText={(currentEmail) => this.setState({currentEmail})}/>
          </InputGroup>
          <Button block success iconRight style={{marginLeft: 30, marginRight: 30, marginBottom: 15, margin: 5}}
            onPress={() => {
              if (this.state.currentEmail) {
                let newEmails = this.state.emails
                newEmails.push(this.state.currentEmail)
                this.saveSettings({emailList: newEmails.join(',')}, 'emailList')
                this.setState({
                  emailList: newEmails,
                  currentEmail: ''
                })
              }
            }}>
            Add Email
            <Icon name='ios-add-circle' />
          </Button>
          <ScrollView scrollEventThrottle={200}
            style={{height: 400, marginBottom: 15}}
            ref={(scrollView) => { _scrollView = scrollView }}>
            <List style={{marginTop: 15, margin: 5}}>
            {this.state.emails.map((item) => {
              return (
                <ListItem key={item}>
                <Text>{item}</Text>
                </ListItem>
              )
            })}
            </List>
          </ScrollView>
        </Content>
      </Container>
    )
  }
}

class FinalSettings extends Component {
  saveSettings (value, key) {
    try {
      AsyncStorage.setItem(key, value[key])
    } catch (error) {
      // Error saving data
    }
  }

  render () {
    return (
      <Container style={{margin: 10}}>
        <Content>
          <InputGroup borderType='rounded' style={{marginTop: 30, margin: 5}}>
            <Icon name='ios-person' style={{color: '#00C497'}}/>
            <Input placeholder='Your name'
              value={(this.state && this.state.name) || ''}
              onChangeText={(name) => {
                this.setState({name})
                this.saveSettings({name}, 'name')
              }}/>
          </InputGroup>
          <InputGroup borderType='rounded' style={{margin: 5}}>
            <Icon name='ios-text' style={{color: '#00C497'}}/>
            <Input placeholder='Message subject'
              value={(this.state && this.state.subject) || ''}
              onChangeText={(subject) => {
                this.setState({subject})
                this.saveSettings({subject}, 'subject')
              }}/>
          </InputGroup>
          <InputGroup borderType='rounded' style={{margin: 5}}>
            <Icon name='ios-text' style={{color: '#00C497'}}/>
            <Input placeholder='Message body'
              value={(this.state && this.state.msg) || ''}
              onChangeText={(msg) => {
                this.setState({msg})
                this.saveSettings({msg}, 'msg')
              }}/>
          </InputGroup>
          <InputGroup borderType='rounded' style={{margin: 5}}>
            <Icon name='ios-person' style={{color: '#00C497'}}/>
            <Input placeholder='Email username'
              value={(this.state && this.state.user) || ''}
              onChangeText={(user) => {
                this.setState({user})
                this.saveSettings({user}, 'user')
              }}/>
          </InputGroup>
          <InputGroup borderType='rounded' style={{margin: 5}}>
            <Icon name='ios-person' style={{color: '#00C497'}}/>
            <Input placeholder='Email password'
              value={(this.state && this.state.password) || ''}
              onChangeText={(password) => {
                this.setState({password})
                this.saveSettings({password}, 'password')
              }}/>
          </InputGroup>
          <InputGroup borderType='rounded' style={{margin: 5}}>
            <Icon name='ios-person' style={{color: '#00C497'}}/>
            <Input placeholder='SMTP server URL (smtp.gmail.com)'
              value={(this.state && this.state.host) || ''}
              onChangeText={(host) => {
                this.setState({host})
                this.saveSettings({host}, 'host')
              }}/>
          </InputGroup>
          <Button block success iconRight style={{marginTop: 45, margin: 5}}
            onPress={() => {
              AsyncStorage.setItem('settingsReady', 'yes')
              BackAndroid.exitApp()
            }}>
            Finish Settings
            <Icon name='ios-send' />
          </Button>
        </Content>
      </Container>
    )
  }
}

export default class Settings extends Component {
  render () {
    return (
      <Container>
        <Content>
          <Tabs theme={myTheme}>
            <PhoneNumberList tabLabel='Phone List' color='#000' />
            <EmailList tabLabel='Email List' color='#000' />
            <FinalSettings tabLabel='Final Settings' color='#000' />
          </Tabs>
        </Content>
      </Container>
    )
  }
}
