import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import Centerinfo from '@/store/modules/Centerinfo.js';

export default createStore({
  state: {

    // User
    userId : '',
    loginUser : false,
    adminYn: '',

    // Search Option
    kidscareOption: true,
    kinderOption: true,
    extendcareOption: false,
    
    // Center(보육시설)
    recommendedCenters: [],
    searchedCenters: [],
    clickedCenter: {},

    // Map
    clickPosition: [],
    clickAddress: "",
    clickAddressState: "",
    clickAddressCity: "",

  },
  getters: {

    // User
    getUserId: function(state) {
      return state.userId;
    },
    getAdminYn: function(state) {
      return state.adminYn;
    },
    loginUser: function(state){
      return state.loginUser;
    },
    changeLoginUser: function(state) {
      if (state.loginUser == false) {
        console.log("바꾸기성공 false->true");
        state.loginUser = true;
      } else {
        console.log("바꾸기성공 true -> false");
        state.loginUser = false;
      }
    },

    // Search Option
    getKidscareOption(state) {
      return state.kidscareOption;
    },
    getKinderOption(state) {
      return state.kinderOption;
    },
    getExtendcareOption(state) {
      return state.extendcareOption;
    },

    // Center(보육시설)
    getRecommendedCenters(state) {
      return state.recommendedCenters;
    },
    getSearchedCenters(state) {
      return state.searchedCenters;
    },
    getClickedCenter(state) {
      return state.clickedCenter;
    },

    // Map
    getClickPosition(state) {
      return state.clickPosition;
    },
    getClickAddress(state) {
      return state.clickAddress;
    },
    getClickAddressState(state) {
      return state.clickAddressState;
    },
    getClickAddressCity(state) {
      return state.clickAddressCity;
    },

  },
  mutations: {

    // User
    mutSetUserId: (state, userId) => {
      state.userId = userId;
      state.loginUser = true;
    },
    mutSetadminYn(state, adminYn) {
      state.adminYn = adminYn;
    },
    logout(state){
      state.userId='';
      state.loginUser = false;
      state.adminYn = 'N';
    },
    setloginUser(state, value){
      state.loginUser = value;
    },

    // Search Option
    mutSetKidscareOption(state, newKidscareOption) {
      state.kidscareOption = newKidscareOption;
    },
    mutSetKinderOption(state, newKinderOption) {
      state.kinderOption = newKinderOption;
    },
    mutSetExtendcareOption(state, newExtendcareOption) {
      state.extendcareOption = newExtendcareOption;
    },

    // Center(보육시설)
    mutSetRecommendedCenters(state, newRecommendedCenters) {
      state.recommendedCenters = newRecommendedCenters;
    },
    mutSetSearchedCenters(state, newSearchedCenters) {
      state.searchedCenters = newSearchedCenters;
    },
    mutSetClickedCenter(state, newClickedCenter) {
      console.log("@@@@ mutSetClickedCenter 실행\n", newClickedCenter);
      state.clickedCenter = newClickedCenter;
    },

    // Map
    mutSetClickPosition(state, newClickPosition) {
      console.log("@@@@ mutSetClickPosition 실행\n", newClickPosition);
      state.clickPosition = newClickPosition;
    },
    mutSetClickAddress(state, newClickAddress) {
      state.clickAddress = newClickAddress;
    },
    mutSetClickAddressState(state, newClickAddressState) {
      state.clickAddressState = newClickAddressState;
    },
    mutSetClickAddressCity(state, newClickAddressCity) {
      state.clickAddressCity = newClickAddressCity;
    },

  },
  actions: {

    // User
    setUserId: (context, userId) => {
      context.commit("mutSetUserId", userId);
    },
    setAdminYn(context, adminYn) {
      context.commit('mutSetadminYn', adminYn);
    },

    // Search Option
    setKidscareOption({ commit }, newKidscareOption) {
      commit("mutSetKidscareOption", newKidscareOption);
    },
    setKinderOption({ commit }, newKinderOption) {
      commit("mutSetKinderOption", newKinderOption);
    },
    setExtendcareOption({ commit }, newExtendcareOption) {
      commit("mutSetExtendcareOption", newExtendcareOption);
    },

    // Center(보육시설)
    setRecommendedCenters({ commit }, newRecommendedCenters) {
      commit("mutSetRecommendedCenters", newRecommendedCenters);
    },
    setSearchedCenters({ commit }, newSearchedCenters) {
      commit("mutSetSearchedCenters", newSearchedCenters);
    },
    setClickedCenter({ commit }, newClickedCenter) {
      commit("mutSetClickedCenter", newClickedCenter);
    },

    // Map
    setClickPosition({ commit }, newClickPosition) {
      commit("mutSetClickPosition", newClickPosition);
    },
    setClickAddress({ commit }, newClickAddress) {
      commit("mutSetClickAddress", newClickAddress);
    },
    setClickAddressState({ commit }, newClickAddressState) {
      commit("mutSetClickAddressState", newClickAddressState);
    },
    setClickAddressCity({ commit }, newClickAddressCity) {
      commit("mutSetClickAddressCity", newClickAddressCity);
    },

  },
  
  modules: {
    Centerinfo,
  },
  plugins: [ 
    createPersistedState({
    }),
  ],
  
})
