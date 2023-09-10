<script setup>
import { ref } from 'vue'
import { userReq } from '@/config/axios'
import { UserValidator } from '@/utils/user'
import { useRouter } from 'vue-router'
import { reqIsSuccessful, handelError } from '@/utils/helpers'

const router = useRouter()
const loading = ref(false)
const username = ref(null)
const email = ref(null)
const password = ref(null)
const phoneNumber = ref(null)

const handelSubmit = async (event) => {
  loading.value = true
  const { valid } = await event

  if (valid) {
    const values = {
      username: username.value,
      email: email.value,
      password: password.value,
      phoneNumber: phoneNumber.value
    }

    try {
      const { data } = await userReq.post('/', values)
      if (reqIsSuccessful(data)) {
        router.push({ name: 'login' })
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
          <v-text-field
            :rules="UserValidator.usernameRules"
            v-model="username"
            label="الأسم الرباعي"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            type="number"
            :rules="UserValidator.phoneNumberRules"
            v-model="phoneNumber"
            label="رقم الهاتف"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            type="email"
            :rules="UserValidator.emailRules"
            v-model="email"
            label="البريد الالكتروني"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            type="password"
            :rules="UserValidator.passwordRules"
            v-model="password"
            label="كلمة المرور"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn :loading="loading" type="submit" width="300" color="pink" class="mt-10 mx-auto direction"
          >أضافة</v-btn
        >
      </div>
    </v-form>
  </v-sheet>
</template>

