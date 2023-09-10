<script setup>
const navBarGroups = [
  {
    id: 1,
    name: 'المنتجات',
    value: 'products',
    activeClass: 'bg-primary',
    icon: 'mdi-package-variant-closed',
    items: [
      {
        id: 1,
        to: { name: 'productView' },
        title: 'الكل',
        value: 'allProduct'
      },
      {
        id: 2,
        to: { name: 'addProduct' },
        title: 'اضافة',
        value: 'addProduct'
      }
    ]
  },
  {
    id: 2,
    name: 'المستخدمين',
    value: 'users',
    activeClass: 'bg-lime',
    icon: 'mdi-account-group',
    items: [
      {
        id: 1,
        to: { name: 'usersView' },
        title: 'الكل',
        value: 'allUser'
      }
    ]
  },
  {
    id: 3,
    name: 'الأقسام',
    value: 'categories',
    activeClass: 'bg-yellow-darken-4',
    icon: 'mdi-shape',
    items: [
      {
        id: 1,
        to: { name: 'categoryView' },
        title: 'الكل',
        value: 'allCategories'
      },
      {
        id: 2,
        to: { name: 'addCategory' },
        title: 'اضافة',
        value: 'addCategory'
      }
    ]
  },
  {
    id: 4,
    name: 'الحساب',
    value: 'user',
    activeClass: 'bg-pink',
    icon: 'mdi-account',
    items: [
      {
        id: 1,
        to: { name: 'register' },
        title: 'تسجيل مستخدم ',
        value: 'register'
      },
      {
        id: 2,
        to: { name: 'login' },
        title: 'تسجيل الدخول',
        value: 'login'
      }
    ]
  }
]
</script>

<template>
  <v-navigation-drawer location="right" class="text-right" expand-on-hover permanent rail>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="حسن تحسين"
        subtitle="ht3aa2001@gmail.com"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        prepend-icon="mdi-home"
        title="الرئيسية"
        value="home"
        to="/"
        active-class="bg-primary"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-cart"
        title="الحقيبة"
        value="bagView"
        to="/bag"
        active-class="bg-primary"
      ></v-list-item>
      <v-list-group v-for="group in navBarGroups" :key="group.id" :value="group.value">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :prepend-icon="group.icon" :title="group.name"></v-list-item>
        </template>
        <v-list-item
          v-for="item in group.items"
          :key="item.id"
          :to="item.to"
          :active-class="group.activeClass"
          :title="item.title"
          :value="item.value"
        ></v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
