
const apiPath = {
  //// ServiceType: identity
  fetchToken: {
    path: '/v3/auth/tokens',
    type: 'identity',
  },
  getTokenData: {
    path: '/v3/auth/tokens',
    type: 'identity',
  },
  deleteToken: {
    path: '/v3/auth/tokens',
    type: 'identity',
  },
  getOwnProjects: {
    path: '/v3/users/${user_id}/projects',
    type: 'identity',
  },


  //// ServiceType: image
  getImages: {
    path: '/v2/images',
    type: 'image',
  },


  //// ServiceType: compute
  getServers: {
    path: '/servers',
    type: 'compute',
  },
  getProjectQuota: {
    path: '/os-quota-sets/${project_id}/detail',
    type: 'compute',
  }
};


const proxyPrefix = {
  identity: '/os-identity',
  compute: '/os-compute',
  image: '/os-image',
  volume: '/os-volume'
}

export { apiPath, proxyPrefix }

