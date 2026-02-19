<template>
    <div class="w-32 mx-auto -mt-8 opacity-70">
      <client-only>
        <Vue3Lottie animation-link="/animations/click-animation.json" /> :loop="false" :auto-play="true" />
      </client-only>
    </div>
  </template>
  