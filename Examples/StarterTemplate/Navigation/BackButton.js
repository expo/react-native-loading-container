/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule BackButton
 */
'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';

import ExNavigator from '@exponent/react-native-navigator';
import ResponsiveImage from '@exponent/react-native-responsive-image';

export default class BackButton extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  render() {
    return (
      <TouchableOpacity
        touchRetentionOffset={barButtonTouchRetentionOffset}
        onPress={() => this.props.navigator.pop()}
        style={ExNavigator.Styles.barBackButton}>
        <ResponsiveImage
          sources={{
            2: {
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAqCAYAAACtMEtjAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABxpRE9UAAAAAgAAAAAAAAAVAAAAKAAAABUAAAAVAAABCxhsNeEAAADXSURBVFgJvJM9C8JQDEUrIiLiIA7iIDj4/xcnB3HQwcFvHARBEAQREVF01vPA0vAGM6TxQmjSkHteHm2S+KiP7djHOnMdkL6/Mcxe55uNBCSFhe1y1QS31Dx+9vIiTX9AAjT0zVriEG8gazOkAGCjQGbWNYoYbP8B2SmQuXWTEgZ7b0gZwEGBLOibVGH6SMivKc7NkCqAkzekBuCsQMJ/ZFKd6QsRX5GszZAGgKsCWdE3qcn0jZAnj3MzpAXg7g1pA3gokDV9kzpMP4n4imRthnQBvLwhHwAAAP//RYcLnAAAAMpJREFUvdYrC8JQAMXxKzLEIAYxGCwGP7wOH/P9Kq4oaJjBYBAMQxBBRLHquWGwIPeUoxcOg134/1ibMcbUsRf2dqyBO8mpofLE/oJVAT0I1sS95FRQuWOuL/MlEiJl7EawlgorIXQlWFuFFRG6EKyrwgoInQkWqLA8QjHBeiosh9CJYH0V5iF0JNhAhWUROhBspMIyCO0JNlZiO4JNVJjtbAg2VWIrgs2U2JJgCyU2d2ChErKt4RdsrUaSXieFbZOXv3raf4woHf8AvbFKeXDI5jkAAAAASUVORK5CYII=',
              isStatic: true,
            },
            3: {
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAA/CAYAAABjJtHDAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAhOAAAITgBRZYxYAAAABxpRE9UAAAAAgAAAAAAAAAgAAAAKAAAACAAAAAfAAABetwkrnwAAAFGSURBVGgFzNfPSwJREMBxK0IiCKSDeAg8dAi8eOjgxUuHLv6rnaJDHTwZ6KVDWvkDIZAghKSi3xbkd8AHohA7wfhmYHjwnN357OyyrKlU/DiBUI/PWBScsfU7zdriz/F2qjOwAJS96HGOIIDm19OYusYfsAA9jgG8SAALwKNlAVdodKmACVDqzUNg12SYSJK1aa6iwRrZUcJa1MsFmYbA+mSSSYWapcDWQd16hKVBDZSwK+rNb+UGTe48wjZB3XuEbYEaKmHyejG/lRmaPHiEbYMaKWE31JtPLEuTR4+wHKhnj7AdUC8eYXlQr0pYm3rzZ2yXJm8eYXug3pUw+Roxn1iBJh8eYUVQnx5h+6C+PMJKoMZKWJd682esTJNvj7CDf8B6HLNKmsYhZ/8hw/d8klVg8l/BNCqc3SVMrlz7HnviGPOJTQAAAP//IwzskAAAAUVJREFUzdixSwJhHMZxRUQaxEEQXBwaXBpanFxcXJz6C6MijQwtLVSyJnHIIQeHiAbBIRBBIhQzS+v5EQdCoPcsj77w45YXvh9Oebk7j+dvHeAyx/y4nAX2HWJkK4PSN4YBHsl0CKUxXyTwGPtlK4USCzyR6RBKYmYY5ic+VQITiH2SwKwSuI/YlATmlMA9xD5I4JkSGEdsQgDtv3quBO4iNiaBeSUwhtiIBF4ogVHE3klgQQmMIPZGAotKYBixIQm8VAJDiA1I4JUSGESsTwLLSuAOYq8k8FoJDCDWI4E3SqAfsS4JrCiBPsReSGBVCfQi9kQCa2pghwTeKoHWeiSBdTXwgQTeqYENEnivBlrQ7UtTU42znh0b64CtTcCcZmkFsO1s2uTVnpDtm8vyXbSjZ2uWvYg7QDu07fDeqmVfq54x/2C/yunX41hxMv0AAAAASUVORK5CYII=',
              isStatic: true,
            },
          }}
          style={styles.backIcon}
        />
      </TouchableOpacity>
    );
  }
}

let barButtonTouchRetentionOffset = {
  top: 40,
  left: 60,
  right: 60,
  bottom: 80,
};

let styles = StyleSheet.create({
  barBackButton: {
    paddingRight: 40,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backIcon: {
    tintColor: '#fff',
    width: 13,
    height: 22,
    marginTop: 10 + PixelRatio.get(),
    marginLeft: 8 - PixelRatio.get(),
  },
});
