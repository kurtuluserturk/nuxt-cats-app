<template>
  <div class="relative min-h-screen w-full mt-3">
    <Button @click="logout" icon="pi pi-sign-out" label="Çıkış Yap" severity="danger" class="!absolute top-0 right-3" />

    <div class="flex flex-col justify-center items-start gap-y-3 h-[calc(100%-300px)] px-2">
      <Button @click="changeCat" icon="pi pi-refresh" label="Değiştir" />

      <Transition enter-active-class="transition-opacity duration-500 ease-in-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-500 ease-in-out"
        leave-from-class="opacity-100" leave-to-class="opacity-0" mode="out-in">
        <img v-if="catStore.catImage" :key="catStore.catImage" :src="catStore.catImage"
          class="max-w-full max-h-[70vh] object-contain rounded-2xl border-[#6ee7b7] border-2" alt="Rastgele Kedi" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCatStore } from '~/stores/catStore'
import { useAuthStore } from '~/stores/authStore'

const catStore = useCatStore()
const authStore = useAuthStore()

const changeCat = () => {
  catStore.fetchRandomCat()
}

const logout = async () => {
  try {
    await authStore.logout()
    navigateTo('/')
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  changeCat()
})

</script>
