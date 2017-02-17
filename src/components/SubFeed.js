import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Image, Modal, Dimensions, StyleSheet } from 'react-native';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  Thumbnail,
  Container,
  Content,
  Header,
  Title,
  Subtitle,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Text,
  Button,
  View,
  Icon
} from 'native-base';

const { width, height } = Dimensions.get('window');

const userThumb = require('../assets/img/Chad-Regelin.jpg');
const signature = require('../assets/img/signature.png');
const signatureSm = require('../assets/img/signature_sm.png');

const parenthesis = '\u0029';

class PqsFeed extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      thumbnailSize: width < 500 ? 120 : 150,
      signature: width < 500 ? signatureSm : signature,
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  renderModal() {
    return (
      <Container style={styles.modalContainer}>
      <Content>
        <Card style={styles.modalContent}>
          <CardItem>
            <View style={{ alignItems: 'center' }}>
              <Image source={this.state.signature} />
              <Text style={styles.modalTitle}>LT JG James Anderson</Text>
              <Text style={{ fontSize: 12 }} note>Signed: 23 March, 2017 @ 15:33</Text>
            </View>
            <Right>
              <Thumbnail square size={this.state.thumbnailSize} source={userThumb} />
            </Right>
          </CardItem>
          <CardItem content style={{ backgroundColor: 'grey' }}>
            <View style={styles.modalFooter} >
              <FontAwesome name="info" style={styles.modalFooterIcon} />
              <FontAwesome name="envelope" style={styles.modalFooterIcon} />
              <FontAwesome name="trash" style={styles.modalFooterIcon} />
              <FontAwesome
                name="times"
                style={styles.modalFooterIcon}
                onPress={() => { this.setModalVisible(!this.state.modalVisible); }}
              />
            </View>
          </CardItem>
        </Card>
      </Content>
      </Container>
    );
  }

  renderHeader() {
    return (
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={this.openDrawer}>
            <Icon name="ios-arrow-back" />
          </Button>
        </Left>
        <Body>
        <Title style={styles.headerTitle}>
          {(this.props.title) ? this.props.title : '3M Maintenance Person'}
        </Title>
        <Subtitle style={styles.headerSubTitle}>101 Safety Fundamentals</Subtitle>
        </Body>
        <Right>
          <Button transparent onPress={this.openSearchBar}>
            <FontAwesome name="book" style={{ color: 'white', fontSize: 20 }} />
          </Button>
          <Button transparent onPress={this.openSearchBar}>
            <Icon name="ios-search" />
          </Button>
          <Button transparent onPress={this.openSearchBar}>
            <Icon name="md-more" />
          </Button>
        </Right>
      </Header>
    );
  }

  TopNavigation = () => (
    <View style={{ padding: 10, flexDirection: 'row', backgroundColor: 'pink' }}>
      <View style={{ flex: 1 }}><Text>My App</Text></View>
      <Menu onSelect={(value) => alert(`User selected the number ${value}`)}>
        <MenuTrigger>
          <Text style={{ fontSize: 20 }}>&#8942;</Text>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value={1}>
            <Text>One</Text>
          </MenuOption>
          <MenuOption value={2}>
            <Text>Two</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );

  render() {
    return (
      <Container>
        {this.renderHeader()}
        <Content>
          <Card>
            <CardItem
              style={styles.cardItem}
              onPress={() => { this.manageSelectRow(1); }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 14 }}>101.1</Text>
                <FontAwesome active name='bookmark-o' style={{ color: 'blue' }} />
              </View>
              <View style={styles.textBodyWidth}>
                <Text style={styles.titleFontSize}>Discuss the concept of ORM</Text>
              </View>
              <View>
                <Button
                  transparent
                  onPress={() => { this.setModalVisible(true); }}
                  style={{ alignItems: 'center', flexDirection: 'column' }}
                >
                  <Icon name='ios-checkmark-circle' style={{ color: 'green' }} />
                  <Text style={{ fontSize: 12, color: 'green' }} note>23 MAR 2017</Text>
                </Button>
              </View>
              <View>
                <Icon active name='md-more' />
              </View>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={styles.cardItem}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 14 }}>101.2</Text>
                <FontAwesome active name='bookmark-o' style={{ color: 'blue' }} />
              </View>
              <View style={styles.textBodyWidth}>
                <Text style={styles.titleFontSize}>Explain the following as the apply to ORM.</Text>
                <View style={styles.listFontSize}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.listFont}>a{parenthesis} </Text>
                    <Text style={styles.listDescription}>Identify Hazards</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.listFont}>b{parenthesis} </Text>
                    <Text style={styles.listDescription}>Assessing Hazards</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.listFont}>c{parenthesis} </Text>
                    <Text style={styles.listDescription}>Making risk decisions</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.listFont}>d{parenthesis} </Text>
                    <Text style={styles.listDescription}>Implementing controls</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.listFont}>e{parenthesis} </Text>
                    <Text style={styles.listDescription}>Supervising</Text>
                  </View>
                </View>
              </View>
              <View>
                <Button bordered success small onPress={() => { this.setModalVisible(true); }}>
                  <Text> SIGN </Text>
                </Button>
              </View>
              <View>
                <Icon active name='md-more' />
              </View>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={styles.cardItem}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 14 }}>101.3</Text>
              </View>
              <View style={styles.textBodyWidth}>
                <Text style={styles.titleFontSize}>
                  What are the objectives of the Command NAVOSH Program
                </Text>
              </View>
              <View>
                <Button bordered success small onPress={() => { this.setModalVisible(true); }}>
                  <Text> SIGN </Text>
                </Button>
              </View>
              <View>
                <Icon active name='md-more' />
              </View>
            </CardItem>
          </Card>
        </Content>
        <Modal
          animationType={'fade'}
          transparent //={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { Alert.alert('Modal has been closed.'); }}
        >
          {this.renderModal()}
        </Modal>
      </Container>
    );
  }
}

const styleObj = StyleSheet.flatten({
  cardItem: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
});

const styles = {
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: width < 500 ? 100 : 200,
  },
  modalContent: {
    backgroundColor: 'white',
    width: width < 500 ? width : width - (width * 0.20),
  },
  modalTitle: {
    fontSize: width < 500 ? 18 : 20,
  },
  modalFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalFooterIcon: {
    paddingLeft: 30,
    color: 'white',
  },
  textBodyWidth: {
    width: width < 500 ? 220 : 260,
  },
  titleFontSize: {
    fontSize: width < 500 ? 11 : 13,
    fontWeight: '500',
  },
  listFont: {
    fontSize: width < 500 ? 10 : 12,
  },
  listDescription: {
    fontSize: width < 500 ? 10 : 12,
    flex: 1,
    paddingLeft: 5,
  },
  header: {
    backgroundColor: '#607d8b'
  },
  headerTitle: {
    color: 'white',
    fontSize: width < 500 ? 14 : 18,
  },
  headerSubTitle: {
    color: 'white',
    fontSize: width < 500 ? 12 : 14,
  },
  iconWhite: {
    color: 'white',
  },
  inputWhite: {
    color: 'white',
  },
  cardItem: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  cardItemSelected: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'pink',
  },
};

const mapStateToProps = state => {
  const auth = state.authenticate;
  const user = auth.user ? JSON.parse(auth.user) : {};

  return { user };
};

export default connect(mapStateToProps, {})(PqsFeed);
