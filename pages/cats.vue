<template>
  <div class="relative min-h-screen w-full mt-3">
    <Toast />

    <Button @click="logout" icon="pi pi-sign-out" label="Çıkış Yap" severity="danger" class="!absolute top-0 right-3" />

    <div class="flex flex-col justify-center items-start gap-y-3 h-[calc(100%-300px)] px-2">
      <Button @click="changeCat" icon="pi pi-refresh" label="Değiştir" :loading="isLoading" />

      <Transition :enter-active-class="currentTransition.enterActive" :enter-from-class="currentTransition.enterFrom"
        :enter-to-class="currentTransition.enterTo" :leave-active-class="currentTransition.leaveActive"
        :leave-from-class="currentTransition.leaveFrom" :leave-to-class="currentTransition.leaveTo" mode="out-in">
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
import { useToast } from "primevue/usetoast"

// we defined auth middleware
definePageMeta({
  middleware: 'auth',
})

const catStore = useCatStore()
const authStore = useAuthStore()
const toast = useToast()

interface Transition {
  enterActive: string
  enterFrom: string
  enterTo: string
  leaveActive: string
  leaveFrom: string
  leaveTo: string
}

const transitions: Transition[] = [
  {
    enterActive: 'transition-opacity duration-500 ease-in-out',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leaveActive: 'transition-opacity duration-500 ease-in-out',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
  },
  {
    enterActive: 'transition-transform duration-500 ease-in-out',
    enterFrom: 'translate-y-full',
    enterTo: 'translate-y-0',
    leaveActive: 'transition-transform duration-500 ease-in-out',
    leaveFrom: 'translate-y-0',
    leaveTo: 'translate-y-full',
  },
  {
    enterActive: 'transition-transform duration-500 ease-in-out',
    enterFrom: 'scale-0',
    enterTo: 'scale-100',
    leaveActive: 'transition-transform duration-500 ease-in-out',
    leaveFrom: 'scale-100',
    leaveTo: 'scale-0',
  },
]

const currentTransition = ref<Transition>(transitions[0])
const isLoading = ref<boolean>(false)

const showError = () => {
  toast.add({ severity: 'error', summary: 'Hata Mesajı', detail: 'Kedi yüklenirken bir hata oluştu', life: 3000 })
}

const changeCat = async () => {
  isLoading.value = true
  try {
    await catStore.fetchRandomCat()

    const randomIndex = Math.floor(Math.random() * transitions.length)
    currentTransition.value = transitions[randomIndex]
  } catch (error) {
    console.error(error)
    showError()
  } finally {
    isLoading.value = false
  }
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
