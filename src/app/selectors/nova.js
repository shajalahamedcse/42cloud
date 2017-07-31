export const selectServers = (state) => state.orm.nova.servers;

export const selectFlavors = (state) => state.orm.nova.flavors.data;
export const selectFlavorsLoading = (state) => state.orm.nova.flavors.loading;


