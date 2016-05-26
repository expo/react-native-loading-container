/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule LoadingOverlay
 */
'use strict';

import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';

import DefaultLoadingIndicator from './DefaultLoadingIndicator';

const FADE_DELAY_MS = 85;

export default class LoadingOverlay extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      overlayHidden: false,
      overlayOpacity: new Animated.Value(1),
    };
  }

  fadeOverlay() {
    Animated.sequence([
      Animated.delay(FADE_DELAY_MS),
      Animated.timing(this.state.overlayOpacity, {
        toValue: 0,
        easing: Easing.in(Easing.linear),
        duration: 250,
      }),
    ]).start(result => {
      if (result.finished) {
        this.setState({ overlayHidden: true });
      }
    });
  }

  hideOverlay() {
    this.setState({ overlayHidden: true });
  }

  showOverlay() {
    this.state.overlayOpacity.setValue(1);
    this.setState({ overlayHidden: false });
  }

  render() {
    if (this.state.overlayHidden) {
      return null;
    }

    let opacityStyle = {
      opacity: this.state.overlayOpacity,
    };

    return (
      <Animated.View
        pointerEvents="none"
        needsOffscreenAlphaCompositing
        style={[styles.overlay, opacityStyle, this.props.style]}>
        {
          React.Children.count(this.props.children) > 0 ?
            this.props.children :
            <DefaultLoadingIndicator />
        }
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
