const apiPath = {
  // Identity
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

  // Image
  getImages: {
    path: '/v2/images',
    type: 'image',
  },

  // Compute
  getFlavorsInfo: {
    path: '/flavors/detail',
    type: 'compute',
  },

  getServers: {
    path: '/servers',
    type: 'compute',
  },

  getServersInfo: {
    path: '/servers/detail',
    type: 'compute',
  },

  getServerInfo: {
    path: '/servers/${server_id}',
    type: 'compute'
  },

  getProjectQuota: {
    path: '/os-quota-sets/${project_id}/detail',
    type: 'compute',
  },

  getTenantUsage: {
    path: '/os-simple-tenant-usage/${project_id}?detailed=1',
    type: 'compute'
  },

  getKeypairs: {
    path: '/os-keypairs',
    type: 'compute'
  },

  createServer: {
    path: '/servers',
    type: 'compute',
  },

  operateServer: {
    path: '/servers/${server_id}/action',
    type: 'compute'
  },

  // Volume
  getVolumes: {
    path: '/volumes',
    type: 'volumev3'
  },

  getVolumesInfo: {
    path: '/volumes/detail',
    type: 'volumev3'
  },

  getVolumeTypes: {
    path: '/types',
    type: 'volumev3'
  },

  createVolume: {
    path: '/volumes',
    type: 'volumev3'
  },

  getVolumeInfo: {
    path: '/volumes/${volume_id}',
    type: 'volumev3'
  },

  updateVolume: {
    path: '/volumes/${volume_id}',
    type: 'volumev3'
  },

  operateVolume: {
    path: '/volumes/${volume_id}/action',
    type: 'volumev3'
  },

  deleteVolume: {
    path: '/volumes/${volume_id}',
    type: 'volumev3'
  },

  // Network
  getNetworks: {
    path: '/v2.0/networks',
    type: 'network',
  },

  getSecurityGroups: {
    path: '/v2.0/security-groups?project_id=${project_id}',
    type: 'network'
  },

  // Monitor
  getMonVcpuCoreUsage: {
    path: '/query?q=',
    type: 'monitor'
  },

  getMonVcpuTotalUsage: {
    path: '/query?q=',
    type: 'monitor'
  },

  getMonVmemUsage: {
    path: '/query?q=',
    type: 'monitor'
  }
};


const proxyPrefix = {
  identity: '/os-identity',
  compute: '/os-compute',
  image: '/os-image',
  volumev3: '/os-volume',
  network: '/os-network',
  monitor: '/os-monitor',
};

export { apiPath, proxyPrefix }

