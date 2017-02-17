import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import {
  Container,
  Left,
  Right,
  Body,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Input,
  InputGroup
} from 'native-base';

import { searchChanged } from '../actions';
import ControlPanel from './ControlPanel';
import MainFeed from './MainFeed';

class HomeScreen extends Component {

  state={
    search: false,
    drawerOpen: false,
    drawerDisabled: false,
  };

  // == [ SEARCH ] == //
  setSearchText(text) {
    this.props.searchChanged(text);
  }

  closeDrawer = () => {
    this.drawerStatus.close();
  };

  openDrawer = () => {
    this.drawerStatus.open();
  };

  openSearchBar = () => {
    this.setState({ search: true });
  };

  closeSearchBar = () => {
    this.setState({ search: false });
  };

  renderHeader() {
    if (this.state.search) {
      return (
        <Header style={styles.header} searchBar rounded>
          <Body>
          <InputGroup>
            <Icon name="ios-search" style={styles.iconWhite} />
            <Input
              style={styles.inputWhite}
              placeholderTextColor="white"
              placeholder="Search"
              onChangeText={this.setSearchText.bind(this)}
              value={this.props.search}
            />
            <Button transparent onPress={this.closeSearchBar}>
              <Icon name="ios-close" style={styles.iconWhite} />
            </Button>
          </InputGroup>
          </Body>
        </Header>
      );
    }
    return (
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={this.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerTitle}>
            {(this.props.title) ? this.props.title : 'PQS: In Progress'}
          </Title>
        </Body>
        <Right>
          <Button transparent onPress={this.openSearchBar}>
            <Icon name="ios-search" />
          </Button>
        </Right>
      </Header>
    );
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawerStatus = ref; }}
        type="overlay"
        content={
            <ControlPanel closeDrawer={this.closeDrawer} />
        }
        styles={drawerStyles}
        onOpen={() => {
            this.setState({ drawerOpen: true });
        }}
        onClose={() => {
          this.setState({ drawerOpen: false });
        }}
        tapToClose
        tweenDuration={350}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={0.4}
        closedDrawerOffset={-3}
        tweenHandler={ratio => ({
            main: {
                opacity: 1,
            },
            mainOverlay: {
                opacity: ratio / 2,
                backgroundColor: 'black',
            },
        })}

      >
        <Container>
          {this.renderHeader()}
          <Content>
            <MainFeed />
          </Content>
        </Container>
      </Drawer>
    );
  }
}

const styles = {
  header: {
    backgroundColor: '#607d8b'
  },
  headerTitle: {
    color: 'white',
  },
  iconWhite: {
    color: 'white',
  },
  inputWhite: {
    color: 'white',
  },
};

const drawerStyles = {
  drawer: {
    shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3
  },
  main: {
    paddingLeft: 3
  }
};

const mapStateToProps = (state) => {
  const { user } = state.authenticate;
  return { user };
};

export default connect(mapStateToProps, {
  searchChanged,
})(HomeScreen);
