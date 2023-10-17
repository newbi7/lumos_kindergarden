<template>
  <div>
    <div class="row justify-content-center" style="margin-top: 50px; margin-left: 50px;">
      <div class="col-md-6 search-field">
        <v-text-field
          v-model="keyword"
          label="아이디를 검색하세요"
          prepend-icon="mdi-magnify"
          @keyup.enter="userSearch"
        ></v-text-field>
      </div>
    </div>
    <v-table
      class="userList"
      :items="state.userList"
      v-model:page="state.page"
      :items-per-page="state.itemsPerPage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 30],
        showFirstLastPage: true,
        itemsPerPageText: '10',
        itemsPerPageAllText: '모두',
        pageText: '{0}-{1} / {1}',
        noResultsText: '일치하는 항목이 없습니다.',
      }"
      :loading="state.loading"
      :search="state.search"
      :mobile-breakpoint="1"
      @update:page="updatePage"
    >
      <thead>
        <tr>
          <th>회원번호</th>
          <th>ID</th>
          <th>PW</th>
          <th>이름</th>
          <th>우편주소</th>
          <th>도로명</th>
          <th>상세주소</th>
          <th>닉네임</th>
          <th>전화번호</th>
          <th>Status</th>
          <th>Admin</th>
          <th>탈퇴</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="user in state.userList" :key="user.userNo">
          <td>{{ user.userNo }}</td>
          <td>{{ user.userId }}</td>
          <td>{{ user.userPw.slice(0, 2) + user.userPw.slice(2).replace(/./g, '*') }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ user.zonecode }}</td>
          <td>{{ user.roadAddress }}</td>
          <td>{{ user.detailAddress }}</td>
          <td>{{ user.nickname }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.status == "Y" ? "O" : "X" }}</td>
          <td>{{ user.adminYn == "Y" ? "O" : "X"  }}</td>
          <td>
            <v-btn
              v-if="user.status === 'Y'"
              @click="deleteUser(user.userId)"
              color="yellow lighten-4"
              small
              depressed
            >
              탈퇴
            </v-btn>
          </td>
        </tr>
      </tbody>

      <v-pagination
        v-model="state.page"
        :length="state.pageCount"
        rounded="circle"
        class="mt-2"
      ></v-pagination>
    </v-table>
  </div>
</template>
<script>
import { onMounted, ref, reactive } from "vue";
import axios from "axios";
// import vuetify from '@/plugins/vuetify';

export default {
  components: {},
  setup() {
    const userList = ref([]);
    const state = reactive({
      userList: null,
      page: 1,
      itemsPerPage: 10,
      pageCount: 0,
    });

    const updatePage = (value) => {
      state.page = value;
    };

    var serverUrl = process.env.VUE_APP_SERVER_URL;
    onMounted(async () => {
      try {
        const res = await axios.get(`${serverUrl}/user/all-user`);
        console.log("userList", res.data);
        state.userList = res.data;
        state.pageCount = Math.ceil(state.userList.length / state.itemsPerPage);
      } catch (error) {
        console.log("error", error);
      }
    });

    const deleteUser = async (userId) => {
      try {
        const response = await axios.put(
          `${serverUrl}/user/set-user/${userId}`,
          {
            status: "N",
          }
        );
        console.log("~~ 회원탈퇴 성공 ^ㅁ^ ~~", response.data);

        const res = await axios.get(`${serverUrl}/user/all-user`);
        console.log("userList", res.data);
        state.userList = res.data;

        // router.push('')
      } catch (err) {
        console.error(err);
        console.log("~~ 탈퇴 실패 ~ㅁ~ ~~", err);
      }
    };

    const keyword = ref(""); // 검색어 변수 선언

    function userSearch() {
      console.log("키워드 : ", keyword.value);
      axios
        .get(`${serverUrl}/user/user-search`, {
          params: {
            // key : value
            keyword: keyword.value,
          },
        })
        .then((res) => {
          console.log("RESULT", res.data);
          state.userList = res.data; //페이지 리로드
        })
        .catch((err) => {
          console.log("error", err);
        });
    }

    return {
      userList,
      state,
      deleteUser,
      updatePage,
      userSearch,
      keyword,
    };
  },
};
</script>
<style scoped>
.userList {
  margin: 10px;
}

.userList td {
  font-size: 14px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘친 텍스트 감추기 */
  text-overflow: ellipsis; /* 넘친 텍스트 생략 부호 (...) 표시 */
}
.search-field {
  max-width: 300px;
}
</style>