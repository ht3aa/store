<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { userReq } from '@/config/axios'
import { useAlertStore } from '@/stores/alert'
import { reqIsSuccessful, handelError } from '@/utils/helpers'

const route = useRoute()
const router = useRouter()
const store = useAlertStore()
const { toggleAlert } = store
const loading = ref(true)
const user = ref(null);

onMounted(async () => {
  try {
    const { data } = await userReq.get(`/${route.params.id}`)
    if (reqIsSuccessful(data)) {
      user.value = data.msg
      loading.value = false
    }
  } catch (error) {
    handelError(error)
  }

})


const handelSubmit = async () => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    router.push({ name: 'login' })
  }

  const data = await tryCatch(async () => {
    const { data } = await userReq.post(`/cart/${route.params.id}`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return data
  })

  if (reqIsSuccessful(data.status)) {
    toggleAlert(true, data.status, data.msg)
    router.push({ name: 'cartView' })
  } else {
    toggleAlert(true, data.status, data.msg)
  }
}

</script>

<template>
  <div v-if="loading" class="loaderContainer">
    <span class="loader"></span>
  </div>
  <div v-else>
    <v-table>
      <thead>
        <tr>
          <th class="text-right bg-blue">المسؤولية</th>
          <th class="text-right bg-blue">الأيميل</th>
          <th class="text-right bg-blue">الأسم المستعار</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-right">{{ user.role }}</td>
          <td class="text-right">{{ user.email }}</td>
          <td class="text-right">{{ user.username }}</td>
        </tr>
      </tbody>
      <tfoot>
      </tfoot>
    </v-table>
    <v-table class="my-4">
      <caption class="bg-yellow">السلة</caption>
      <thead>
        <tr>
          <th class="text-right bg-blue">الكمية</th>
          <th class="text-right bg-blue">سعر المنتج</th>
          <th class="text-right bg-blue">أسم المنتج</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in user.cart.products" :key="user.cart.id">
          <td class="text-right">{{ product.quantity }}</td>
          <td class="text-right">{{ product.price }}</td>
          <td class="text-right">{{ product.name }}</td>
        </tr>
      </tbody>
      <tfoot>
      </tfoot>
    </v-table>
    <v-table>
      <caption class="bg-yellow">تم الشراء</caption>
      <thead>
        <tr>
          <th class="text-right bg-blue">الكمية</th>
          <th class="text-right bg-blue">سعر المنتج</th>
          <th class="text-right bg-blue">أسم المنتج</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in user.cart.products" :key="user.cart.id">
          <td class="text-right">{{ product.quantity }}</td>
          <td class="text-right">{{ product.price }}</td>
          <td class="text-right">{{ product.name }}</td>
        </tr>
      </tbody>
      <tfoot>
      </tfoot>
    </v-table>
  </div>
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
