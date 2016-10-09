import React, { Component } from 'react'
import { AsyncStorage, ScrollView, BackAndroid } from 'react-native'
import { Container, Content, InputGroup, Input, Icon, Button, List, ListItem, Text, Tabs } from 'native-base';
import myTheme from '../Themes/myTheme';


class Tab1 extends Component {
  constructor (props) {
    super(props)
    this.state = { phones: [] }
  }

  saveSettings (value, key) {
    try {
        AsyncStorage.setItem(key, value[key]);
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
                          keyboardType="phone-pad"
                          value={(this.state && this.state.tlf) || ''}
                          onChangeText={(tlf) => this.setState({tlf})}
                        />
                    </InputGroup>

                    <Button block success iconRight style={{marginLeft: 30, marginRight: 30, marginBottom: 15, margin: 5}}
                      onPress={() => {
                        if (this.state.tlf) {
                             let new_phones = this.state.phones
                             new_phones.push(this.state.tlf)
                             this.saveSettings({phone_list: new_phones.join(',')}, 'phone_list')
			     this.setState({
				phone_list: new_phones,
				tlf: ''
			     });
                        }
		      }}>
                        Add Phone Number
                        <Icon name='ios-add-circle' />
                    </Button>

                    <ScrollView
          scrollEventThrottle={200}
          style={{height: 400, marginBottom: 15}}
          ref={(scrollView) => { _scrollView = scrollView; }}>
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

class Tab2 extends Component {

  saveSettings (value, key) {
    try {
        AsyncStorage.setItem(key, value[key]);
    } catch (error) {
        // Error saving data
    }
  }

  render () {
    return (
<Container style={{margin: 10}}>
                <Content>
                    <InputGroup borderType='rounded'  style={{marginTop: 30, margin: 5}}>
                        <Icon name='ios-person' style={{color:'#00C497'}}/>
                        <Input
			  placeholder='Your name'
                          value={(this.state && this.state.name) || ''}
                          onChangeText={(name) => {
                             this.setState({name})
                             this.saveSettings({name}, 'name')
                          }}
                        />
                    </InputGroup>

                    <InputGroup borderType='rounded' style={{margin: 5}}>
                        <Icon name='ios-text' style={{color:'#00C497'}}/>
                        <Input
			  placeholder='Message to be sent out in an emergency'
                          value={(this.state && this.state.msg) || ''}
                          onChangeText={(msg) => {
                             this.setState({msg})
                             this.saveSettings({msg}, 'msg')
                          }}
                        />
                    </InputGroup>

                    <Button block success iconRight style={{marginTop: 45, margin: 5}}
                      onPress={() => {
                        AsyncStorage.setItem('settingsReady', 'yes');
                        BackAndroid.exitApp();
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
    var _scrollView: ScrollView;

    return (


            <Container>
                <Content>

<Tabs theme={myTheme}>
                <Tab1 tabLabel="Phone List" color='#000' />
                <Tab2 tabLabel="Message and name" color='#000' />
</Tabs>
                </Content>
            </Container>

    );
  }
}
