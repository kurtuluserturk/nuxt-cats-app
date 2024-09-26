<template>
  <div class="flex flex-col justify-center items-center gap-y-3 h-[calc-(100%-300px)] mt-2 px-2">
    <Button @click="changeCat" icon="pi pi-refresh" label="Değiştir" />
    <Transition enter-active-class="transition-opacity duration-500 ease-in-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-500 ease-in-out"
      leave-from-class="opacity-100" leave-to-class="opacity-0" mode="out-in">
      <img v-if="catStore.catImage" :key="catStore.catImage" :src="catStore.catImage"
        class="max-w-full max-h-[70vh] object-contain rounded-2xl border-[#6ee7b7] border-2" alt="Rastgele Kedi" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCatStore } from '~/stores/catStore'

const catStore = useCatStore()

const changeCat = () => {
  catStore.fetchRandomCat()
}

onMounted(() => {
  changeCat()
})

</script>
