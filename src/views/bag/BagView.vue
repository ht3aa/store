<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { cartReq, orderReq } from '@/config/axios'
import { useAlertStore } from '@/stores/alert'
import { reqIsSuccessful, startLoadingImg, doneLoadingImg, handelError } from '@/utils/helpers'
import { lazyImg } from '@/utils/global'
import { ProductValidator } from '@/utils/product'

const route = useRoute()
const router = useRouter()
const store = useAlertStore()
const { toggleAlert } = store
const loading = ref(true)
const cart = ref(null)
const orders = ref(null)
const deleteing = ref(false)
const ordering = ref(false)
const productQuantity = ref(null)

onMounted(async () => {
  try {
    const { data: cartRes } = await cartReq.get(`/one`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })

    const { data: orderRes } = await orderReq.get(`/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    if (reqIsSuccessful(cartRes, false) && reqIsSuccessful(orderRes, false)) {
      loading.value = false
      cart.value = cartRes.msg
      orders.value = orderRes.msg
      console.log(cart)
    }
  } catch (error) {
    handelError(error)
  }
})

const deleteCart = async (productId) => {
  deleteing.value = true

  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    router.push({ name: 'login' })
  }

  try {
    const { data } = await cartReq.delete(`/${cart.value.id}/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (reqIsSuccessful(data, false)) {
      cart.value = data.msg
    }
    deleteing.value = false
  } catch (error) {
    handelError(error)
  }
}
const orderProduct = async (productId) => {
  const wantedQuantity = document.getElementById(productId).value
  const product = cart.value.products.find((product) => product.id === productId)

  if (!wantedQuantity) {
    toggleAlert(true, 'error', `من فضلك ادخل الكمية للمنتج (${product.name})`)
    return
  }
  if (+wantedQuantity > +product.quantity) {
    toggleAlert(
      true,
      'error',
      `الكمية للمنتج (${product.name}) اكبر من المتاحة. (${product.quantity})`
    )
    return
  }
  ordering.value = true

  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    router.push({ name: 'login' })
  }
  try {
    const { data } = await orderReq.post(
      `/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    if (reqIsSuccessful(data, false)) {
      await deleteCart(productId)
      orders.value = data.msg
    }
    ordering.value = false
  } catch (error) {
    handelError(error)
  }
}
</script>

<template>
  <div v-if="loading" class="loaderContainer">
    <span class="loader"></span>
  </div>
  <div v-else>
    <v-table class="my-4">
      <caption class="bg-yellow">
        السلة
      </caption>
      <thead>
        <tr>
          <th class="text-right bg-blue">الأجراءات</th>
          <th class="text-right bg-blue">الكمية</th>
          <th class="text-right bg-blue">سعر المنتج</th>
          <th class="text-right bg-blue">صورة</th>
          <th class="text-right bg-blue">أسم المنتج</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cart.products" :key="product.id">
          <td class="text-right">
            <v-btn
              :loading="deleteing"
              @click="deleteCart(product.id)"
              variant="outlined"
              append-icon="mdi-delete"
              class="ml-2"
              color="error"
              >حذف</v-btn
            >
            <v-btn
              :loading="ordering"
              @click="orderProduct(product.id)"
              variant="outlined"
              append-icon="mdi-cart-check"
              color="green"
              class="ml-2"
              >طلب المنتج</v-btn
            >
          </td>
          <td class="text-right">
            <v-text-field
              type="number"
              :id="product.id"
              min="0"
              :label="product.quantity"
            ></v-text-field>
          </td>
          <td class="text-right">{{ product.price }}</td>
          <td class="text-right">
            <v-img
              class="align-center img-fluid"
              @loadstart="startLoadingImg(product.id + 'img')"
              @load="doneLoadingImg(product.id + 'img')"
              :id="product.id + 'img'"
              :lazy-src="lazyImg"
              :src="product.photos.url[0]"
              cover
            >
            </v-img>
          </td>
          <td class="text-right">{{ product.name }}</td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </v-table>
    <v-table style="margin-top: 120px">
      <caption class="bg-yellow">
        تم الطلب
      </caption>
      <thead>
        <tr>
          <th class="text-right bg-green">الكمية</th>
          <th class="text-right bg-green">سعر المنتج</th>
          <th class="text-right bg-green">صورة</th>
          <th class="text-right bg-green">أسم المنتج</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="text-right">{{ order.product.quantity }}</td>
          <td class="text-right">{{ order.product.price }}</td>
          <td class="text-right">
            <v-img
              class="align-center img-fluid"
              @loadstart="startLoadingImg(order.id + 'img')"
              @load="doneLoadingImg(order.id + 'img')"
              :id="order.id + 'img'"
              :lazy-src="lazyImg"
              :src="order.product.photos.url[0]"
              cover
            >
            </v-img>
          </td>
          <td class="text-right">{{ order.product.name }}</td>
        </tr>
      </tbody>
      <tfoot></tfoot>
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
