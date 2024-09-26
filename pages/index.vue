<template>
  <div class="">
    <form class="flex flex-col justify-center items-center gap-y-3" @submit.prevent="login">
      <InputText type="text" v-model="username" placeholder="Kullanıcı Adı" />
      <Password v-model="password" placeholder="Şifre" :feedback="false" />
      <Button type="submit" label="Giriş Yap" icon="pi pi-check" />
    </form>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/authStore'
import { navigateTo } from '#app'

const authStore = useAuthStore()
const username = ref<string>('')
const password = ref<string>('')
const errorMessage = ref<string | null>(null)

const login = async () => {
  try {
    await authStore.login(username.value, password.value)
    errorMessage.value = null
    navigateTo('/cats')
  } catch (error) {
    errorMessage.value = error as string
  }
}
</script>
