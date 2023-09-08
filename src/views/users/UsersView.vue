<script setup>
import { onMounted, ref, watch } from 'vue'
import { userReq } from '@/config/axios'
import BannerComponent from '@/components/BannerComponent.vue'
import { arabicSortBy, reqIsSuccessful, handelError } from '@/utils/helpers'

const users = ref([])
const loading = ref(true)
const filterdUsers = ref([])
const search = ref(null)

onMounted(async () => {
  try {
    let { data } = await userReq.post('/find')

    if (reqIsSuccessful(data, false)) {
      data.msg = arabicSortBy(data.msg, 'username')
      users.value = data.msg
      filterdUsers.value = users.value
      loading.value = false
    }
  } catch (error) {
    handelError(error)
  }
})

const filter = () => {
  if (!search.value) {
    filterdUsers.value = users.value
  }
  filterdUsers.value = users.value.filter((user) => {
    return user.email.toLowerCase().includes(search.value.trim().toLowerCase())
      || user.username.toLowerCase().includes(search.value.trim().toLowerCase())
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
        <th class="text-right bg-lime">ألأجراءات</th>
        <th class="text-right bg-lime">الأيميل</th>
        <th class="text-right bg-lime">الأسم المستعار</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in filterdUsers" :key="user.id">
        <td class="text-right">
          <v-btn variant="outlined" append-icon="mdi-delete" :to="{ name: 'deleteUser', params: { id: user.id } }"
            class="ml-2" color="error">حذف</v-btn>
        </td>
        <td class="text-right">{{ user.email }}</td>
        <td class="text-right">
          <router-link :to="{ name: 'userDetails', params: { id: user.id } }">
            {{ user.username }}
          </router-link>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr v-if="users.length === 0">
        <td colspan="4">
          <BannerComponent banner-btn-text="أضافة" banner-icon="mdi-account-group" banner-color="lime"
            banner-text="لا يوجد مستخدمين الى الأن" />
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
