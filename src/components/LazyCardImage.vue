<script setup>
import { ref } from 'vue'
const lazyImg = '/keyboards2.jpeg'
const loading = ref(true)

defineProps({
  ImgSrc: String
})
</script>

<template>
  <v-progress-linear :active="loading" indeterminate color="gray"></v-progress-linear>
  <v-hover v-slot="{ isHovering, props }">
    <v-img
      v-bind="props"
      class="align-end"
      @load="loading = false"
      :class="`${isHovering ? 'scale' : ''}`"
      :lazy-src="lazyImg"
      :src="ImgSrc"
      gradient="to bottom, rgba(0,0,0,.1),
                  rgba(0,0,0,.5)"
      height="200px"
      cover
    >
      <slot />
    </v-img>
  </v-hover>
</template>

<style scoped></style>
