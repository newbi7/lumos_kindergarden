<template>
  <v-main>

    <v-row no-gutters>
      <v-col cols="8">
        <div>
          <home-contents-layout />
        </div>
      </v-col>
      <v-col cols="4">
        <home-side-layout />
      </v-col>
    </v-row>

  </v-main>
</template>

<script>
// import HomeCenterDataLayout from '@/components/layout/Home/HomeCenterDataLayout.vue';
import HomeContentsLayout from '@/components/layout/Home/HomeContentsLayout.vue';
import HomeSideLayout from '@/components/layout/Home/HomeSideLayout.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    HomeContentsLayout,
    HomeSideLayout,
    // HomeCenterDataLayout,
  },

  data () {
    return {

    }
  },
});
</script>
