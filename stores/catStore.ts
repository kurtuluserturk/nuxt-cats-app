import { defineStore } from 'pinia'
import { getRandomCat } from '~/repositories/catRepository'

interface CatState {
  catImage: string | null
}

export const useCatStore = defineStore('cat', {
  state: (): CatState => ({
    catImage: null,
  }),
  actions: {
    async fetchRandomCat() {
      const catImageUrl = await getRandomCat()
      this.catImage = catImageUrl
    },
  },
})
