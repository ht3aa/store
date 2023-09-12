<script setup>
import { onMounted, ref, watch } from 'vue'
import { categoryReq } from '@/config/axios'
import LazyCardImage from '@/components/LazyCardImage.vue'
import {
  arabicSortBy,
  handelError,
  reqIsSuccessful
} from '@/utils/helpers'

const categories = ref([])
const search = ref(null)
const loading = ref(true)
const filterdCategories = ref([])

onMounted(async () => {
  try {
    const { data } = await categoryReq.post('/find')
    if (reqIsSuccessful(data, false)) {
      loading.value = false
      categories.value = arabicSortBy(data.msg, 'name')
      filterdCategories.value = categories.value
    }
  } catch (error) {
    handelError(error)
  }
})

const filter = () => {
  if (!search.value) {
    filterdCategories.value = categories.value
  }
  filterdCategories.value = categories.value.filter((category) => {
    return category.name.toLowerCase().includes(search.value.trim().toLowerCase())
  })
}

watch(search, filter)
</script>

<template>
  <h1 class="text-center my-5">مرحبا في متجر فليحة</h1>
  <div v-if="loading" class="loaderContainer">
    <span class="loader"></span>
  </div>
  <v-card v-else class="mx-auto my-5" max-width="80%">
    <v-text-field v-model="search" label="بحث"></v-text-field>
    <h3 v-if="filterdCategories.length === 0" class="text-center my-5">لا توجد أقسام</h3>
    <v-container v-else fluid>
      <v-row class="direction">
        <v-col cols="12" md="4" v-for="category in filterdCategories" :key="category.id">
          <router-link
            class="decoration"
            :to="{ name: 'categoryDetails', params: { id: category.id } }"
          >
            <v-card>
              <LazyCardImage :ImgSrc="category.url">
                <v-card-title class="text-white text-right" v-text="category.name"></v-card-title>
              </LazyCardImage>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style scoped>
.loaderContainer {
  text-align: center;
  margin: 100px 0;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #999;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
