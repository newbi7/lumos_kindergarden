<template>
  <div v-if="state">
    <v-table density="compact">
      <tbody>
        <tr>
          <th>센터번호</th>
          <td>{{ state.centerNum }}</td>
        </tr>
        <tr>
          <th>어린이집/유치원명</th>
          <td>{{ state.centerName }}</td>
        </tr>
        <tr>
          <th>시, 도</th>
          <td>{{ state.centerState }}</td>
        </tr>
        <tr>
          <th>시, 군, 구</th>
          <td>{{ state.centerCity }}</td>
        </tr>
        <tr>
          <th>국공립, 민간, 직장</th>
          <td>{{ state.centerType }}</td>
        </tr>
        <tr>
          <th>주소</th>
          <td>{{ state.centerDetailAddress }}</td>
        </tr>
        <tr>
          <th>전화번호</th>
          <td>{{ state.centerDetailPhone }}</td>
          <div class="text-center">
            <v-btn id="kakaoshare" class="kakao-share" @click="printShare"
              >화면인쇄 및 공유하기</v-btn
            >
          </div>
        </tr>
        <tr>
          <th>방수</th>
          <td>{{ state.centerDetailRoomcount }}</td>
          <div id="kakaoshare" class="text-center">
            <v-btn class="kakao-share" @click="kakaoShare"
              >카카오 공유하기</v-btn
            >
          </div>
        </tr>
        <tr>
          <th>방면적</th>
          <td>{{ state.centerDetailRoomsize }}</td>
        </tr>
        <tr>
          <th>교사수</th>
          <td>{{ state.centerDetailTeachercount }}</td>
        </tr>
        <tr>
          <th>정원</th>
          <td>{{ state.centerDetailRegularperson }}</td>
        </tr>
        <tr>
          <th>현원</th>
          <td>{{ state.centerDetailCurrentperson }}</td>
        </tr>
        <tr>
          <th>위도</th>
          <td>{{ state.centerDetailLatitude }}</td>
        </tr>
        <tr>
          <th>경도</th>
          <td>{{ state.centerDetailLongitude }}</td>
        </tr>
        <tr>
          <th>차량운영여부</th>
          <td>{{ state.centerDetailVehicle === "Y" ? "운영" : "미운영" }}</td>
        </tr>
        <tr>
          <th>홈페이지주소</th>
          <td>
            <a v-bind:href="state.centerDetailHompage" target="_blank">{{
              state.centerDetailHompage
            }}</a>
          </td>
        </tr>
        <tr>
          <th>설립일자</th>
          <td>{{ state.centerDetailEstablish }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <br />
  <br />
</template>



<script>
import { reactive, onMounted } from "vue";
import store from "@/store";

export default {
  name: "App",
  components: {},
  setup() {
    const kakaoShare = () => {
      window.Kakao.Share.sendCustom({
        templateId: 94641,
        // 카카오톡이 설치 되지 않았을때 마켓으로 이동
        installTalk: true,
      });
    };

    const data = reactive({
      kinderInfo: [],
      response: "",
    });

    const state = reactive({
      center_num: null,
      testData: null,
    });

    onMounted(() => {
      state.center_num = store.getters.getClickedCenter.centerNum;
      state.centerCategory = store.getters.getClickedCenter.centerCategory;
      state.centerCity = store.getters.getClickedCenter.centerCity;
      state.centerDetailAddress =
        store.getters.getClickedCenter.centerDetailAddress;
      state.centerDetailBame = store.getters.getClickedCenter.centerDetailBame;
      state.centerDetailClassification =
        store.getters.getClickedCenter.centerDetailClassification;
      state.centerDetailCurrentperson =
        store.getters.getClickedCenter.centerDetailCurrentperson;
      state.centerDetailEstablish =
        store.getters.getClickedCenter.centerDetailEstablish;
      state.centerDetailLatitude =
        store.getters.getClickedCenter.centerDetailLatitude;
      state.centerDetailLongitude =
        store.getters.getClickedCenter.centerDetailLongitude;
      state.centerDetailOfficenumber =
        store.getters.getClickedCenter.centerDetailOfficenumber;
      state.centerDetailPhone =
        store.getters.getClickedCenter.centerDetailPhone;
      state.centerDetailRegularperson =
        store.getters.getClickedCenter.centerDetailRegularperson;
      state.centerDetailRoomcount =
        store.getters.getClickedCenter.centerDetailRoomcount;
      state.centerDetailRoomsize =
        store.getters.getClickedCenter.centerDetailRoomsize;
      state.centerDetailTeachercount =
        store.getters.getClickedCenter.centerDetailTeachercount;
      state.centerDetailVehicle =
        store.getters.getClickedCenter.centerDetailVehicle;
      state.centerExtendcare = store.getters.getClickedCenter.centerExtendcare;
      state.centerDetailHompage =
        store.getters.getClickedCenter.centerDetailHompage;
      state.centerName = store.getters.getClickedCenter.centerName;
      state.centerNum = store.getters.getClickedCenter.centerNum;
      state.centerState = store.getters.getClickedCenter.centerState;
      state.centerType = store.getters.getClickedCenter.centerType;
    });

    const printShare = () => {
      print();
    };

    return {
      printShare,
      kakaoShare,
      state,
      testData: state.testData,
      data,
    };
  },
};
</script>

<style scored>
tbody th {
  width: 300px;
}

#kakaoshare {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-center {
  display: flex;
  justify-content: center;
}

.kakao-share {
  width: 150px;
  height: 100px;
  line-height: 20px;
  color: black;
  text-align: center;
  background: #ffe812;
  font-size: 13px;
  cursor: pointer;
}
</style>
