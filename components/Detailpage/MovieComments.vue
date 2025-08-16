<template>
  <div v-if="comments && comments.length > 0" class="px-4 mb-12 mt-4">
    <h2 class="text-white font-semibold text-lg text-left mb-4">
      {{ t("general.comments") }}
    </h2>
    <div class="grid sm:grid-cols-2 gap-2">
      <div
        v-for="(comment, index) in comments"
        :key="comment"
        class="text-white text-left text-sm p-4 md:p-6 pb-10 md:pb-8 bg-gradient-to-br from-gray-950 to-gray-800 italic rounded relative"
        :class="{ hidden: index >= 2 && !showMoreComments }"
      >
        <p>"{{ comment }}"</p>
        <p
          class="text-gray-500 absolute bottom-2 right-3 transition hover:text-yellow-500 cursor-pointer"
          @click="pushToContact(comment)"
        >
          <font-awesome-icon :icon="['fas', 'flag']" class="mr-1" />
          {{ t("rating.report") }}
        </p>
      </div>
    </div>
    <p
      v-if="comments.length > 2"
      class="text-right mt-3 cursor-pointer transition hover:text-yellow-500"
      @click="showMoreComments = !showMoreComments"
    >
      {{ showMoreComments ? t("general.showLess") : t("general.showMore") }}
      <font-awesome-icon :icon="['fas', showMoreComments ? 'caret-up' : 'caret-down']" />
    </p>
  </div>
</template>

<script lang='ts' setup>

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

defineProps<{
  comments: [] | undefined,
}>()

const showMoreComments = ref(false)

const pushToContact = (comment: string) => {
  const truncatedComment = comment.substring(0, Math.min(20, comment.length))
  router.push({
    path: '/contact',
    query: { id: route.params.id, comment: truncatedComment },
  })
}
</script>

<style>

</style>