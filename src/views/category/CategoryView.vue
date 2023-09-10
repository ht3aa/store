<script setup>
import { onMounted, ref, watch } from 'vue'
import { categoryReq } from '@/config/axios'
import BannerComponent from '@/components/BannerComponent.vue'
import { arabicSortBy, handelError, reqIsSuccessful } from '@/utils/helpers'

const categories = ref([])
const loading = ref(false)
const filterdCategories = ref([])
const search = ref(null)

onMounted(async () => {
  loading.value = true

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
  <v-text-field v-model="search" label="بحث" hide-details="auto"></v-text-field>
  <div v-if="loading" class="loaderContainer">
    <span class="loader"></span>
  </div>
  <v-table v-else>
    <thead>
      <tr>
        <th class="text-right bg-yellow-darken-4">ألأجراءات</th>
        <th class="text-right bg-yellow-darken-4">الأسم</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in filterdCategories" :key="category.id">
        <td class="text-right">
          <v-btn
            variant="outlined"
            append-icon="mdi-delete"
            :to="{ name: 'deleteCategory', params: { id: category.id } }"
            class="ml-2"
            color="error"
            >حذف</v-btn
          >
          <v-btn
            variant="outlined"
            append-icon="mdi-pencil"
            :to="{ name: 'editCategory', params: { id: category.id } }"
            color="blue"
            class="ml-2"
            >تعديل</v-btn
          >
        </td>
        <td class="text-right">
          <router-link :to="{ name: 'categoryDetails', params: { id: category.id } }">
            {{ category.name }}
          </router-link>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr v-if="categories.length === 0">
        <td colspan="4">
          <BannerComponent
            banner-btn-text="أضافة"
            banner-icon="mdi-shape"
            banner-color="yellow-darken-4"
            banner-text="لم تقم بأضافة اي قسم أضغط على الأضافة."
            :banner-to="{ name: 'addCategory' }"
          />
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
