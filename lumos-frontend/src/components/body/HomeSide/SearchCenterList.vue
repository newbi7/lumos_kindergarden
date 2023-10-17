<template>
  <div>
    <!-- <h1>상호명 검색</h1> -->

    <!-- <v-btn @click="apicalltest()">api테스트</v-btn> -->
    <v-row>
      <v-col cols="9">
        <v-text-field v-model="searchingKeyword"></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-btn @click="searchCenters()" icon="mdi-magnify"></v-btn>
      </v-col>
    </v-row>
    
    <v-divider></v-divider>
    <div v-for="scdCenter in searchedCenters"
      :key="scdCenter.centerNum"
      @click="displayClickedCenterDetail(scdCenter)">
      <h2>{{ scdCenter.centerName }}</h2>
    <p>
      공석:
      <span v-if="scdCenter.centerDetailRegularperson - scdCenter.centerDetailCurrentperson === 0">
        <v-icon class="mdi-no">mdi-account-multiple</v-icon>
      </span>
      <span v-else>
        <v-icon class="mdi-yes">mdi-account-multiple</v-icon>
      </span>
      | 차량:
      <span v-if="scdCenter.centerDetailVehicle === 'Y' || scdCenter.centerDetailVehicle === '운영'">
        <v-icon class="mdi-yes">mdi-car</v-icon>
      </span>
      <span v-else>
        <v-icon class="mdi-no">mdi-car-off</v-icon>
      </span>
      | 연장:
      <span v-if="scdCenter.centerExtendcare !== 0">
        <v-icon class="mdi-yes">mdi-clock-check</v-icon>
      </span>
      <span v-else>
        <v-icon class="mdi-no">mdi-clock-check</v-icon>
      </span>
    </p>

    <!-- <div v-for="scdCenter in searchedCenters"
      :key="scdCenter.centerNum"
      @click="displayClickedCenterDetail(scdCenter)">
      <h2>{{ scdCenter.centerName }}</h2>
      <p>
        번호:{{ scdCenter.centerNum }} | 
        공석:{{ scdCenter.centerDetailRegularperson - scdCenter.centerDetailCurrentperson }} | 
        차량:{{ scdCenter.centerDetailVehicle }} | 
        연장:
          <span v-if="scdCenter.centerExtendcare === 0">X</span>
          <span v-if="scdCenter.centerExtendcare === 1">O</span>
        
      </p> -->
      <v-divider />
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      searchingKeyword: "희망의",
    };
  },
  computed: {
    searchedCenters() {
      // console.log("@@@ Recomm-computed-searchedCenters 실행");
      return this.$store.getters.getSearchedCenters;
    },
  },
  methods: {
    // 상호명 검색
    searchCenters() {
      console.log("@@ searchCenters 실행");

      let serverUrl = process.env.VUE_APP_SERVER_URL;
      this.$axios
        .get(
          `${serverUrl}/searchMap/center/list/name/${this.searchingKeyword}`
        )
        .then((response) => {
          // console.log("@@@ axios 성공", response);
          this.$store.dispatch('setSearchedCenters', response.data);
        })
        .catch((error) => {
          console.log("@@@ axios 실패");
          console.log(error);
        });
    },
    // 리스트에서 보육시설 클릭 시 실행
    displayClickedCenterDetail(scdCenter) {
      // console.log("@@ displayClickedCenterDetail 실행");
      this.$store.dispatch('setClickedCenter', scdCenter);
    },
    // // 유치원 API 호출 테스트
    // apicalltest() {
    //   console.log("@@ apicalltest 실행");

    //   let serverUrl = process.env.VUE_APP_SERVER_URL;
    //   this.$axios
    //     .get(
    //       // `${serverUrl}/searchMap/apicalltest/kinder/1`
    //       `${serverUrl}/searchMap/apicalltest/kakao/1`
    //     )
    //     .then((response) => {
    //       console.log("@@@ axios 성공\n", response);
    //     })
    //     .catch((error) => {
    //       console.log("@@@ axios 실패");
    //       console.log(error);
    //     });
    // },
  }
}
</script>
