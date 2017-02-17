import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Alert
} from 'react-native';

import { Container, Content, List, ListItem, Thumbnail, Text, Icon, Left, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
//import { logout } from '../actions';

const userThumb = require('../assets/img/Chad-Regelin.jpg');

class ControlPanel extends Component {

  constructor(props) {
    super(props);
    const { user } = this.props;
    const data = user ? JSON.parse(user) : '';

    this.state = {
      user: data,
      avatarSource: userThumb,
      trueSwitchIsOn: true,
      falseSwitchIsOn1: false,
      falseSwitchIsOn2: false,
      falseSwitchIsOn3: false,
    };
  }

  changeLoadOrder(text) {
    this.props.filterDocuments(text);
  }

  render() {
    const { closeDrawer } = this.props;
    return (
      <Container style={styles.controlPanelContainer}>
        <Content style={styles.controlPanelContent}>
          <List>

            <ListItem avatar style={styles.controlPanelListHead} onPress={Actions.profile}>
              <Left>
                <Thumbnail size={45} source={this.state.avatarSource} />
              </Left>
              <Body>
                <Text style={styles.controlPanelListTitle}>
                  My Name Here
                </Text>
                <Text note style={styles.controlPanelListSubTitle}>
                  RDC - Division 2
                </Text>
              </Body>
            </ListItem>
            <ListItem
              button
              iconLeft
              style={styles.controlPanelListItem}
              onPress={() => { closeDrawer(); this.changeLoadOrder('title'); }}
            >
              <FontAwesome name="sort-alpha-asc" style={styles.controlPanelListIcon} />
              <Text style={styles.controlPanelListText}>Alphabetical</Text>
            </ListItem>
            <ListItem
              button
              iconLeft
              style={styles.controlPanelListItem}
              onPress={() => { closeDrawer(); this.changeLoadOrder('favorite'); }}
            >
              <Icon name="star" style={styles.controlPanelListIcon} />
              <Text style={styles.controlPanelListText}>Favorites</Text>
            </ListItem>
            <ListItem
              button
              iconLeft
              style={styles.controlPanelListItem}
              onPress={() => { closeDrawer(); this.changeLoadOrder('timestamp'); }}
            >
              <FontAwesome name="history" style={styles.controlPanelListIcon} />
              <Text style={styles.controlPanelListText}>Recent Accessed</Text>
            </ListItem>
            <ListItem
              button
              iconLeft
              style={styles.controlPanelListItem}
              onPress={() => { closeDrawer(); this.changeLoadOrder('download'); }}
            >
              <Icon name="cloud-download" style={styles.controlPanelListIcon} />
              <Text style={styles.controlPanelListText}>Downloaded</Text>
            </ListItem>
            <ListItem
              button
              iconLeft
              style={styles.controlPanelListItem}
              onPress={() => { closeDrawer(); this.changeLoadOrder('all'); }}
            >
              <Icon name="folder" style={styles.controlPanelListIcon} />
              <Text style={styles.controlPanelListText}>All Documents</Text>
            </ListItem>

            <ListItem
              button
              iconLeft
              style={styles.controlPanelListItem}
              onPress={() => { closeDrawer(); this.props.logout(this.props); }}
            >
              <FontAwesome name="sign-out" style={styles.controlPanelListIcon} />
              <Text style={styles.controlPanelListText}>Logout</Text>
            </ListItem>

          </List>
        </Content>
      </Container>
    );
  }
}

const styles = {
  controlPanelContainer: {
    flex: 1,
    marginLeft: -18,
    backgroundColor: 'white',
  },
  controlPanelContent: {
    backgroundColor: 'white',
  },
  controlPanelListHead: {
    paddingLeft: 8,
    backgroundColor: '#636363'
  },
  controlPanelListTitle: {
    color: 'white',
  },
  controlPanelListSubTitle: {
    fontSize: 9,
    color: 'white',
  },
  controlPanelListItem: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 2
  },
  controlPanelListDivider: {
    borderColor: 'white',
    paddingTop: 40,
  },
  listDividerText: {
    borderColor: 'white',
  },
  controlPanelListItemDivider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlPanelListItemDividerText: {
    fontSize: 12,
    color: '#4b4b4b',
  },
  controlPanelListIcon: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  controlPanelListText: {
    color: 'black',
    fontSize: 14,
  },
  controlPanelList2Text: {
    color: 'black',
    fontSize: 12,
  },
  controlPanelList2Icon: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
  },
};

const mapStateToProps = (state) => {
  const { user } = state.authenticate;
  return { user };
};

export default connect(mapStateToProps, {})(ControlPanel);
