/**
 * This is the entry point for your experience that you will run on Exponent.
 *
 * Start by looking at the render() method of the component called
 * FullScreenLoaderExample. This is where the text and example components are.
 */
'use strict';

import React, {
  AppRegistry,
  BackAndroid,
  Platform,
  StatusBarIOS,
  StyleSheet,
  Navigator,
  View,
} from 'react-native';

import ExNavigator from '@exponent/react-native-navigator';
import ExRouter from 'ExRouter';

class Main extends React.Component {

  componentDidMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setStyle('light-content');
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

AppRegistry.registerComponent('main', () => Main);
