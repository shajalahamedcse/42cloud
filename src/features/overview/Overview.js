import React from 'react';

function overview() {
  return (
    <div>hello overview</div>
  )
}
export default overview;

import * as constants from '../constants';

const identityStep4 = (data) => {
  data.token.catalog.forEach((items) => {
    if (items.type === 'compute') {
      items.endpoints.forEach((item) => {
        if (item.interface === 'public') {
          console.log(item);
          let parser = document.createElement('a');
          parser.href = item.url;
          localStorage.setItem('computePrefix', parser.pathname);
        }
      })
    }
  })

  const computePrefix = localStorage.getItem('computePrefix');
  const fetchURL = constants.OS_COMPUTE + computePrefix + path.getServers;

  fetch(fetchURL, {
    headers: {
      'X-Auth-Token': localStorage.getItem('scopedToken')
    }
  }).then((response) => {
    console.log(response);
  })

}