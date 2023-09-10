import { createRouter, createWebHistory } from 'vue-router'
import { useAlertStore } from '@/stores/alert'
import { removeVItemActiveClass } from '@/utils/solutions'
import jwt_decode from 'jwt-decode'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        arabicName: 'الرئيسية'
      }
    },
    {
      path: '/product',
      name: 'productView',
      component: () => import('../views/product/ProductView.vue'),
      meta: {
        arabicName: 'المنتجات'
      }
    },
    {
      path: '/product/deatils/:id',
      name: 'productDetails',
      component: () => import('../views/product/ProductDetails.vue'),
      meta: {
        arabicName: 'تفاصيل المنتج'
      }
    },
    {
      path: '/product/add',
      name: 'addProduct',
      component: () => import('../views/product/AddProduct.vue'),
      meta: {
        arabicName: 'اضافة منتج'
      }
    },
    {
      path: '/product/edit/:id',
      name: 'editProduct',
      component: () => import('../views/product/EditProduct.vue'),
      meta: {
        arabicName: 'تعديل المنتج'
      }
    },
    {
      path: '/product/delete/:id',
      name: 'deleteProduct',
      component: () => import('../views/product/DeleteProduct.vue'),
      meta: {
        arabicName: 'حذف المنتج'
      }
    },
    {
      path: '/users',
      name: 'usersView',
      component: () => import('../views/users/UsersView.vue'),
      meta: {
        arabicName: 'المستخدمين'
      }
    },
    {
      path: '/users/deatils/:id',
      name: 'userDetails',
      component: () => import('../views/users/UserDetails.vue'),
      meta: {
        arabicName: 'تفاصيل المستخدم'
      }
    },
    {
      path: '/user/register',
      name: 'register',
      component: () => import('../views/users/RegisterView.vue'),
      meta: {
        arabicName: 'تسجيل مستخدم جديد'
      }
    },
    {
      path: '/user/login',
      name: 'login',
      component: () => import('../views/users/LoginView.vue'),
      meta: {
        arabicName: 'تسجيل الدخول'
      }
    },
    {
      path: '/user/delete/:id',
      name: 'deleteUser',
      component: () => import('../views/users/DeleteUser.vue'),
      meta: {
        arabicName: 'حذف المستخدم'
      }
    },
    {
      path: '/category',
      name: 'categoryView',
      component: () => import('../views/category/CategoryView.vue'),
      meta: {
        arabicName: 'الأقسام'
      }
    },
    {
      path: '/category/deatils/:id',
      name: 'categoryDetails',
      component: () => import('../views/category/CategoryDetails.vue'),
      meta: {
        arabicName: 'تفاصيل القسم'
      }
    },
    {
      path: '/category/add',
      name: 'addCategory',
      component: () => import('../views/category/AddCategory.vue'),
      meta: {
        arabicName: 'اضافة قسم'
      }
    },
    {
      path: '/category/edit/:id',
      name: 'editCategory',
      component: () => import('../views/category/EditCategory.vue'),
      meta: {
        arabicName: 'تعديل القسم'
      }
    },
    {
      path: '/category/delete/:id',
      name: 'deleteCategory',
      component: () => import('../views/category/DeleteCategory.vue'),
      meta: {
        arabicName: 'حذف القسم'
      }
    },
    {
      path: '/bag',
      name: 'bagView',
      component: () => import('../views/bag/BagView.vue'),
      meta: {
        arabicName: 'الحقيبة'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (
    !(
      from.name === 'editProduct' ||
      from.name === 'editUsers' ||
      from.name === 'editCategory' ||
      from.name === 'deleteProduct' ||
      from.name === 'deleteUser' ||
      from.name === 'deleteCategory' ||
      from.name === 'addUsers' ||
      from.name === 'addCategory' ||
      from.name === 'addProduct'
    ) &&
    (to.name !== 'productView' || to.name !== 'usersView' || to.name !== 'categoryView')
  ) {
    useAlertStore().toggleAlert(false)
  }
  if (from.name === 'addUsers' || from.name === 'addCategory' || from.name === 'addProduct') {
    removeVItemActiveClass(document.querySelector(`[href='${from.href}']`))
  }
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    console.log(jwt_decode(accessToken))
  }
  next()
})

export default router
