<template>
  <v-container class="signup-container" fluid>
      <v-card ref="form">
        <v-card-text class="custom-card-text">
          <h1 class="text-center">회원가입</h1><br>
           <v-row class="custom-row">
            <v-col cols="12" sm="6" class="input-col">
              <v-text-field variant="outlined"
                v-model="signUpData.userId"
                :rules="userIdRules"
                label="아이디"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn color="yellow lighten-4" @click="checkUserId"
                >중복확인</v-btn
              >
            </v-col>
          </v-row>
          <v-text-field variant="outlined"
            v-model="signUpData.userPw"
            type="password"
            label="비밀번호"
          ></v-text-field>
          <v-text-field variant="outlined"
            v-model="signUpData.userPwConfirm"
            type="password"
            :rules="userPwConfirmRules"
            label="비밀번호 확인"
          ></v-text-field>
          <v-text-field variant="outlined"
            v-model="signUpData.userName"
            label="이름"
          ></v-text-field>
          <v-text-field variant="outlined"
            v-model="signUpData.nickname"
            label="닉네임"
          ></v-text-field>
          <v-text-field variant="outlined"
            v-model="signUpData.phone"
            :rules="phoneRules"
            label="연락처"
          ></v-text-field>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field variant="outlined"
                label="우편번호"
                v-model="signUpData.zonecode"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn color="yellow lighten-4" @click="openPostcode"
                >우편번호 검색</v-btn
              >
            </v-col>
          </v-row>
          <v-row class="custom-row">
            <v-col cols="12" sm="6">
              <v-text-field variant="outlined"
                label="주소"
                v-model="signUpData.roadAddress"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field variant="outlined"
                label="상세주소"
                v-model="signUpData.detailAddress"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn flat @click="goback">Cancel</v-btn>
            <v-spacer></v-spacer>
              <v-tooltip left>
                <template v-slot:activator="{ }">
                  <v-btn icon class="my-0" >
                    <v-icon>refresh</v-icon>
                  </v-btn>
                </template>
                <span>Refresh form</span>
              </v-tooltip>
            <v-btn class="bold" color="#ff7f00" flat @click="submit">
              <strong>회원가입</strong>
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
  </v-container>
</template>


<script>
import { reactive, ref } from "vue";
import {} from "vue";
import store from "@/store";
import axios from "axios";
import { useRouter } from "vue-router";
import { isEmail } from "validator";

export default {
  name: "signUpView",
  setup() {
    const router = useRouter();

    const kakao_account = ref(null);
    const output = store.getters.getAdminYn;
    const signUpData = reactive({
      // userId: '',
      output: store.getters.getAdminYn,
      userId: output === 'Y' || output === 'N' ? '' : output,
      userPw: "",
      userName: "",
      nickname: "",
      phone: "",
      zonecode: "",
      roadAddress: "",
      detailAddress: "",
    });

    const userIdRules = [
      (v) => !!v || "아이디를 입력해주세요.",
      (v) => isEmail(v) || "아이디는 이메일 형식으로 입력해주세요.",
      (v) =>
        (v && v.length >= 5 && v.length <= 20) ||
        "아이디는 5글자 이상 20글자 이하로 입력해주세요.",
    ];

    const userPwConfirmRules = [
      (v) => !!v || "비밀번호 확인을 입력해주세요.",
      (v) => v === signUpData.userPw || "비밀번호가 일치하지 않습니다.",
    ];

    const phoneRules = [
      (v) => !!v || "연락처를 입력해주세요.",
      (v) => /^[0-9]+$/.test(v) || "숫자만 입력해주세요.",
    ];

    var serverUrl = process.env.VUE_APP_SERVER_URL;
    function submit() {
      if (!userIdRules.every((rule) => rule(signUpData.userId, null))) {
        console.log(signUpData.userId);
        alert("아이디를 입력해주세요.");
        return;
      }
      if (signUpData.userPw !== signUpData.userPwConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      if (!signUpData.userName) {
        alert("이름을 입력해주세요.");
        return;
      }
      if (!signUpData.nickname) {
        alert("닉네임을 입력해주세요.");
        return;
      }
      if (!signUpData.phone) {
        alert("연락처를 입력해주세요.");
        return;
      }
      if (!isNumeric(signUpData.phone)) {
        alert("연락처는 숫자만 입력 가능합니다.");
        return;
      }
      if (!signUpData.zonecode) {
        alert("우편번호를 입력해주세요.");
        return;
      }
      axios
        .post(
          // "http://localhost:8080/springweb/user/signup",
          `${serverUrl}/user/signup`,
          {
            userId: signUpData.userId,
            userPw: signUpData.userPw,
            userName: signUpData.userName,
            nickname: signUpData.nickname,
            phone: signUpData.phone,
            zonecode: signUpData.zonecode,
            roadAddress: signUpData.roadAddress,
            detailAddress: signUpData.detailAddress,
          }
        )
        .then((res) => {
          console.log("회원가입하기 성공");
          console.log(res);
          router.push("/");
        })
        .catch((err) => {
          console.log("회원가입하기 실패");
          console.log(err);
        });
    }

    function goback() {
      router.go(-1);
    }

    // 연락처가 숫자인지 확인
    function isNumeric(value) {
      return /^\d+$/.test(value);
    }

    const openPostcode = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          console.log(data.zonecode);
          console.log(data);
          signUpData.zonecode = data.zonecode;
          signUpData.roadAddress = data.roadAddress;
        },
      }).open();
    };

    const checkUserId = () => {
      axios
        .get(`${serverUrl}/user/check-userid?userId=${signUpData.userId}`)
        .then((res) => {
          if (res.data.isExist === true) {
            alert("사용 불가능한 아이디입니다.");
            signUpData.userId = "";
            console.log("사용 불가 작동");
          } else {
            alert("사용 가능한 아이디 입니다.");
            console.log("사용 가능 작동");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      kakao_account,
      submit,
      signUpData,
      openPostcode,
      userIdRules,
      userPwConfirmRules,
      phoneRules,
      isNumeric,
      checkUserId,
      goback,
    };
  },
};
</script>


<style scoped>
.v-text-card {
  width: 800px;
  height: 1400px;
}

.signup-container {
  width: 600px;
  /* height: 1000px; */
  /* margin-top: 10px; */
}

.custom-card-text {
  padding: 20px;
}

.input-col {
  margin-bottom: 0;
}

</style>

