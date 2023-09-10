<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { categoryReq } from '@/config/axios'
import { useAlertStore } from '@/stores/alert'
import { reqIsSuccessful, handelError } from '@/utils/helpers'

const route = useRoute()
const router = useRouter()
const store = useAlertStore()
const { toggleAlert } = store
const loading = ref(false)
const categoryName = ref(null)
const oldCategoryPhoto = ref(null)

onMounted(async () => {
  try {
    const { data } = await categoryReq.get(`/${route.params.id}`)
    if (reqIsSuccessful(data, false)) {
      categoryName.value = data.msg.name
      oldCategoryPhoto.value = data.msg.url
    }
  } catch (error) {
    handelError(error)
  }
})

const handelSubmit = async () => {
  loading.value = true

  try {
    const { data } = await categoryReq.delete(`/${route.params.id}`)
    if (reqIsSuccessful(data)) {
      loading.value = false
      router.push({ name: 'categoryView' })
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
            v-model="categoryName"
            label="ألأسم"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-carousel v-if="oldCategoryPhoto" cycle height="300">
            <v-carousel-item :src="oldCategoryPhoto" cover></v-carousel-item>
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

