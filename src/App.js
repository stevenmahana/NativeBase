import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import HomeScreen from './components/HomeScreen';
import SubFeed from './components/SubFeed';
import reducers from './reducers';

const store = compose(applyMiddleware(ReduxThunk), autoRehydrate())(createStore)(reducers);

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="sub" component={SubFeed} hideNavBar panHandlers={null} />
    <Scene key="home" component={HomeScreen} hideNavBar panHandlers={null} />
  </Scene>
);
class App extends Component {

  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(store, { storage: AsyncStorage }, () => {
      this.setState({ rehydrated: true });
    }); // .purge()
  }

  render() {
    if (!this.state.rehydrated) {
      return (<View><Text>...processing</Text></View>);
    }

    return (
      <Provider store={store} >
        <Router scenes={scenes} />
      </Provider>
    );
  }
}

export default App;
