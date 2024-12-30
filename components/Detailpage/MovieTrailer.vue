<template>
  <div v-if="trailerURL" class="iframe-container mt-4 mb-8 detailpage-box-shadow">
    <iframe 
        frameborder="0"
        :src="trailerURL"
        allow="fullscreen"
    >
    </iframe>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "../../stores/store"

const store = useStore()

const movie: any = computed(() => store.selectedMovie)
const trailer = computed(() => movie.value.videos?.results?.[0])
const trailerURL = computed(() => trailer.value?.site === 'YouTube' ? `https://www.youtube-nocookie.com/embed/${trailer.value.key}` : undefined)
</script>

<style>
.iframe-container { 
  position: relative; 
  width: 100%; 
  padding-bottom: 56.25%; /* Default 16:9 aspect ratio, adjust if needed */ 
  height: 0; 
} 
  
.iframe-container iframe { 
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%; 
  border: 0
}

.detailpage-box-shadow {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
</style>