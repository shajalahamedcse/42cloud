const selectVolumes = (selectedVolumes) => {
  return {
    type: 'SELECT_VOLUMES',
    selectedVolumes
  }
};

export {
  selectVolumes,
};
