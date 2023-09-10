<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { productReq } from '@/config/axios'
import { ProductValidator } from '@/utils/product'
import { useAlertStore } from '@/stores/alert'
import { reqIsSuccessful, handelError } from '@/utils/helpers'

const route = useRoute()
const router = useRouter()
const store = useAlertStore()
const { toggleAlert } = store
const loading = ref(false)
const productName = ref(null)
const productDesription = ref(null)
const productPhotos = ref(null)
const oldProductPhotos = ref(null)
const productPrice = ref(null)

onMounted(async () => {
  try {
    const { data } = await productReq.get(`/${route.params.id}`)
    if (reqIsSuccessful(data, false)) {
      productName.value = data.msg.name
      productDesription.value = data.msg.description
      oldProductPhotos.value = data.msg.photos.url
      productPrice.value = data.msg.price
    }
  } catch (error) {
    handelError(error)
  }
})

const handelSubmit = async (event) => {
  loading.value = true
  const { valid } = await event

  if (valid) {
    const formData = new FormData()
    if (productPhotos.value) {
      productPhotos.value.forEach((photo) => {
        formData.append('photos', photo)
      })
    }
    formData.append('name', productName.value)
    formData.append('description', productDesription.value)
    formData.append('price', productPrice.value)

    try {
      const { data } = await productReq.patch(`/${route.params.id}`, formData)
      if (reqIsSuccessful(data)) {
        toggleAlert(true, data.status, data.msg)
        router.push({ name: 'productView' })
        loading.value = false
      }
    } catch (error) {
      handelError(error)
    }
  }
}
</script>

<template>
  <v-sheet width="80%" class="mx-auto mt-10">
    <v-form @submit.prevent="handelSubmit">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            :rules="ProductValidator.productNameRules"
            v-model="productName"
            label="ألأسم"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            type="number"
            min="0"
            v-model="productPrice"
            :rules="ProductValidator.productPriceRules"
            label="السعر"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            :rules="ProductValidator.productDesriptionRules"
            v-model="productDesription"
            label="الوصف"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-carousel v-if="oldProductPhotos" cycle height="300">
            <v-carousel-item :src="oldProductPhotos[0]" cover></v-carousel-item>
            <v-carousel-item
              v-for="(photo, i) in oldProductPhotos.slice(1)"
              :src="photo"
              :key="i"
              cover
            ></v-carousel-item>
          </v-carousel>
          <v-file-input
            multiple
            accept="image/*"
            label="الصور"
            v-model="productPhotos"
          ></v-file-input>
        </v-col>
      </v-row>
      <div class="mb-5 text-center">
        <v-btn :loading="loading" type="submit" width="300" color="blue" class="mt-10 mx-auto direction"
          >تعديل</v-btn
        >
      </div>
    </v-form>
  </v-sheet>
</template>

