import { apiPath, proxyPrefix } from 'config/api';

import url from 'url';


//
const combineIdentityURL = (operation) => {
  let serviceType = apiPath[operation].type;
  let fetchUrl = proxyPrefix[serviceType] + apiPath[operation].path;
  console.log(fetchUrl);
  return fetchUrl;
}


// After Identity Passed.
const combineURL = (operation) => {
  console.log(operation);
  let serviceType = apiPath[operation].type;
  let urlPrefix = sessionStorage.getItem('urlPrefix');
  let fetchUrl = proxyPrefix[serviceType] + urlPrefix[serviceType] + apiPath[operation].path;
  console.log(fetchUrl);
  return fetchUrl;
}

const parseURLPrefix = (data) => {
  let catalog = data.token.catalog;
  let urlPrefix = {};
  catalog.forEach((items) => {
    items.endpoints.forEach((item) => {
      if (item.interface === 'public') {
        urlPrefix[items.type] = url.parse(item.url).pathname
      }
    })
  });
  return urlPrefix;
};


export { parseURLPrefix, combineURL, combineIdentityURL };


