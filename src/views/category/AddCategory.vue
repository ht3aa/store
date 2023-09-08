<script setup>
import { ref } from 'vue'
import { categoryReq } from '@/config/axios'
import { CategoryValidator } from '@/utils/category'
import { useAlertStore } from '@/stores/alert'
import { useRouter } from 'vue-router'
import { reqIsSuccessful, handelError } from '@/utils/helpers'

const router = useRouter()
const store = useAlertStore()
const { toggleAlert } = store
const loading = ref(false)
const categoryName = ref(null)
const categoryPhoto = ref(null)

const handelSubmit = async (event) => {
  loading.value = true
  const { valid } = await event

  if (valid) {
    const formData = new FormData()
    formData.append('name', categoryName.value)
    formData.append('photo', categoryPhoto.value[0])

    try {
      const { data } = await categoryReq.post('/', formData)
      if (reqIsSuccessful(data)) {
        router.push({ name: 'categoryView' })
      }
    } catch (error) {
      handelError(error)
    }

    loading.value = false
  }
}
</script>

<template>
  <v-sheet width="80%" class="mx-auto mt-10">
    <v-form @submit.prevent="handelSubmit">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field :rules="CategoryValidator.categoryNameRules" v-model="categoryName"
            label="أسم القسم"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-file-input accept="image/*" label="الصورة" v-model="categoryPhoto"
            :rules="CategoryValidator.categoryPhotoRules"></v-file-input>
        </v-col>
      </v-row>
      <div style="text-align: center">
        <v-btn :loading="loading" type="submit" width="300" color="yellow-darken-4"
          class="mt-10 mx-auto rtl">أضافة</v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<style scoped>
.rtl {
  direction: rtl;
}
</style>
