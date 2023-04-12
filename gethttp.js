(function (ext) {

  function fetchUrl(url) {
    return fetch(url)
      .then(response => response.text());
  }

  ext.getHttps = function (url, callback) {
    // Use the fetchUrl() function to make the GET request
    fetchUrl(url)
      .then(data => callback(data));
  };

  // Describe the extension metadata
  ext._getStatus = function () {
    return {status: 2, msg: 'Ready'};
  };
  ext._shutdown = function () {};

  // Register the extension
  const descriptor = {
    blocks: [
      ['R', 'fetch URL %s', 'getHttps', 'https://example.com'],
    ],
    displayName: 'HTTPS Fetch',
    menuIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVR42mNkwAL+L/A/0/iFjICuhDxDJdgogZkhP8HAgMDAwMCxSwTAKIDq3//GtHHsQPTCGOpgwoXMjgiiLEBZCE91AvAjtBVkJawMA0DUFC1cLWlgAAAAASUVORK5CYII=',
    id: 'getHttps'
  };
  ScratchExtensions.register('HTTPS Fetch', descriptor, ext);

})({});
