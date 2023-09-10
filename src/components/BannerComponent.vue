<script setup>
defineProps({
  bannerText: String,
  bannerIcon: String,
  bannerColor: String,
  bannerTo: Object,
  bannerBtnText: String
})
</script>

<template>
  <v-banner lines="one" :icon="bannerIcon" :color="bannerColor" class="my-4 bannerWidth mx-auto">
    <v-banner-text> {{ bannerText }} </v-banner-text>

    <template v-slot:actions>
      <v-btn v-if="bannerTo" variant="outlined" :color="bannerColor" :to="bannerTo">
        {{ bannerBtnText }}
      </v-btn>
    </template>
  </v-banner>
</template>

<style scoped>
.bannerWidth {
  width: 50%;
}

@media only screen and (max-width: 768px) {
  .bannerWidth {
    width: 100%;
  }
}
</style>
