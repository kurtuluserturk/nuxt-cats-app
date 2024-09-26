<template>
  <div class="min-h-screen w-full space-y-3 flex flex-col justify-center items-center">
    <form class="flex flex-col justify-center items-center gap-y-3 border border-green-500 rounded-xl p-5"
      @submit.prevent="login">
      <img class="w-56 h-auto rounded-lg object-contain" src="~/assets/images/cat-login.jpg" alt="Kedi görseli">

      <h2 class="text-xl mb-3">Hesabınıza Giriş Yapın</h2>

      <IconField>
        <InputIcon class="pi pi-user" />
        <InputText type="text" v-model="username" placeholder="Kullanıcı Adı" />
      </IconField>

      <IconField>
        <InputIcon class="pi pi-key" />
        <InputText v-model="password" placeholder="Şifre" type="password" />
      </IconField>

      <Button type="submit" label="Giriş Yap" icon="pi pi-check" class="mt-3" />
    </form>
    <div v-if="errorMessage" class="text-red-500 font-medium">{{ errorMessage }}</div>
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
