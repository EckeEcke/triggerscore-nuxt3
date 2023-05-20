<template>
    <div class="w-64 mx-auto -mt-8">
        <client-only>
            <Vue3Lottie
                :animationData="animation"
                :loop=false
                :autoPlay=true
            />
        </client-only>        
    </div>     
</template>

<script setup>

import LottieAnimation from '../assets/images/success-animation.json'
const animation = LottieAnimation

</script>