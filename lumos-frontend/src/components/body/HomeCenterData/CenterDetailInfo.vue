<template>
  <div>
    <v-table v-if="state.testData" density="compact">
      <tbody>
        <tr>
          <th>센터번호</th>
          <td>{{ state.testData.center_num }}</td>
        </tr>
        <tr>
          <th>어린이집/유치원명</th>
          <td>{{ state.testData.center_detail_name }}</td>
        </tr>
        <tr>
          <th>시, 도</th>
          <td>{{ state.testData.center_detail_state }}</td>
        </tr>
        <tr>
          <th>시, 군, 구</th>
          <td>{{ state.testData.center_detail_city }}</td>
        </tr>
        <tr>
          <th>국공립, 민간, 직장</th>
          <td>{{ state.testData.center_detail_classification }}</td>
        </tr>
        <tr>
          <th>센터개소여부</th>
          <td>{{ state.testData.center_detail_centeropen }}</td>
        </tr>
        <tr>
          <th>교육청센터번호</th>
          <td>{{ state.testData.center_detail_officenumber }}</td>
        </tr>
        <tr>
          <th>주소</th>
          <td>{{ state.testData.center_detail_address }}</td>
        </tr>
        <tr>
          <th>전화번호</th>
          <td>{{ state.testData.center_detail_phone }}</td>
        </tr>
        <tr>
          <th>팩스번호</th>
          <td>{{ state.testData.center_detail_fax }}</td>
          <div class="text-center">
            <v-btn id="kakaoshare" class="kakao-share" @click="printShare"
              >화면인쇄 및 공유하기</v-btn
            >
          </div>
        </tr>
        <tr>
          <th>방수</th>
          <td>{{ state.testData.center_detail_roomcount }}</td>
          <div id="kakaoshare" class="text-center">
            <v-btn class="kakao-share" @click="kakaoShare"
              >카카오 공유하기</v-btn
            >
          </div>
        </tr>
        <tr>
          <th>방면적</th>
          <td>{{ state.testData.center_detail_roomsize }}</td>
        </tr>
        <tr>
          <th>놀이터수</th>
          <td>{{ state.testData.center_detail_playgroundcount }}</td>
        </tr>
        <tr>
          <th>교사수</th>
          <td>{{ state.testData.center_detail_teachercount }}</td>
        </tr>
        <tr>
          <th>정원</th>
          <td>{{ state.testData.center_detail_regularperson }}</td>
        </tr>
        <tr>
          <th>현원</th>
          <td>{{ state.testData.center_detail_currentperson }}</td>
        </tr>
        <tr>
          <th>위도</th>
          <td>{{ state.testData.center_detail_Latitude }}</td>
        </tr>
        <tr>
          <th>경도</th>
          <td>{{ state.testData.center_detail_longitude }}</td>
        </tr>
        <tr>
          <th>차량운영여부</th>
          <td>{{ state.testData.center_detail_vehicle }}</td>
        </tr>
        <tr>
          <th>홈페이지주소</th>
          <td>
            <a
              v-bind:href="state.testData.center_detail_hompage"
              target="_blank"
              >{{ state.testData.center_detail_hompage }}</a
            >
          </td>
        </tr>
        <tr>
          <th>설립일자</th>
          <td>{{ state.testData.center_detail_establish }}</td>
        </tr>
      </tbody>
    </v-table>

    <div v-else>데이터를 불러오는 중입니다...</div>

  </div>
</template>


<script>
import { reactive, onMounted } from "vue";
import axios from "axios";
import store from "@/store";

export default {
  name: "App",
  components: {},
  setup() {
    var serverUrl = process.env.VUE_APP_SERVER_URL;

    const state = reactive({
      center_num: null,
      testData: null,
      loading: true, // 로딩 상태를 추가합니다.
    });

    const getDetailData = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/kindergartendetail/${state.center_num}/detail`
        );
        state.testData = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        state.loading = false; // 데이터 로딩이 완료되면 로딩 상태를 false로 설정합니다.
      }
    };

    const kakaoShare = () => {
      window.Kakao.Share.sendCustom({
        templateId: 94641,
        installTalk: true,
      });
    };

    const printShare = () => {
      print();
    };

    onMounted(() => {
      state.center_num = store.getters.getClickedCenter.centerNum;
      getDetailData();
    });

    return {
      kakaoShare,
      printShare,
      state,
      getDetailData,
    };
  },
};
</script>

<style scored>
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