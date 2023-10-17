<template>
  <div>
    <h1 style="text-align: center; margin-top: 50px">
      <v-icon color="yellow">mdi-star</v-icon> 즐겨찾기
    </h1>

    <v-card
      style="background-color: #f5f5f5; max-width: 1330px; min-height: 300px"
    >
      <v-row>
        <v-col
          v-for="favorite in favoriteList"
          :key="favorite.center_num"
          cols="3"
        >
          <v-card class="mb-3">
            <v-card-title class="d-flex align-center justify-space-between">
              <span style="width: 50px; word-wrap: break-word">{{
                favorite.center_name
              }}</span>
              <v-btn icon flat>
                <v-icon text @click="deleteFavorite(favorite.center_num)"
                  >mdi-delete</v-icon
                >
              </v-btn>
            </v-card-title>
            <v-card-text>
              유형: {{ favorite.center_category }} <br />
              주소: {{ favorite.center_state }} {{ favorite.center_city }}
              <br />
              어린이집 유형: {{ favorite.center_type }} <br />
              연장보육 여부: {{ favorite.center_extendcare ? "O" : "X" }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
  <br />
  <div>
    <v-btn
      @click="kinderrecommendAPP"
      v-if="favoriteList"
      style="margin-left: 150px; background-color: orange"
    >
      어린이집 추천 App</v-btn
    >
    <br />
    <br />
    <v-textarea
      v-if="favoriteList"
      bg-color="grey-lighten-5"
      color="cyan"
      label
      :readonly="true"
      rows="15"
      v-model="data.koreanText"
      style="margin-left: 130px; margin-right: 130px; margin-bottom: 1000px"
    >
      <template #label>
        <span style="font-size: 20px"
          >(Gpt) Gpt에게 어린이집을 추천받으세요</span
        >
      </template>
    </v-textarea>
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
import { reactive } from "vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import store from "@/store";
export default {
  setup() {
    const favoriteList = ref([]);
    // const isFavoriteList = ref([]);

    var serverUrl = process.env.VUE_APP_SERVER_URL;

    onMounted(async () => {
      axios
        .get(`${serverUrl}/favorite`, {
          params: {
            userId: store.getters.getUserId,
          },
        })
        .then((res) => {
          console.log("favoriteList", res.data);
          favoriteList.value = res.data;
          // 로컬 스토리지에서 찜한 목록 업데이트
          // isFavoriteList.value =
          //   JSON.parse(localStorage.getItem("favorites")) || [];
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const state = reactive({
      center_num: null,
      testData: [],
    });

    const data = reactive({
      response: {},
      Naverresponse: {},
      mealresponse: "",
      description: {},
      koreanText: "",
      dialog: false,
      loading: false,
    });

    // 버튼
    async function kinderrecommendAPP() {
      data.loading = true;
      state.testData = []

      // 세부정보들 불러와서 저장
      await getAllData(); 

      // 문장 줄이기
      const favorgptlist = JSON.stringify(state.testData)
        .replace(/\s+/g, " ")
        .replace(/null/g, "")
        .replace(/childcare_eval_/g, "")
        .replace(/(^{|}$)/g, "")
        .replace(/"/g, "")
        .replace(/\\/g, "")
        .replace(/center_detail_/g, "");

      console.log(favorgptlist);

      // 파이썬으로 보내기
      try {
        const kinderrecommend = await fetch(
          "http://localhost:5000/kinderrecommendAPI",
          {
            method: "POST",
            body: JSON.stringify({ favorgptlist }), // state.testData를 문자열로 변환하여 요청의 본문에 포함시킵니다.
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await kinderrecommend.text();
        data.loading = false;

        // JSON 형태로 변형
        const decodedResponse = JSON.parse(responseData);

        // 유니코드 형태로 올시 한글로 변경
        const decodedText = decodedResponse.result.translatedText;
        data.kinderrecommend = decodedText;

        // 빈칸일때 오류잡기
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
        data.loading = false;
        console.error(error);
      }
    }

    // 센터넘버 추출
    const getAllData = async () => {
      console.log(Object.values(favoriteList.value));
      for (const favorite of Object.values(favoriteList.value)) {

        // 센터넘버들 로그로 출력
        console.log(favorite.center_num);
        const center_num = favorite.center_num;

        try {
          // 세부정보 저장하는거 불러오는곳
          await getDetailData(center_num);
        } catch (error) {
          console.log(error);
        }
      }
    };

    // 세부정보들 불러와서 저장
    const getDetailData = async (center_num) => {
      try {
        const response = await axios.get(
          `${serverUrl}/kindergartendetail/${center_num}/detail`
        );
        const responseDataString = JSON.stringify(response.data);

        // 세부정보들 저장하는곳
        state.testData.push(responseDataString);
      } catch (error) {
        console.log(error);
      }
    };

    async function deleteFavorite(centerNum) {
      const url = process.env.VUE_APP_SERVER_URL + "/searchMap/delete-favorite";
      const data = {
        centerNum: centerNum,
        userId: store.getters.getUserId,
      };
      axios
        .post(url, data)
        .then((response) => {
          console.log("fefwefwefw", response);
          // 찜하기 목록에서 삭제된 centerNum을 제거
          // 로컬 스토리지에서 찜한 목록 업데이트
          localStorage.setItem("favorites", JSON.stringify(this.isFavorite));
          window.location.reload();
        })
        .catch((error) => {
          console.log("~~ deleteFavoriteCenter 실패 ~~");
          console.log(error);
        });
    }

    //   async function addFavoriteCenter(centerNum) {
    //     const url = process.env.VUE_APP_SERVER_URL + '/searchMap/favorite';
    //     const data = {
    //       centerNum: centerNum,
    //       userId: store.getters.getUserId,
    // }

    //     // 이미 찜하기가 눌린 상태인지 확인
    //     const isFavorite = isFavoriteList.value.includes(centerNum);

    //     if (isFavorite) {
    //       // 이미 찜하기가 눌린 상태이므로 삭제 요청을 보냄
    //       axios.post(url, data)
    //       // this.$axios.post(url, { data: data })
    //         .then((response) => {
    //           console.log("~~ deleteFavoriteCenter 성공 ~~", response);
    //           // 찜하기 목록에서 삭제된 centerNum을 제거
    //           const index = this.isFavorite.indexOf(centerNum);
    //           if (index > -1) {
    //             this.isFavorite.splice(index, 1);
    //           }
    //           // 로컬 스토리지에서 찜한 목록 업데이트
    //           localStorage.setItem('favorites', JSON.stringify(this.isFavorite));

    //           window.location.reload()
    //         })
    //         .catch((error) => {
    //           console.log("~~ deleteFavoriteCenter 실패 ~~");
    //           console.log(error);
    //           window.location.reload()
    //         });

    //     }
    //   }

    return {
      favoriteList,
      getAllData,
      deleteFavorite,
      data,
      kinderrecommendAPP,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

.v-card {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.label-large {
  font-size: 100px; /* 원하는 글꼴 크기로 변경하세요 */
}
</style>
