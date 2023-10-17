<template>
  <div>
    <v-table v-if="state.testData">
      <thead>
        <tr>
          <th>센터번호</th>
          <th>어린이집/유치원명</th>
          <th>어린이집/유치원</th>
          <th>시, 도</th>
          <th>시, 군, 구</th>
          <th>설립유형</th>
          <th>연장보육여부</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ state.testData.center_num }}</td>
          <td>{{ state.testData.center_name }}</td>
          <td>{{ state.testData.center_category }}</td>
          <td>{{ state.testData.center_state }}</td>
          <td>{{ state.testData.center_city }}</td>
          <td>{{ state.testData.center_type }}</td>
          <td v-if="state.testData.center_extendcare === true">O</td>
          <td v-else>X</td>
        </tr>
      </tbody>
    </v-table>
  </div>

</template>

<script>
import { reactive, onMounted } from "vue";
import axios from "axios";
import store from "@/store";

export default {
  setup() {
    var serverUrl = process.env.VUE_APP_SERVER_URL;

    const state = reactive({
      center_num: null,
      testData: null,
    });

    async function getTestData () {
      axios
        .get(`${serverUrl}/kindergartendetail/${state.center_num}/information`)
        .then((response) => {
          state.testData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    onMounted(() => {
      state.center_num = store.getters.getClickedCenter.centerNum;
      console.log(store.getters.getClickedCenter.centerNum);
      getTestData();
    });

    return {
      state,
      getTestData,
    };
  },
};
</script>
