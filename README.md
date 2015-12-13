# LoadingContainer [![Slack](http://slack.exponentjs.com/badge.svg)](http://slack.exponentjs.com)

LoadingContainer is a component that co-ordinates fetching data, displaying a loading indicator while that's in progress, and an error message with a retry button when a request fails.

## Why?

We are building an app where pretty much every screen has to fetch new data, so we wanted a way to generalize our logic for showing loading screens, handling errors and retries.

## Installation

```
npm install @exponent/react-native-loading-container --save
```

LoadingContainer is compatible with React Native 0.15 and newer.

## Usage

Import LoadingContainer as a JavaScript module:

```js
import LoadingContainer from '@exponent/react-native-loading-container';
```

LoadingContainer is intended to wrap the content of your scene components. A scene component is the top-level component for each route.

The only two props that are required are `onLoadStartAsync` and `onReadyAsync` - these must both be [async functions](https://medium.com/the-exponent-log/react-native-meets-async-functions-3e6f81111173#.y5ulf6wqj) (or return Promises), and must resolve when they are completed.

`onLoadStartAsync` is responsible for fetching the data that the scene needs to render and returning it. In the example below, we return the JSON response from the reactnative subreddit. If an exception is thrown in this function, an error overlay is rendered where the user can tap to retry. Tapping retry will invoke this function again. The return value of `onLoadStartAsync` is fed into `_onReadyAsync`.

`onReadyAsync` is responsible for taking the data fetched by `onLoadStartAsync` and updating our component state. When it resolves, LoadingContainer will hide the loading indicator.


```js
export default class ListScreen extends React.Component {

  render() {
    return (
      <LoadingContainer
        onLoadStartAsync={this._loadInitialDataAsync.bind(this)}
        onReadyAsync={this._onReadyAsync.bind(this)}>
        { /* render content */ }
      </LoadingContainer>
    );
  }

  async _loadInitialDataAsync() {
    let response = await fetchWithTimeout('https://www.reddit.com/r/reactnative.json');
    return response.json();
  }

  async _onReadyAsync({data: {children: stories}}) {
    return new Promise((resolve) => {
      this.setState({stories}, resolve);
    });
  }

}
```

A complete, runnable example is available in [Examples/StarterTemplate](https://github.com/exponentjs/react-native-loading-container/tree/master/Examples/StarterTemplate), or you can try it from exponent at [exp://exp.host/@brentvatne/StarterTemplate](exp://exp.host/@brentvatne/StarterTemplate).

### Customization

LoadingContainer was built to our specific use case so it might not have all of the hooks that you will want to customize it for your application -- if this is the case, please submit a pull request.

Currently only the following props are exposed:

- `onError` - invoked with the exception object when `onLoadStartAsync` throws an exception.
- `renderLoadingOverlay` - returns a React element that will be rendered when loading is in progress. It must implement `showOverlay`, `hideOverlay` and `fadeOverlay` methods.
- `renderErrorOverlay` - returns a React element that will be rendered when loading is in progress. It will receive a function prop called `onRetryLoad` that should be invoked when the user indicates that they would like retry fetching data.

```js
<LoadingContainer
  onError={e => console.log(e)}
  renderLoadingOverlay={props => <MyCustomLoadingOverlay {...props} />}
  renderErrorOverlay={props => <MyCustomErrorOverlay {...props} />}
/>
```
