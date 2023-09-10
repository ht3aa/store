<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { cartReq, productReq } from '@/config/axios'
import { useAlertStore } from '@/stores/alert'
import { reqIsSuccessful, handelError } from '@/utils/helpers'
import { lazyImg } from '@/utils/global'

const route = useRoute()
const router = useRouter()
const show = ref(false)
const store = useAlertStore()
const { toggleAlert } = store
const name = ref(null)
const description = ref(null)
const price = ref(null)
const quantity = ref(null)
const photos = ref(null)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const { data } = await productReq.get(`/${route.params.id}`)
    if (reqIsSuccessful(data, false)) {
      name.value = data.msg.name
      description.value = data.msg.description
      photos.value = data.msg.photos.url
      price.value = data.msg.price
      quantity.value = data.msg.quantity

      loading.value = false
    }
  } catch (error) {
    handelError(error)
  }
})

const addToCart = async () => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    router.push({ name: 'login' })
  }

  try {
    const { data } = await cartReq.post(
      `/${route.params.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    reqIsSuccessful(data)
  } catch (error) {
    handelError(error)
  }
}
</script>

<template>
  <div v-if="loading" class="loaderContainer">
    <span class="loader"></span>
  </div>
  <v-container class="my-5 direction">
    <v-row>
      <v-col cols="12" md="5">
        <v-carousel v-if="photos" cycle>
          <v-carousel-item :lazy-src="lazyImg" :src="photos[0]" containe></v-carousel-item>
          <v-carousel-item
            :lazy-src="lazyImg"
            v-for="(photo, i) in photos.slice(1)"
            :src="photo"
            :key="i"
            cover
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" md="4">
        <h2>{{ name }}</h2>
        <h3 class="my-5">
          <span class="text-red">{{ price }}</span> دينار عراقي
        </h3>
        <p>{{ description }}</p>
        <div class="my-5">
          <v-btn @click="addToCart" color="pink" variant="outlined"> أضف الى السلة </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
