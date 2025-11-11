<template>
  <div>
    <h1 class="font-semibold text-3xl text-white my-16">Metrics</h1>
    <div id="metrics-container">
      <div v-for="page in pages" :key="page.id" class="metric-item">
        <h2 class="text-white">{{ page.title }}</h2>
        <div :id="'visit-count-' + page.id" class="visit-count"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const pages = [
  { path: '/de', title: 'HOMEPAGE DE', id: 'homepage-de' },
  { path: '/fr', title: 'HOMEPAGE FR', id: 'homepage-fr' },
  { path: '/en', title: 'HOMEPAGE UK', id: 'homepage-uk' },
  { path: '/us', title: 'HOMEPAGE US', id: 'homepage-us' },
  { path: '/es', title: 'HOMEPAGE ES', id: 'homepage-es' },
  { path: '/de/quiz', title: 'QUIZ DE', id: 'quiz-de' },
  { path: '/fr/quiz', title: 'QUIZ FR', id: 'quiz-fr' },
  { path: '/en/quiz', title: 'QUIZ UK', id: 'quiz-uk' },
  { path: '/us/quiz', title: 'QUIZ US', id: 'quiz-us' },
  { path: '/es/quiz', title: 'QUIZ ES', id: 'quiz-es' },
]

function loadVisitCounts() {
  console.log(window.goatcounter && typeof window.goatcounter.visit_count === 'function');

  const t = setInterval(() => {
    if (window.goatcounter && typeof window.goatcounter.visit_count === 'function') {
      clearInterval(t)
      pages.forEach(page => {
        window.goatcounter?.visit_count({
          path: page.path,
          append: `#visit-count-${page.id}`,
          no_branding: true,
          style: '* {color: #000; font-size: 14px;font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;border: none}'
        })
      })
    }
  }, 100)
}

setTimeout(() => loadVisitCounts(), 2000)
</script>

<style scoped>
#metrics-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
  margin: 32px auto;
  max-width: 1024px;
  place-items: center;
}

.metric-item {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  width: 320px;
}

.metric-item h2 {
  margin-top: 0;
  font-size: 1.2rem;
}

.visit-count {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}
</style>

<style>
.visit-count iframe {
  margin: 0 auto;
}
</style>