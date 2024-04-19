<template>
  <div class="w-32 -my-8" @click="runAnimation">
    <client-only>
      <Vue3Lottie
        ref="anim"
        :animationData="likeAnimation"
        :loop="false"
        :autoPlay="false"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import likeAnimation from "../assets/images/like-animation.json"
import { ref } from "vue";

const likeClicked = ref(false)

const props = defineProps({
  dislikeClicked: Boolean,
});

const emit = defineEmits(["likeClicked"])
const anim = ref()

function runAnimation() {
  likeClicked.value = !likeClicked.value
  emit("likeClicked", likeClicked.value)
  if (likeClicked.value) {
    anim.value.stop()
    anim.value.play()
  } else {
    anim.value.stop()
  }
}

watch(
  () => props.dislikeClicked,
  (currentValue, oldValue) => {
    if (currentValue && likeClicked.value === true) {
      runAnimation()
    }
  }
)
</script>
