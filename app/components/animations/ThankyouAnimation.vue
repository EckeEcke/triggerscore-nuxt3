<template>
	<div class="w-72 mx-auto">
		<client-only>
			<Vue3Lottie
				class="w-72 gh-72"
				animation-link="/animations/thankyou-animation.json"
				:loop="false"
				:auto-play="true"
				@on-complete="complete"
			/>
		</client-only>
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits(['complete'])

const complete = () => {
	emit('complete')
}
</script>
