/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule ListScreen
 */
'use strict';

import React from 'react';
import {
  Image,
  ListView,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import ExRouter from 'ExRouter';
import LoadingContainer from 'react-native-loading-container';
import fetchWithTimeout from 'fetchWithTimeout'

const SELF_IMAGE = "https://s3-us-west-2.amazonaws.com/examples-exp/reddit/self.png";
const DEFAULT_IMAGE = "https://s3-us-west-2.amazonaws.com/examples-exp/reddit/default.png";

function getImageUri(thumbnail) {
  if (thumbnail.match('http:')) {
    return { uri: thumbnail };
  } else if (thumbnail === 'self') {
    return { uri: SELF_IMAGE };
  } else {
    return { uri: DEFAULT_IMAGE };
  }
}

export default class ListScreen extends React.Component {

  constructor(props) {
    super(props);

    this._loadInitialDataAsync = this._loadInitialDataAsync.bind(this);
    this._onReadyAsync = this._onReadyAsync.bind(this);
    this._renderRow = this._renderRow.bind(this);

    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource,
    };
  }

  render() {
    return (
      <LoadingContainer
        onLoadStartAsync={this._loadInitialDataAsync}
        onReadyAsync={this._onReadyAsync}>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} />
      </LoadingContainer>
    );
  }

  _renderRow({data}, rowId) {
    return (
      <TouchableHighlight
        onPress={() => { this._handlePress(data) }}
        underlayColor='rgba(0,0,0,0.03)'>
        <View style={styles.row}>
          <Image source={getImageUri(data.thumbnail)} style={styles.thumbnail} resizeMode="contain" />

          <View style={styles.rowInfo}>
            <Text style={styles.titleText}>{data.title}</Text>
            <Text style={styles.authorText}>Submitted by {data.author}</Text>
            <Text style={styles.commentText}>{data.num_comments} {parseInt(data.num_comments, 10) === 1 ? 'comment' : 'comments'}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _handlePress({permalink}) {
    this.props.navigator.push(ExRouter.getDetailRoute(permalink));
  }

  async _loadInitialDataAsync() {
    let response = await fetchWithTimeout('https://www.reddit.com/r/reactnative.json');
    return response.json();
  }

  async _onReadyAsync({data: {children: stories}}) {
    let dataSource = this.state.dataSource.cloneWithRows(stories);

    return new Promise((resolve) => {
      this.setState({dataSource}, resolve);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 64 : 60,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  rowInfo: {
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 10,
    flexWrap: 'wrap',
    flex: 1,
  },
  titleText: {
    fontSize: 17,
    color: '#05a5d1',
  },
  authorText: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
  },
  commentText: {
    color: '#888',
    fontSize: 14,
  },
  thumbnail: {
    width: 70,
    height: 52.5,
    marginLeft: 5,
  },
});
