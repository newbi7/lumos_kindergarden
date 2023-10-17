<template>
  <v-footer class="bg-blue-grey-darken-3">

    <v-row>

      <v-col class="text-center" cols="12">
        <v-btn color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/')"><v-icon left>mdi-home</v-icon></v-btn>
        <v-btn v-if="this.$store.getters.loginUser" color="white" variant="text" class="mx-2" rounded="xl" @click="logout"><v-icon>mdi-login</v-icon></v-btn>
        <v-btn v-if="!this.$store.getters.loginUser" color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/login')"><v-icon left>mdi-account</v-icon></v-btn>
        <!-- <v-icon @click="moveTo('/login')" >mdi-account</v-icon> -->

        <!-- <v-btn color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/yunittest')">YunitTest</v-btn>
        <v-btn color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/jeongtest')">JeongTest</v-btn> -->
        <v-btn v-if="this.$store.getters.loginUser" color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/hongtest')"> <v-icon left>mdi-star</v-icon> </v-btn>

        <v-btn v-if="this.$store.getters.getAdminYn === 'Y'" color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/admin')">admin</v-btn>
         <!-- <v-btn v-else-if="loginUser && loginUser.admin_YN === 'Y'" color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/admin')">admin</v-btn> -->
         <!-- <v-btn v-else-if="loginUser === 'admin'" color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/admin')">admin</v-btn> -->
            <!-- ShareThis BEGIN -->
  <!-- <div class="sharethis-inline-share-buttons"></div> -->
  <!-- ShareThis END -->
        <!-- <v-button @click="check123" >sdfsdf </v-button> -->
      </v-col>

    </v-row>

  </v-footer>
</template>

<script>

export default {
  data() {
    return {
      adminYn: ''
    };
  },
  computed: {
    loginUser() {
      console.log("~~로그인 유무 확인~~");
      console.log(this.$store.getters.loginUser);
      console.log(this.$store.getters.getAdminYn);

      return {
        loginUser: this.$store.getters.loginUser,
        adminYn: this.$store.getters.getAdminYn,
      };
    },

  },
  methods: {
    moveTo(url) {
      console.log('@@ moveTo(' + url + ')');
      this.$router.push(url);
    },
    logout() {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    // check123() {
    //   console.log("어드민 체크");
    //   console.log(this.adminYn);
    //   console.log(this.$store.getters.getAdminYn);
    //   console.log(this.$store.getters.loginUser);
    // }
  }
};

</script>

<style scoped>

</style>