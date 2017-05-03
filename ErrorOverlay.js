import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

// todo(brentvatne): set some base64 image as default
let NO_NETWORK_IMAGE_URI = '';

export default class ErrorOverlay extends React.Component {

  static propTypes = {
    onRetryLoad: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
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

    // <Image
    //   source={{uri: NO_NETWORK_IMAGE_URI}}
    //   resizeMode="contain"
    //   style={{width: 60, height: 60, marginBottom: 10}} />

    return (
      <TouchableOpacity style={styles.overlay} onPress={this.props.onRetryLoad}>
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
