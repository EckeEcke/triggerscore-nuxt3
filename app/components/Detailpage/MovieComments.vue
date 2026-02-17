<template>
  <div v-if="comments && comments.length > 0" class="comments-section">
    <h2 class="section-headline">
      {{ t("general.comments") }}
    </h2>
    <div class="comments-grid">
      <div
        v-for="(comment, index) in visibleComments"
        :key="comment + index"
        class="comment"
      >
        <p>"{{ comment }}"</p>
        <button
          class="report-btn"
          @click="pushToContact(comment)"
        >
          <font-awesome-icon :icon="['fas', 'flag']" class="mr-1" />
          {{ t("rating.report") }}
        </button>
      </div>
    </div>
    <button
      v-if="comments.length > 2"
      class="load-more-comments-btn"
      @click="showMoreComments = !showMoreComments"
    >
      {{ showMoreComments ? t("general.showLess") : t("general.showMore") }}
      <font-awesome-icon :icon="['fas', showMoreComments ? 'caret-up' : 'caret-down']" class="mb-1" />
    </button>
  </div>
</template>

<script lang='ts' setup>

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const props = defineProps<{
  comments: string[] | undefined,
}>()

const visibleComments = computed(() => showMoreComments.value ? props.comments : props.comments?.slice(0,2))

const showMoreComments = ref(false)

const pushToContact = (comment: string) => {
  const truncatedComment = comment.substring(0, Math.min(20, comment.length))
  router.push({
    path: '/contact',
    query: { id: route.params.id, comment: truncatedComment },
  })
}
</script>

<style scoped>
.comments-section {
  @apply px-4 mb-12 mt-4;
}

.section-headline {
  @apply text-white font-semibold text-lg text-left mb-4;
}

.comments-grid {
  @apply grid sm:grid-cols-2 gap-2;
}

.comment {
  @apply text-white text-left text-sm p-4 md:p-6 pb-10 md:pb-8 bg-gradient-to-br from-gray-950 to-gray-800 italic rounded relative;
}

.load-more-comments-btn {
  @apply flex gap-1 items-center ml-auto mt-3 cursor-pointer transition hover:text-yellow-500;
}

.report-btn {
  @apply text-gray-500 absolute bottom-2 right-3 transition hover:text-yellow-500 cursor-pointer;
}
</style>