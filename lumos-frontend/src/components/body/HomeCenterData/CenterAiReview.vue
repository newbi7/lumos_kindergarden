<template>
  <div>
    <!-- <v-btn @click="googletransrateApp">(삭제할버튼) 구글번역테스트하기</v-btn>
    <br />
    <br /> -->
    <div><v-btn @click="callEmotionApp">어린이집 후기 분석</v-btn></div>
    <br />
    <v-textarea
      bg-color="grey-lighten-5"
      color="cyan"
      label="(Amazone, Naver)후기가 긍정적/부정적인지 분석"
      :readonly="true"
      rows="15"
      v-model="data.emotion"
    ></v-textarea>
    <br />
    <div>
      <v-btn @click="kinderresourceAPP">어린이집 선택시 고려할 목록</v-btn>
    </div>
    <br />
    <v-textarea
      bg-color="grey-lighten-5"
      color="cyan"
      label="(GPT, Naver) 어린이집 선택시 고려할 목록"
      :readonly="true"
      rows="15"
      v-model="data.koreanText"
    ></v-textarea>
  </div>

  <div>
    <!-- <v-btn @click="callNaverApp"
        >(시연용) Naver 카페검색하기 App v-card로 배치가능</v-btn
      > -->
  </div>
  <br />
  <div id="app">
    <v-container>
      <v-card
        v-for="item in data.Naverresponse.items"
        :key="item.cafeurl"
        class="mb-3"
      >
        <v-card-text>
          {{ item.description }}
        </v-card-text>
      </v-card>
    </v-container>
  </div>

  <v-dialog v-model="data.loading" persistent width="400" height="600">
    <v-card color="white" dark>
      <v-card-text class="text-center">
        <span class="text-body-2">AI 응답 대기중!!</span>
        <v-progress-circular indeterminate color="yellow"></v-progress-circular>
      </v-card-text>
      <v-card-actions>
        <v-btn color="black" block @click="data.loading = false"
          >로딩창 끄기</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { onMounted, reactive } from "vue";
import store from "@/store";

export default {
  setup() {
    const data = reactive({
      response: {},
      Naverresponse: {},
      mealresponse: "",
      description: {},
      koreanText: "",
      centerName: "",
      loading: false,
      dialog: false,
    });

    async function callEmotionApp() {
      data.loading = true;
      try {
        const response = await fetch("http://localhost:5000/naverApi", {
          method: "POST",
          body: JSON.stringify({ centerName: data.centerName }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const emotionparse = await response.json();
        data.emotional = JSON.stringify(emotionparse);
        console.log(data.emotional);
        const emotionPart = data.emotional.split('Mixed')[0];
        // const emotionData = emotionPart['결과'];
        data.emotion = JSON.stringify(emotionPart)
          .replace(/\\/g, "")
          .replace(/"/g, "")
          .replace(/,/g, "\n")
          .replace(/result/g, "분석결과")
          .replace(/Sentiment/g, "감정")
          .replace(/Score/g, "점수")
          .replace(/Positive/g, "     긍정적")
          .replace(/Negative/g, "    부정적")
          .replace(/Neutral/g, "    중랍")
          .replace(/{/g, "\n")
          .replace(/}/g, "\n")
          .replace(/:\s*(\d+\.\d{0,4})/g, ": $1");
        data.loading = false;
        console.log(emotionPart);
      } catch (error) {
        data.loading = false;
        console.error(error);
      }
    }

    async function callGptApp() {
      data.loading = true;
      try {
        const response = await fetch("http://localhost:5000/gptApi", {
          method: "POST",
        });
        const responseData = await response.json();

        data.response = responseData;
        data.loading = false;
        console.log(responseData);
      } catch (error) {
        data.loading = false;
        console.error(error);
      }
    }

    async function callNaverApp() {
      data.loading = true;
      try {
        const response = await fetch("http://localhost:5000/naverApi", {
          method: "POST",
        });
        const responseData = await response.json();

        data.Naverresponse = responseData;
        data.loading = false;
        console.log(responseData);
        console.log(data.Naverresponse);
      } catch (error) {
        data.loading = false;
        console.error(error);
      }
    }

    async function callgptmealApp() {
      data.loading = true;
      try {
        const mealresponse = await fetch("http://localhost:5000/gptmeal2API", {
          method: "POST",
        });
        const responseData = await mealresponse.text(); // Response를 text로 변환

        data.mealresponse = responseData;
        data.mealreplace = data.mealresponse;
        data.loading = false;
        // console.log(data.mealreplace);
      } catch (error) {
        data.loading = false;
        console.error(error);
      }
    }

    async function googlemealApp() {
      data.loading = true;
      try {
        const googlemealresponse = await fetch(
          "http://localhost:5000/googlemealAPI",
          {
            method: "POST",
          }
        );
        const responseData = await googlemealresponse.text();

        const decodedResponse = JSON.parse(responseData);
        const decodedText = decodedResponse.result.translatedText;
        data.googlemealresponse = decodedText;
        if (typeof data.googlemealresponse !== "undefined") {
          console.log(data.googlemealresponse);
          console.log(typeof data.googlemealresponse);
        } else {
          console.log("data.googlemealresponse is not defined.");
        }
        data.loading = false;
        data.koreanText = data.googlemealresponse
          .replace(/(^{|}$)/g, "")
          .replace(/"/, "")
          .replace(/\\ n/g, "\n");
      } catch (error) {
        data.loading = false;
        console.error(error);
      }
    }

    async function googletransrateApp() {
      data.loading = true;
      try {
        const googletransrate = await fetch(
          "http://localhost:5000/googletransrateAPI",
          {
            method: "POST",
          }
        );
        const responseData = await googletransrate.text();

        const decodedResponse = JSON.parse(responseData);
        const decodedText = decodedResponse.result.translatedText;
        data.googletransrate = decodedText;
        if (typeof data.googletransrate !== "undefined") {
          console.log(data.googletransrate + "+ 번역");
          console.log(typeof data.googletransrate);
        } else {
          console.log("data.googletransrate is not defined.");
        }
        data.loading = false;
        data.koreanText = data.googletransrate
          .replace(/(^{|}$)/g, "")
          .replace(/"/, "")
          .replace(/\\ n/g, "\n");
      } catch (error) {
        data.loading = false;
        console.error(error);
      }
    }

    async function kinderresourceAPP() {
      data.loading = true;
      try {
        const kinderresource = await fetch(
          "http://localhost:5000/kinderresourceAPI",
          {
            method: "POST",
          }
        );
        const responseData = await kinderresource.text();

        const decodedResponse = JSON.parse(responseData);
        const decodedText = decodedResponse.result.translatedText;
        data.kinderresource = decodedText;
        if (typeof data.kinderresource !== "undefined") {
          console.log(data.kinderresource);
          console.log(typeof data.kinderresource);
        } else {
          console.log("data.kinderresource is not defined.");
        }
        data.loading = false;
        data.koreanText = data.kinderresource
          .replace(/(^{|}$)/g, "")
          .replace(/"/, "")
          .replace(/\\ n/g, "\n");
      } catch (error) {
        data.loading = false;
        console.error(error);
      }
    }

    onMounted(() => {
      data.centerName = store.getters.getClickedCenter.centerName;
    });

    return {
      data,
      callEmotionApp,
      callGptApp,
      callNaverApp,
      callgptmealApp,
      googlemealApp,
      googletransrateApp,
      kinderresourceAPP,
    };
  },
};
</script>

<style scoped>
</style>