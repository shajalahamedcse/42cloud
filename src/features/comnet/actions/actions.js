const fetchServers = (data) => {
  data.token.catalog.forEach((items) => {
    if (items.type === 'compute') {
      items.endpoints.forEach((item) => {
        if (item.interface === 'public') {
          let parser = document.createElement('a');
          parser.href = item.url;
          localStorage.setItem('computePrefix', parser.pathname);
        }
      })
    }
  });
  const computePrefix = localStorage.getItem('computePrefix');
  const fetchURL = constants.OS_COMPUTE + computePrefix + apiPath.getServers;
};

