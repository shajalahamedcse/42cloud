import { apiPath, proxyPrefix } from 'app/config/api';

// return a parsed URL object
const parseURL = (url) => {
  let parser = document.createElement('a');
  parser.href = url;
  return parser;
};

const parseURLPrefix = (data) => {
  let catalog = data.token.catalog;
  let urlPrefix = {};
  catalog.forEach((items) => {
    items.endpoints.forEach((item) => {
      if (item.interface === 'public') {
        urlPrefix[items.type] = parseURL(item.url).pathname
      }
    })
  });
  return urlPrefix;
};

//
const combineIdentityURL = (operation) => {
  let serviceType = apiPath[operation].type;
  return proxyPrefix[serviceType] + apiPath[operation].path;
};

// After Identity Passed.
const combineURL = (operation) => {
  let serviceType = apiPath[operation].type;
  let urlPrefix = JSON.parse(sessionStorage.getItem('urlPrefix'));
  return proxyPrefix[serviceType] +
         urlPrefix[serviceType] +
         apiPath[operation].path;
};

export { parseURLPrefix, combineURL, combineIdentityURL };


