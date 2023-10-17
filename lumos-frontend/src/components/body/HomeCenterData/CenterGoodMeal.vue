<template>
  <div>
    <v-card class="mx-auto" color="grey-lighten-4" width="mx-auto">
      <v-card-text>
        <v-text-field
          v-model="data.exceptmeal"
          density="compact"
          variant="solo"
          label="제외할 식재료, 식단을 입력해주세요. 없다면 검색을 눌러주세요! ex) 해물, 닭고기, 시금치"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="showLoadingScreen"
          style="mx-auto"
        ></v-text-field>
      </v-card-text>
    </v-card>
    <v-textarea
      bg-color="grey-lighten-5"
      color="cyan"
      label="(GPT, Naver)GPT에게 식단을 추천받으세요!!"
      :readonly="true"
      v-model="data.naverkoreanText"
      rows="15"
    ></v-textarea>

    <br />
    <br />
    <v-dialog v-model="data.loading" persistent width="400" height="600">
      <v-card color="white" dark>
        <v-card-text class="text-center">
          <span class="text-body-2">AI 응답 대기중!!</span>
          <v-progress-circular
            indeterminate
            color="yellow"
          ></v-progress-circular>
        </v-card-text>
        <v-card-actions>
          <v-btn color="black" block @click="data.loading = false"
            >로딩창 끄기</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const data = reactive({
      response: "",
      mealresponse: "",
      koreanText: "",
      exceptmeal: "",
      dialog: false,
      loading: false, 
    });

    async function showLoadingScreen() {
      if (!data.exceptmeal || data.exceptmeal.trim().length === 0) {
        data.loading = true;
        try {
          const navermealresponse = await fetch(
            "http://localhost:5000/gptmeal2API",
            {
              method: "POST",
              body: JSON.stringify({ exceptmeal: " " }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const responseData = await navermealresponse.text();
          const decodedResponse = JSON.parse(responseData);
          const decodedText = decodedResponse.result.translatedText;
          data.navermealresponse = decodedText;
          if (typeof data.navermealresponse !== "undefined") {
            console.log(data.navermealresponse);
            console.log(typeof data.navermealresponse);
          } else {
            data.loading = false;
            console.log("data.navermealresponse is not defined.");
          }
          data.loading = false;
          data.naverkoreanText = data.navermealresponse
            .replace(/(^{|}$)/g, "")
            .replace(/"/, "")
            .replace(/\\n/g, "\n")
            .replace(/번역된 텍스트/, "")
            .replace(/[{}:]/g, "")
            .replace(/응답/, "답변");
        } catch (error) {
          data.loading = false;
          console.error(error);
        }
      } else {
        data.loading = true;
        try {
          const navermealresponse = await fetch(
            "http://localhost:5000/gptmeal2API",
            {
              method: "POST",
              body: JSON.stringify({
                exceptmeal: data.exceptmeal + " 를 제외하고 ",
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const responseData = await navermealresponse.text();
          data.loading = true;
          const decodedResponse = JSON.parse(responseData);
          const decodedText = decodedResponse.result.translatedText;
          data.navermealresponse = decodedText;
          if (typeof data.navermealresponse !== "undefined") {
            console.log(data.navermealresponse);
            console.log(typeof data.navermealresponse);
          } else {
            data.loading = false;
            console.log("data.navermealresponse is not defined.");
          }
          data.loading = false;
          data.naverkoreanText = data.navermealresponse
            .replace(/(^{|}$)/g, "")
            .replace(/"/, "")
            .replace(/\\n/g, "\n")
            .replace(/번역된 텍스트/, "")
            .replace(/[{}:]/g, "")
            .replace(/응답/, "답변");
        } catch (error) {
          data.loading = false;
          console.error(error);
        }
      }
    }

    return {
      data,
      showLoadingScreen,
    };
  },
};
</script>

<style scoped>
</style>
