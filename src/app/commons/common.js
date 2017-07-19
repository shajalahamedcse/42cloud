import { apiPath, proxyPrefix } from 'config/api';

// return a parsed URL object
const urlParse = (url) => {
  let parser = document.createElement('a');
  parser.href = url;
  return parser;
};

//
const combineIdentityURL = (operation) => {
  let serviceType = apiPath[operation].type;
  let fetchURL = proxyPrefix[serviceType] +
                  apiPath[operation].path;
  return fetchURL;
};


// After Identity Passed.
const combineURL = (operation) => {
  console.log(operation);
  let serviceType = apiPath[operation].type;
  let urlPrefix = JSON.parse(sessionStorage.getItem('urlPrefix'));
  let fetchURL = proxyPrefix[serviceType] +
                  urlPrefix[serviceType] +
                  apiPath[operation].path;
  return fetchURL;
};

const parseURLPrefix = (data) => {
  let catalog = data.token.catalog;
  let urlPrefix = {};
  catalog.forEach((items) => {
    items.endpoints.forEach((item) => {
      if (item.interface === 'public') {
        urlPrefix[items.type] = urlParse(item.url).pathname
      }
    })
  });
  return urlPrefix;
};

export { parseURLPrefix, combineURL, combineIdentityURL };


