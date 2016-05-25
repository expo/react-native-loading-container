/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule DefaultLoadingIndicator
 */
'use strict';

import React from 'react';
import {
  ActivityIndicatorIOS,
  Platform,
  ProgressBarAndroid,
  StyleSheet,
  View,
} from 'react-native';

export default class DefaultLoadingIndicator extends React.Component {

  render() {
    if (Platform.OS === 'android') {
      return (
        <View style={styles.loadingContainer}>
          <ProgressBarAndroid styleAttr="Large" color="#ccc" />
        </View>
      );
    } else {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicatorIOS size="large" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
});
