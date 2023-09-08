<script setup>
import { ref, onMounted } from 'vue'
import { productReq, categoryReq } from '@/config/axios'
import { ProductValidator } from '@/utils/product'
import { CategoryValidator } from '@/utils/category'
import { useAlertStore } from '@/stores/alert'
import { useRouter } from 'vue-router'
import { reqIsSuccessful, handelError } from '@/utils/helpers'

const router = useRouter()
const store = useAlertStore()
const { toggleAlert } = store
const loading = ref(false)
const productName = ref(null)
const productDesription = ref(null)
const productPhotos = ref(null)
const productPrice = ref(null)
const productQuantity = ref(null)
const categories = ref([])
const categoryName = ref(null)

onMounted(async () => {

  try {
    const { data } = await categoryReq.post('/find')
    if (reqIsSuccessful(data, false)) {
      categories.value = data.msg.map((category) => {
        return category.name
      })

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
    productPhotos.value.forEach((photo) => {
      formData.append('photos', photo)
    })
    formData.append('name', productName.value)
    formData.append('description', productDesription.value)
    formData.append('price', productPrice.value)
    formData.append('quantity', productQuantity.value)
    formData.append('categoryName', categoryName.value)

    try {
      const { data } = await productReq.post('/', formData)
      if (reqIsSuccessful(data)) {
        loading.value = false
        router.push({ name: 'productView' })
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
          <v-combobox :items="categories" :rules="CategoryValidator.categoriesRules" v-model="categoryName"
            label="ألأقسام"></v-combobox>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field :rules="ProductValidator.productNameRules" v-model="productName" label="ألأسم"></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field type="number" min="0" v-model="productPrice" :rules="ProductValidator.productPriceRules"
            label="السعر"></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field type="number" min="0" v-model="productQuantity" :rules="ProductValidator.productQuantityRules"
            label="الكمية"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-file-input multiple accept="image/*" label="الصور" v-model="productPhotos"
            :rules="ProductValidator.productPhotosRules"></v-file-input>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea :rules="ProductValidator.productDesriptionRules" v-model="productDesription"
            label="الوصف"></v-textarea>
        </v-col>
      </v-row>
      <div style="text-align: center">
        <v-btn :loading="loading" type="submit" width="300" color="primary" class="mt-10 mx-auto rtl">أضافة</v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<style scoped>
.rtl {
  direction: rtl;
}
</style>
