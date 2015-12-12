/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule fetchWithTimeout
 */
'use strict';

function timeoutAsync(promise, ms) {
  return new Promise((resolve, reject) => {
    let _timer = setTimeout(() => {
      reject(new Error('API timeout'));
    }, ms);

    promise.then((result) => {
      clearTimeout(_timer);
      return resolve(result);
    }, reject);
  });
}

export default function fetchWithTimeout(url, options = {}, timeout = 10000) {
  return timeoutAsync(fetch(url, options), timeout);
}
