<script setup>
import { ref } from 'vue'
import { userReq } from '@/config/axios'
import { UserValidator } from '@/utils/user'
import { useRouter } from 'vue-router'
import { reqIsSuccessful, handelError } from '@/utils/helpers'

const router = useRouter()
const loading = ref(false)
const username = ref(null)
const password = ref(null)


const handelSubmit = async (event) => {

  const { valid } = await event
  if (valid) {
    
    loading.value = true

    const values = {
      username: username.value,
      password: password.value,
    }
    try {
      const { data } = await userReq.post('/login', values)
      if (reqIsSuccessful(data)) {
        localStorage.setItem('accessToken', data.accessToken)
        router.push({ name: 'home' })
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
          <v-text-field :rules="UserValidator.usernameRules" v-model="username" label="الأسم الرباعي"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field type="password" :rules="UserValidator.passwordRules" v-model="password"
            label="كلمة المرور"></v-text-field>
        </v-col>
      </v-row>
      <div style="text-align: center">
        <v-btn :loading="loading" type="submit" width="300" color="pink" class="mt-10 mx-auto rtl">تسجيل الدخول</v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<style scoped>
.rtl {
  direction: rtl;
}
</style>
