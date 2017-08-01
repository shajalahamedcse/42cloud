const addNetwork= (id) => ({
  type: 'ADD_NETWORK',
  id,
});

const removeNetwork = (id) => ({
  type: 'REMOVE_NETWORK',
  id,
});

export { addNetwork, removeNetwork };