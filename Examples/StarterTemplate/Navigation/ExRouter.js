/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule ExRouter
 */
'use strict';

import React, {
  Platform,
  Text,
  View,
} from 'react-native';

import ExNavigator from '@exponent/react-native-navigator';

import BackButton from 'BackButton';

let baseRoute = {
  renderBackButton(navigator) {
    return (
      <BackButton navigator={navigator} />
    );
  },
};

const ExRouter = {
  getHomeRoute() {
    return {
      ...baseRoute,

      getTitle() {
        return '/r/reactnative';
      },

      renderTitle() {
        return renderTitle(this);
      },

      getSceneClass() {
        return require('ListScreen');
      },
    };
  },

  getDetailRoute(url) {
    return {
      ...baseRoute,

      renderScene(navigator) {
        let DetailScreen = require('DetailScreen');
        return (
          <DetailScreen
            url={url}
            navigator={navigator}
          />
        );
      }
    };
  },
};

let titleContainerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  alignItems: 'center',
};

if (Platform.OS === 'android') {
  titleContainerStyle.right = 72;
}

let titleTextStyle = {
  color: '#fff',
  fontSize: Platform.OS === 'ios' ? 15 : 18,
  fontWeight: 'bold',
  marginTop: 13,
};


function renderTitle(route) {
  return (
    <View style={titleContainerStyle}>
      <Text style={titleTextStyle}>{route.getTitle()}</Text>
    </View>
  );
}

export default ExRouter;
