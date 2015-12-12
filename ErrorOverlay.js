/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule ErrorOverlay
 */
'use strict';

import React, {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

// todo(brentvatne): set some base64 image as default
let NO_NETWORK_IMAGE_URI = '';

export default class ErrorOverlay extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.hideOverlay = this.hideOverlay.bind(this);
    this.showOverlay = this.showOverlay.bind(this);

    this.state = { overlayHidden: true };
  }

  hideOverlay() {
    this.setState({ overlayHidden: true });
  }

  showOverlay() {
    this.setState({ overlayHidden: false });
  }

  render() {
    if (this.state.overlayHidden) {
      return null;
    }

    return (
      <TouchableOpacity style={styles.overlay} onPress={this.props.onRetryLoad}>
        <Image
          source={{uri: NO_NETWORK_IMAGE_URI}}
          resizeMode="contain"
          style={{width: 60, height: 60, marginBottom: 10}} />
        <Text style={{color: '#ababad', fontSize: 14}}>
          Unable to contact server. Tap to retry.
        </Text>
      </TouchableOpacity>
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
