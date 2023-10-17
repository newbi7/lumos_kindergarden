<template>
  <div style="width: 100%; height: 40px;">
    <v-row>
      <v-col cols="2" style="min-width: 150px;">
        <v-checkbox
          color="red"
          v-model="kidscare"
          :label="`어린이집`"
          style="margin-left: 10px;"
        ></v-checkbox>
      </v-col>
      <v-col cols="2" style="min-width: 150px;">
        <v-checkbox
          color="orange"
          v-model="kinder"
          :label="`유치원`"
        ></v-checkbox>
      </v-col>
      <v-col cols="2" style="min-width: 150px;">
        <v-checkbox
          color="yellow-darken-2"
          v-model="extendcare"
          :label="`연장교육`"
        ></v-checkbox>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  // computed: {
  //   recommendedCenters() {
  //     return this.$store.getters.getRecommendedCenters;
  //   },
  //   searchedCenters() {
  //     return this.$store.getters.getSearchedCenters;
  //   },
  //   clickPosition() {
  //     return this.$store.getters.getClickPosition;
  //   },
  // },
  computed: {
    kidscareOption() {
      return this.$store.getters.getKidscareOption;
    },
    kinderOption() {
      return this.$store.getters.getKinderOption;
    },
    extendcareOption() {
      return this.$store.getters.getExtendcareOption;
    },
  },
  data () {
    return {
      kidscare: false,
      kinder: true,
      extendcare: false,
    }
  },
  mounted() {
    this.kidscare = this.kidscareOption;
    this.kinder = this.kinderOption;
    this.extendcare = this.extendcareOption;
  },
  watch: {
    kidscare(newVal, oldVal) {
      console.log("@@@ watch-kidscare 실행\n", oldVal, newVal);
      this.$store.dispatch('setKidscareOption', newVal);

    },
    kinder(newVal, oldVal) {
      console.log("@@@ watch-kinder 실행\n", oldVal, newVal);
      this.$store.dispatch('setKinderOption', newVal);

    },
    extendcare(newVal, oldVal) {
      console.log("@@@ watch-extendcare 실행\n", oldVal, newVal);
      this.$store.dispatch('setExtendcareOption', newVal);

    },
  },
}
</script>
