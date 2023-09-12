<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { categoryReq, cartReq } from '@/config/axios'
import { useAlertStore } from '@/stores/alert'
import { reqIsSuccessful, handelError } from '@/utils/helpers'
import LazyCardImage from '@/components/LazyCardImage.vue'

const route = useRoute()
const router = useRouter()
const store = useAlertStore()
const { toggleAlert } = store
const loading = ref(true)
const products = ref([])
const category = ref(null)

onMounted(async () => {
  try {
    const { data } = await categoryReq.get(`/${route.params.id}`)
    if (reqIsSuccessful(data, false)) {
      loading.value = false
      category.value = data.msg
      products.value = category.value.products
    }
  } catch (error) {
    handelError(error)
  }
})

const addToCart = async (productId) => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    router.push({ name: 'login' })
  }

  try {
    const { data } = await cartReq.post(
      `/${productId}`,
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
  <h1 v-if="!loading" class="text-center my-5">قسم {{ category.name }}</h1>
  <div v-if="loading" class="loaderContainer">
    <span class="loader"></span>
  </div>
  <v-card v-else class="mx-auto" max-width="80%">
    <v-container fluid>
      <v-row class="direction">
        <v-col cols="12" md="4" v-for="product in products" :key="product.id">
          <v-card class="mx-auto text-right">
              <LazyCardImage :ImgSrc="product.photos.url[0]" />
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-subtitle class="pt-2"> {{ product.price }} دينار عراقي </v-card-subtitle>

            <v-card-actions class="pt-5">
              <v-btn color="blue" :to="{ name: 'productDetails', params: { id: product.id } }">
                تفاصيل
              </v-btn>

              <v-btn
                @click="addToCart(product.id)"
                append-icon="mdi-cart-arrow-down"
                variant="outlined"
                color="pink"
              >
                أضف إلى السلة
              </v-btn>
            </v-card-actions>
          </v-card>
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
