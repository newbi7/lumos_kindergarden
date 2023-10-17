<template>
  <v-container>
    <h1>Yunit 테스트 페이지</h1>
    <p>기능 구현 테스트용 페이지</p>
    
    <v-btn @click="axiosGetTest()">axiosGetTest</v-btn>
    <v-btn @click="axiosPutTest()">axiosPutTest</v-btn>
    <v-btn @click="axiosPostTest()">axiosPostTest</v-btn>
    <v-btn @click="axiosDeleteTest()">axiosDeleteTest</v-btn>
    
  </v-container>
</template>

<script>
export default {
  methods: {
    btnTest() {
      console.log("@@ btnTest 실행");
    },
    axiosGetTest() {
      console.log("@@ axiosGetTest 실행");
      console.log(this.$axios);
      
      var serverUrl = process.env.VUE_APP_SERVER_URL;
      this.$axios
        .get(
          `${serverUrl}/sample/list/asdf`
        )
        .then((response) => {
          console.log("@@ axios 성공");
          console.log(response);
        })
        .catch((error) => {
          console.log("@@ axios 실패");
          console.log(error);
        });
    },
    axiosPutTest() {
      console.log("@@ axiosPutTest 실행");
      console.log(this.$axios);
      
      var serverUrl = process.env.VUE_APP_SERVER_URL;
      this.$axios
        .put(
          `${serverUrl}/sample/newsample`
        )
        .then((response) => {
          console.log("@@ axios 성공");
          console.log(response);
        })
        .catch((error) => {
          console.log("@@ axios 실패");
          console.log(error);
        });
    },
    axiosPostTest() {
      console.log("@@ axiosPostTest 실행");
      console.log(this.$axios);
      
      var serverUrl = process.env.VUE_APP_SERVER_URL;
      this.$axios
        .post(
          `${serverUrl}/sample/postmethod1`
        )
        .then((response) => {
          console.log("@@ axios 성공");
          console.log(response);
        })
        .catch((error) => {
          console.log("@@ axios 실패");
          console.log(error);
        });
    },
    axiosDeleteTest() {
      console.log("@@ axiosDeleteTest 실행");
      console.log(this.$axios);
      
      var serverUrl = process.env.VUE_APP_SERVER_URL;
      this.$axios
        .delete(
          `${serverUrl}/sample/delmethod`
        )
        .then((response) => {
          console.log("@@ axios 성공");
          console.log(response);
        })
        .catch((error) => {
          console.log("@@ axios 실패");
          console.log(error);
        });
    },
  }
}
</script>