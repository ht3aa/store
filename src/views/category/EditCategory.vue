<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { categoryReq } from '@/config/axios'
import { CategoryValidator } from '@/utils/category'
import { useAlertStore } from '@/stores/alert'
import { reqIsSuccessful, handelError } from '@/utils/helpers'

const route = useRoute()
const router = useRouter()
const store = useAlertStore()
const { toggleAlert } = store
const loading = ref(false)
const categoryName = ref(null)
const categoryPhoto = ref(null)
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

const handelSubmit = async (event) => {
  loading.value = true
  const { valid } = await event

  if (valid) {
    const formData = new FormData()
    if (categoryPhoto.value) {
      formData.append('photo', categoryPhoto.value[0])
    }
    formData.append('name', categoryName.value)

    try {
      const { data } = await categoryReq.patch(`/${route.params.id}`, formData)
      if (reqIsSuccessful(data)) {
        loading.value = false
        router.push({ name: 'categoryView' })
      }
    } catch (error) {
      handelError(error)
    }
  }
}
</script>

<template>
  <v-sheet width="80%" class="mx-auto my-10">
    <v-form @submit.prevent="handelSubmit">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field :rules="CategoryValidator.categoryNameRules" v-model="categoryName"
            label="أسم القسم"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-carousel v-if="oldCategoryPhoto" height="300">
            <v-carousel-item :src="oldCategoryPhoto" cover></v-carousel-item>
          </v-carousel>
          <v-file-input multiple accept="image/*" label="الصور" v-model="categoryPhoto"></v-file-input>
        </v-col>
      </v-row>
      <div style="text-align: center" class="mb-5">
        <v-btn :loading="loading" type="submit" width="300" color="blue" class="mt-10 mx-auto rtl">تعديل</v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<style scoped>
.rtl {
  direction: rtl;
}
</style>
