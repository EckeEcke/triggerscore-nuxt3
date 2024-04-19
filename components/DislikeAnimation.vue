<template>
  <div class="w-32 -my-8" @click="runAnimation">
    <client-only>
      <Vue3Lottie
        ref="anim"
        :animationData="dislikeAnimation"
        :loop="false"
        :autoPlay="false"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import DislikeAnimation from "../assets/images/dislike-animation.json"

const dislikeAnimation = DislikeAnimation
const dislikeClicked = ref(false)

const props = defineProps({
  likeClicked: Boolean,
})

const anim: Ref<any> = ref(null)

const emit = defineEmits(["dislikeClicked"])

function runAnimation() {
  dislikeClicked.value = !dislikeClicked.value
  emit("dislikeClicked", dislikeClicked.value)
  if (dislikeClicked.value) {
    anim.value!.stop()
    anim.value!.play()
  } else {
    anim.value!.stop()
  }
}
watch(
  () => props.likeClicked,
  (currentValue, oldValue) => {
    if (currentValue && dislikeClicked.value === true) {
      runAnimation()
    }
  }
)
</script>
