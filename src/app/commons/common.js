import { apiPath, proxyPrefix } from 'app/config/api';
import _ from 'lodash';

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
const combineURL = (operation, tmpl={}) => {
  let serviceType = apiPath[operation].type;
  let urlPrefix = JSON.parse(sessionStorage.getItem('urlPrefix'));
  let url = proxyPrefix[serviceType] +
            urlPrefix[serviceType] +
            apiPath[operation].path;
  return _.template(url)(tmpl);
};

const getToken = () => {
  return localStorage.getItem('scopedToken');
};

export { parseURLPrefix, combineURL, combineIdentityURL, getToken };


