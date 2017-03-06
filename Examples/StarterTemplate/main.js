import Expo from 'expo';
import React from 'react';
import {
  BackAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  Navigator,
  View,
} from 'react-native';

import ExNavigator from '@expo/react-native-navigator';
import ExRouter from 'ExRouter';

console.ignoreYellowBox = true;

class Main extends React.Component {

  componentDidMount() {
    if (StatusBar) {
      StatusBar.setBarStyle('light-content');
    }

    if (BackAndroid) {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this._navigator.getCurrentRoutes().length > 1) {
          this._navigator.pop();
          return true;
        }

        return false;
      });
    }
  }

  render() {
    let initialRoute = ExRouter.getHomeRoute();

    return (
      <View style={{flex: 1}}>
        <View style={styles.spacer} />
        <ExNavigator
          ref={component => this._navigator = component}
          initialRoute={initialRoute}
          renderNavigationBar={props => <Navigator.NavigationBar {...props} style={styles.navigationBar} />}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navigationBar: {
    backgroundColor: '#05a5d1',
  },
  spacer: {
    height: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#05a5d1',
  },
});

Expo.registerRootComponent(Main);
