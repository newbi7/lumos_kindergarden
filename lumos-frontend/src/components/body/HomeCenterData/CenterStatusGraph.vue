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
              labels: ['방 개수', '선생님 수', '놀이터 개수(1/10)', '정원', '현원'],
              datasets: [
                {
                  label: '전체 평균',
                  data: [4.8, 9.7, 6.5, 48.8, 32],
                  borderWidth: 1
                },
                {
                  label: state.testData.center_detail_name,
                  data: [
                    state.testData.center_detail_roomcount,
                    state.testData.center_detail_teachercount,
                    state.testData.center_detail_playgroundcount * 10,
                    state.testData.center_detail_regularperson,
                    state.testData.center_detail_currentperson,
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
