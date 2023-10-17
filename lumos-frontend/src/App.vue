<template>
  <v-app>

    <div style="height: calc(100vh - 54px);">
      <router-view />
    </div>
    <div class="footer">
      <footer-main />
    </div>

  </v-app>
</template>

<script>
import FooterMain from './components/footer/FooterMain.vue';

export default {
  name: 'app',
  components: {
    FooterMain,
  },
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 54px;
}
</style>