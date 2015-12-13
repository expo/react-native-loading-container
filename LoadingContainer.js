/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule LoadingContainer
 */
'use strict';

import React from 'react-native';
import {
  PropTypes,
  StyleSheet,
  View,
} from 'react-native';
import ReactMixin from 'react-mixin';
import TimerMixin from 'react-native-timer-mixin';

import cloneReferencedElement from 'react-native-clone-referenced-element';

import LoadingOverlay from './LoadingOverlay';
import ErrorOverlay from './ErrorOverlay';

export default class LoadingContainer extends React.Component {
  static propTypes = {
    onLoadStartAsync: PropTypes.func.isRequired,
    onReadyAsync: PropTypes.func.isRequired,
    onError: PropTypes.func,
    renderLoadingOverlay: PropTypes.func.isRequired,
    renderErrorOverlay: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onReadyAsync: () => Promise.resolve(),
    renderLoadingOverlay: props => <LoadingOverlay {...props} />,
    renderErrorOverlay: props => <ErrorOverlay {...props} />,
  };

  constructor(props, context) {
    super(props, context);

    this._attemptLoadAsync = this._attemptLoadAsync.bind(this);
    this._handleError = this._handleError.bind(this);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this._attemptLoadAsync().done();
  }

  showLoadingOverlay() {
    this._errorOverlay.hideOverlay();
    this._loadingOverlay.showOverlay();
  }

  render() {
    let loadingOverlay = cloneReferencedElement(
      this.props.renderLoadingOverlay({}),
      { ref: component => { this._loadingOverlay = component; } }
    );

    let errorOverlay = cloneReferencedElement(
      this.props.renderErrorOverlay({onRetryLoad: this._attemptLoadAsync}),
      { ref: component => { this._errorOverlay = component; } }
    );

    return (
      <View style={styles.container}>
        {this.props.children}
        {loadingOverlay}
        {errorOverlay}
      </View>
    );
  }

  async _attemptLoadAsync() {
    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true });
    this.showLoadingOverlay();

    try {
      result = await this.props.onLoadStartAsync();
    } catch (e) {
      this._handleError(e);
      return;
    }

    await this.props.onReadyAsync(result);
    this._loadingOverlay.fadeOverlay();
    this.setState({ isLoading: false });
  }

  _handleError(e) {
    this.setState({ isLoading: false });
    this._errorOverlay.showOverlay();
    this._loadingOverlay.hideOverlay();
    if (this.props.onError) {
      this.props.onError(e);
    }
  }
}

ReactMixin(LoadingContainer.prototype, TimerMixin);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
