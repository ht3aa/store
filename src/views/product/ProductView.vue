<script setup>
import { onMounted, ref, watch } from 'vue'
import { productReq } from '@/config/axios'
import BannerComponent from '@/components/BannerComponent.vue'
import { reqIsSuccessful, arabicSortBy, handelError } from '@/utils/helpers'

const products = ref([])
const loading = ref(false)
const filterdProducts = ref([])
const search = ref(null)

onMounted(async () => {
  loading.value = true

  try {

    const { data } = await productReq.post('/find', {
      withPhotoRelation: true
    })
    if (reqIsSuccessful(data, false)) {
      data.msg = arabicSortBy(data.msg, 'name')
      products.value = data.msg
      filterdProducts.value = products.value
      loading.value = false
    }
  } catch (error) {
    handelError(error)
  }

})

const filter = () => {
  if (!search.value) {
    filterdProducts.value = products.value
  }
  filterdProducts.value = products.value.filter((product) => {
    return product.name.toLowerCase().includes(search.value.trim().toLowerCase())
      || product.price.toLowerCase().includes(search.value.trim().toLowerCase())
  })
}
watch(search, filter)
</script>

<template>
  <v-text-field v-model="search" label="بحث" hide-details="auto"></v-text-field>
  <div v-if="loading" class="loaderContainer">
    <span class="loader"></span>
  </div>
  <v-table v-else>
    <thead>
      <tr>
        <th class="text-right bg-primary">ألأجراءات</th>
        <th class="text-right bg-primary">السعر</th>
        <th class="text-right bg-primary">الأسم</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in filterdProducts" :key="product.id">
        <td class="text-right">
          <v-btn variant="outlined" append-icon="mdi-delete" :to="{ name: 'deleteProduct', params: { id: product.id } }"
            class="ml-2" color="error">حذف</v-btn>
          <v-btn variant="outlined" append-icon="mdi-pencil" :to="{ name: 'editProduct', params: { id: product.id } }"
            color="blue" class="ml-2">تعديل</v-btn>
        </td>
        <td class="text-right">{{ product.price }}</td>
        <td class="text-right">
          <router-link :to="{ name: 'productDetails', params: { id: product.id } }">
            {{ product.name }}
          </router-link>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr v-if="products.length === 0">
        <td colspan="4">
          <BannerComponent banner-btn-text="أضافة" banner-icon="mdi-account-injury" banner-color="primary"
            banner-text="لم تقم بأضافة اي منتج. أضغط على الأضافة." :banner-to="{ name: 'addProduct' }" />
        </td>
      </tr>
    </tfoot>
  </v-table>
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
