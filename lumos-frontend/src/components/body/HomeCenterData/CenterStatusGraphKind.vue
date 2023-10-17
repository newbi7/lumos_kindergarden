<template>
  <div>
    <canvas ref="myChart" style="height: 500px;"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import Chart from 'chart.js/auto';
import axios from "axios";
import store from "@/store";

export default {
  name: 'DataGraph',
  setup() {
    var serverUrl = process.env.VUE_APP_SERVER_URL;

    const myChart = ref(null);
    let chartInstance = null; 

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
      state.centerDetailPlaygroundcount =
        store.getters.getClickedCenter.centerDetailPlaygroundcount;
      state.centerDetailRoomcount =
        store.getters.getClickedCenter.centerDetailRoomcount;
      state.centerDetailRoomsize =
        store.getters.getClickedCenter.centerDetailRoomsize;
      state.centerDetailTeachercount =
        store.getters.getClickedCenter.centerDetailTeachercount;
      state.centerDetailVehicle =
        store.getters.getClickedCenter.centerDetailVehicle;
      state.centerExtendcare = store.getters.getClickedCenter.centerExtendcare;
      state.centerName = store.getters.getClickedCenter.centerName;
      state.centerNum = store.getters.getClickedCenter.centerNum;
      state.centerState = store.getters.getClickedCenter.centerState;
      state.centerType = store.getters.getClickedCenter.centerType;
      getDetailData();
    });

    const getDetailData = () => {
      axios
        .get(`${serverUrl}/kindergartendetail/${state.center_num}/detail`)
        .then((response) => {
          state.testData = response.data;
          const ctx = myChart.value.getContext('2d');

          if (chartInstance) {
            chartInstance.destroy();
          }

          chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['방 개수', '선생님 수', '정원', '현원'],
              datasets: [
                {
                  label: '전체 평균',
                  data: [4.8, 9.7, 48.8, 32],
                  borderWidth: 1
                },
                {
                  label: state.centerName,
                  data: [
                    state.centerDetailRoomcount,
                    state.centerDetailTeachercount,
                    state.centerDetailRegularperson,
                    state.centerDetailCurrentperson,
                  ],
                  borderWidth: 1
                }
              ]
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };



    return { myChart };
  }
}
</script>
