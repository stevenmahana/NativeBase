import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Image, Dimensions } from 'react-native';

import {
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Text,
  Button,
  View,
  Icon
} from 'native-base';
import { Bar } from 'react-native-progress';

const { width } = Dimensions.get('window');

const scheduleAhead = require('../assets/img/PQS_Button_Ahead.png');
const scheduleOn = require('../assets/img/PQS_Button_On.png');
const scheduleOff = require('../assets/img/PQS_Button_Off.png');


class MainFeed extends Component {

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem bordered style={{ justifyContent: 'space-between' }}>
              <View >
                <Text style={{ fontSize: 16 }} >101 Safety Fundamentals </Text>
              </View>
              <View >
                <Text style={{ fontSize: 12 }} note>3-M MAINTENANCE PERSON</Text>
              </View>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: 14 }}>Last Signature</Text>
                <Text style={{ fontSize: 12 }} note>28 MAR 2017</Text>
              </View>
              <View>
                <Text style={{ fontSize: 14 }}>Target Completion</Text>
                <Text style={{ fontSize: 12 }} note>16 JUL 2017</Text>
              </View>
              <View>
                <Text style={{ fontSize: 14 }}>74% COMPLETE</Text>
                <Text style={{ fontSize: 12 }} note>37 / 50 SIGNATURES</Text>
              </View>
            </CardItem>
            <CardItem content>
              <Left>
                <Image source={scheduleAhead} />
              </Left>
              <Icon name="ios-link-outline" />
              <Icon name="ios-document-outline" />
            </CardItem>

            <CardItem cardBody>
              <Bar progress={0.74} width={width} borderRadius={0} color={'green'} />
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered style={{ justifyContent: 'space-between' }}>
              <View >
                <Text style={{ fontSize: 16 }} >PQS Title 2 </Text>
              </View>
              <View >
                <Text style={{ fontSize: 12 }} note>3-M MAINTENANCE PERSON</Text>
              </View>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: 14 }}>Last Signature</Text>
                <Text style={{ fontSize: 12 }} note>13 OCT 2016</Text>
              </View>
              <View>
                <Text style={{ fontSize: 14 }}>Target Completion</Text>
                <Text style={{ fontSize: 12 }} note>3 MAR 2017</Text>
              </View>
              <View>
                <Text style={{ fontSize: 14 }}>21% COMPLETE</Text>
                <Text style={{ fontSize: 12 }} note>4 / 19 SIGNATURES</Text>
              </View>
            </CardItem>
            <CardItem content>
              <Left>
                <Image source={scheduleOff} />
              </Left>
              <Icon name="ios-link-outline" />
              <Icon name="ios-document-outline" />
            </CardItem>

            <CardItem cardBody>
              <Bar progress={0.21} width={width} borderRadius={0} color={'red'} />
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered style={{ justifyContent: 'space-between' }}>
              <View >
                <Text style={{ fontSize: 16 }} >PQS Title 3 </Text>
              </View>
              <View >
                <Text style={{ fontSize: 12 }} note>3-M MAINTENANCE PERSON</Text>
              </View>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: 14 }}>Last Signature</Text>
                <Text style={{ fontSize: 12 }} note>01 MAR 2017</Text>
              </View>
              <View>
                <Text style={{ fontSize: 14 }}>Target Completion</Text>
                <Text style={{ fontSize: 12 }} note>04 JUL 2017</Text>
              </View>
              <View>
                <Text style={{ fontSize: 14 }}>86% COMPLETE</Text>
                <Text style={{ fontSize: 12 }} note>18 / 21 SIGNATURES</Text>
              </View>
            </CardItem>
            <CardItem content>
              <Left>
                <Image source={scheduleOn} />
              </Left>
              <Icon name="ios-link-outline" />
              <Icon name="ios-document-outline" />
            </CardItem>

            <CardItem cardBody>
              <Bar progress={0.86} width={width} borderRadius={0} color={'green'} />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const auth = state.authenticate;
  const user = auth.user ? JSON.parse(auth.user) : {};

  return { user };
};

export default connect(mapStateToProps, {})(MainFeed);
