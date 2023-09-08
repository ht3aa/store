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
const loading = ref(false)
const username = ref(null)
const email = ref(null)

onMounted(async () => {
  try {

    const { data } = await userReq.get(`/${route.params.id}`)
    console.log(data);
    if (reqIsSuccessful(data, false)) {
      username.value = data.msg.username
      email.value = data.msg.email
    } else {
      toggleAlert(true, data.status, data.msg)
    }
  } catch (error) {
    handelError(error)
  }

})
const handelSubmit = async () => {
  loading.value = true

  try {
    const { data } = await userReq.delete(`/${route.params.id}`)
    if (reqIsSuccessful(data)) {
      router.push({ name: 'usersView' })
      loading.value = false
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
        <v-col cols="12" md="6">
          <v-text-field v-model="username" label="أسم المستعار"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field type="email" v-model="email" label="البريد الالكتروني"></v-text-field>
        </v-col>
      </v-row>

      <div style="text-align: center">
        <v-btn :loading="loading" type="submit" width="300" color="error" class="mt-10 mx-auto rtl">حذف</v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<style scoped>
.rtl {
  direction: rtl;
}
</style>
