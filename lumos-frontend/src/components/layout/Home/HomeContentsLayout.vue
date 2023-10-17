<template>
  <v-container>
    
    <v-row style="height: 40px;">
      <spec-select-box />
    </v-row>

    <v-row style="height: calc(100vh - 102px);">
      <map-box />
    </v-row>

  </v-container>
</template>

<script>
import MapBox from '@/components/body/HomeContents/MapBox.vue'
import SpecSelectBox from '@/components/body/HomeContents/SpecSelectBox.vue'

export default {
  components: { SpecSelectBox, MapBox },

}
</script>
