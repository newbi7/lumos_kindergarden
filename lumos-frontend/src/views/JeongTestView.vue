<template>
  <v-container>
    <h1>Jeong 테스트 페이지</h1>
        <v-btn @click="kinderrecommendAPP">
      (다른 페이지에 들어갈것)!! 구글 번역 어린이집 추천 App</v-btn
    >
    <p>여기에 기능 구현</p>
  </v-container>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const data = reactive({
      response: {},
      Naverresponse: {},
      mealresponse: "",
      description: {},
      koreanText: "",
      dialog: false,
    });

    async function kinderrecommendAPP() {
      try {
        const kinderrecommend = await fetch(
          "http://localhost:5000/kinderrecommendAPI",
          {
            method: "POST",
          }
        );
        const responseData = await kinderrecommend.text();
        data.dialog = true;
        const decodedResponse = JSON.parse(responseData);
        const decodedText = decodedResponse.result.translatedText;
        data.kinderrecommend = decodedText;
        if (typeof data.kinderrecommend !== "undefined") {
          console.log(data.kinderrecommend);
          console.log(typeof data.kinderrecommend);
        } else {
          console.log("data.kinderrecommend is not defined.");
        }
        data.koreanText = data.kinderrecommend
          .replace(/(^{|}$)/g, "")
          .replace(/"/, "")
          .replace(/\\ n/g, "\n");
      } catch (error) {
        console.error(error);
      }
    }

    return {
      kinderrecommendAPP
    };
  }
    
}
</script>