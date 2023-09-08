import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', () => {
  const alert = ref(false)
  const alertType = ref('error')
  const alertMsg = ref('')

  function toggleAlert(
    show,
    status = 'error',
    msg = 'حدث خطأ ما. يرجى تبليغ المطور على الرقم 07708246418'
  ) {
    alert.value = show

    if (status === 200 || status === 201) {
      alertType.value = 'success'
    } else {
      alertType.value = 'error'
    }
    alertMsg.value = msg
  }

  return { alert, alertType, alertMsg, toggleAlert }
})
