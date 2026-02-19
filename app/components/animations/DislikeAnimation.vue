<template>
	<button class="w-32 -my-8" @click="runAnimation">
		<client-only>
			<Vue3Lottie
				ref="anim"
				animation-link="/animations/dislike-animation.json"
				:loop="false"
				:auto-play="false"
			/>
		</client-only>
	</button>
</template>

<script setup lang="ts">
const dislikeClicked = ref(false)

const props = defineProps({
	likeClicked: Boolean
})

const anim: Ref<{
	play: () => void
	stop: () => void
} | null> = ref(null)

const emit = defineEmits(['dislikeClicked'])

const runAnimation = () => {
	dislikeClicked.value = !dislikeClicked.value
	emit('dislikeClicked', dislikeClicked.value)
	if (dislikeClicked.value) {
		anim.value!.stop()
		anim.value!.play()
	} else {
		anim.value!.stop()
	}
}
watch(
	() => props.likeClicked,
	(currentValue) => {
		if (currentValue && dislikeClicked.value === true) {
			runAnimation()
		}
	}
)
</script>
