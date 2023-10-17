const Centerinfo = {
  namespaced: true,
  state: {
    testData: null,
  },
  getters: {
  },
  mutations: {
    setNormalInfo(state, data) {
      state.testData = data;
    },
  }
};

export default Centerinfo;
