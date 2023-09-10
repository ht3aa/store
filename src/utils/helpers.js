import { useAlertStore } from '@/stores/alert'

const store = useAlertStore()
const { toggleAlert } = store

export class Validator {
  constructor() {}

  static isNotEmpty(value) {
    if (value === undefined || value === null || value.length === 0) {
      return 'يجب ملأ الحقل'
    }
    return true
  }
}

export const doneLoadingImg = (id) => {
  const img = document.getElementById(id)
  img.classList.remove('loadingImg')
}

export const startLoadingImg = (id) => {
  const img = document.getElementById(id)
  img.classList.add('loadingImg')
}

/**
 * Remove all the v-list-item--active class from all v-list-item
 * This is done becouse when you use router.push and push to specific route
 * the previous v-list-item will still active and the one of the current route also.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
export const removeVItemActiveClass = () => {
  Array.from(document.querySelectorAll('.v-list-item')).forEach((item) => {
    item.classList.remove('v-list-item--active')
    item.classList.remove('bg-primary')
    item.classList.remove('bg-red')
  })
}

export const arabicSortBy = (arrOfObj, sortedBy) => {
  return arrOfObj.sort((a, b) => a[sortedBy].localeCompare(b[sortedBy], 'ar'))
}

export const reqIsSuccessful = (res, alert = true) => {
  if (res.status === 200 || res.status === 201) {
    if (alert) {
      toggleAlert(true, res.status, res.msg)
    }
    return true
  } else {
    toggleAlert(true, res.status, res.msg)
    return false
  }
}

export const handelError = (error) => {
  console.log(error)
  if (error.response.status === 401) {
    toggleAlert(true, 401, 'ممنوع الدخول')
  } else if (error.response.status === 404) {
    toggleAlert(true, 404, error.response.data.message)
  } else {
    toggleAlert(true)
  }
}
