<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { productReq } from '@/config/axios'
import { useAlertStore } from '@/stores/alert'
import { reqIsSuccessful, handelError } from '@/utils/helpers'

const route = useRoute()
const router = useRouter()
const store = useAlertStore()
const { toggleAlert } = store
const loading = ref(false)
const productName = ref(null)
const productDesription = ref(null)
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
const handelSubmit = async () => {
  loading.value = true

  try {
    const { data } = await productReq.delete(`/${route.params.id}`)
    if (reqIsSuccessful(data)) {
      loading.value = false
      router.push({ name: 'productView' })
    }
  } catch (error) {
    handelError(error)
  }
}
</script>

<template>
  <v-sheet width="80%" class="mx-auto mt-10">
    <v-banner lines="one" icon="mdi-close-octagon" color="error" class="my-4">
      <v-banner-text> عند الضغط على الحذف سيتم حذف البيانات نهائياً. </v-banner-text>
    </v-banner>
    <v-form @submit.prevent="handelSubmit">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            class="pointerEvents"
            v-model="productName"
            label="ألأسم"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            type="number"
            class="pointerEvents"
            min="0"
            v-model="productPrice"
            label="السعر"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            class="pointerEvents"
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
        </v-col>
      </v-row>

      <div class="text-center mb-5">
        <v-btn :loading="loading" type="submit" width="300" color="error" class="mt-10 mx-auto direction"
          >حذف</v-btn
        >
      </div>
    </v-form>
  </v-sheet>
</template>

