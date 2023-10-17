<template>
  <v-container class="loginPage-container" fill-height>
    <!-- <v-layout align-center row wrap> -->
      <v-card>
        <div class="pa-10">
          <h1 style="text-align: center" class="mb-10">Login</h1>
          <form>
            <v-text-field v-model="loginData.userId" label="ID" prepend-inner-icon="mdi-account"></v-text-field>
            <v-text-field v-model="loginData.userPw" prepend-inner-icon="mdi-lock" type="password" label="Password"></v-text-field>
            <v-btn @click="login" color="orange darken-2 text-capitalize" depressed large block dark class="mb-3">Login</v-btn>
            <v-btn @click="regist" color="orange darken-2 text-capitalize" depressed large block dark>Sign Up</v-btn>
            <br>
            <v-btn @click="kakaoLogin" color="yellow darken-2 text-capitalize" depressed large block dark>카카오로그인</v-btn>
          </form>
        </div>
      </v-card>
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
import { ref, reactive } from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router';
import store from '@/store';

export default {
  name: "loginPage",
  components: {},
  setup() {
    let kakao_account = ref(null);
    const router = useRouter()

    // 동의를 받음
    function kakaoLogin(){
       window.Kakao.Auth.login({
          scope:'account_email',
          success:getKakaoAcount
      });
    }
    function regist() {
        router.push('/signUp');
    }
    
    function getKakaoAcount(){
      console.log("test");
      window.Kakao.API.request({
      url:'/v2/user/me',
      
      success: res=>{
        // const kakao_account = res.kakao_account;
        const userId = res.kakao_account.email;
        console.log(res)
        store.dispatch("setAdminYn", userId) // -> store.commit("mutSetUSerId", userId)
        console.log('kakao_account', kakao_account);
        console.log("로그인성공");
        router.push('/signUp')
        //axios로 spring에 요청
        // 회원가입시킬지, 로그인시킬지 spirng 에서 db에 검사해서 확인한뒤
                  // 요청을 보낼 주소, 지금은 우리 스프링 주소로 보냄
        //   axios.get("http://localhost:8080"+`/springweb/user/kakaoLogin`, {
        //   params : {
        //     // key : value
        //     userId : userId
        //   },
        // }) // API 경로와 필요한 데이터를 전달 
        // .then(res => {
        //   console.log(res.data);
        //   if (res.data.userId == null) {
        //     console.log(store.getters.getUserId)
        //     router.push('/signUp');
        //     console.log("회원가입페이지로 보내기")
        //   } else {
        //     router.push('/');
        //     console.log('메인페이지로 보내기')
        //   }
        //   console.log(res.data.userId);
        //   console.log("카카오 로그인 API 호출 성공");
        // })
        // .catch(err => {
        //   console.log("카카오 로그인 API 호출 실패", err);
        //   router.push('/signUp');
        // });

      }

      })
    }

    const loginData = reactive({
      userId : '',
      userPw : ''
    })
      // const userId ='';
      // const userPw ='';

    function login(){
      var serverUrl = process.env.VUE_APP_SERVER_URL;
      console.log(loginData.userId)
      // localStorage.clear()
      axios.get(`${serverUrl}/user/login`,{
        params : {
          userId : loginData.userId,
          userPw : loginData.userPw
        },
      })
      .then((res)=>{
        if (res.data == "") {
          // console("유저없음")
          alert("존재하지 않는 회원입니다.");
        } else {
          store.getters.changeLoginUser;
          store.dispatch('setUserId', res.data.userId)
          store.dispatch('setAdminYn', res.data.adminYn)
          console.log(store.getters.getAdminYn);
          console.log("~~로그인 성공^ㅁ^~~");
          console.log(res);
          
          // 저장되어 있던 주소를 현재 위치로 설정하기
          let address = res.data.roadAddress;
          let addressParts = address.split(" ");
          let addressState = addressParts[0];
          let addressCity = addressParts[1];
          
          // City 데이터에서 공백 제거하기
          addressCity = addressCity.replace(/\s/g, "");

          if (addressState === "서울") {
            addressState = addressState + "특별시";
          } else if (addressState === "인천" || addressState === "대전" || addressState === "대구") {
            addressState = addressState + "광역시";
          } else if (addressState === "경기" || addressState === "강원") {
            addressState = addressState + "도";
          } else if (addressState === "충남") {
            addressState = "충청남도";
          } else if (addressState === "충북") {
            addressState = "충청북도";
          } else if (addressState === "경남") {
            addressState = "경상남도";
          } else if (addressState === "경북") {
            addressState = "경상북도";
          } else if (addressState === "세종특별자치시") {
            addressCity = "세종특별자치시";
          }
          store.dispatch("setClickAddress", address);
          store.dispatch("setClickAddressState", addressState);
          store.dispatch("setClickAddressCity", addressCity);

        }
        if (res.data.adminYn == "Y") { 
          router.push('/'); 
        } else { 
          router.push('/'); 
        }
         
      })
      .catch((err)=>{
        console.log("~~로그인 실패-ㅁ-~~");
        console.log(err);
      })
    }



    return {
      kakaoLogin,
      kakao_account,
      regist,
      login,
      loginData,
      
      
    };
  },
};
</script>

<style scoped>
.loginPage-container {
  width: 500px;
  margin-top:100px;
}
.kakaoLogin-button {
  width: 150px;
  height: 40px;
  line-height: 50px;
  color: black;
  text-align: center;
  background: #ffe812;
  font-size: 12px;
  cursor: pointer;
}

</style>

