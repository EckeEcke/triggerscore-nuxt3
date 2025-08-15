<template>
<div
    v-if="score"
    class="w-full flex flex-col mx-2 self-center rounded-tr"
>
    <div
    class="mx-auto bg-opacity-90 w-12 sm:w-20 md:w-24 lg:w-20 h-12 sm:h-20 md:h-24 lg:h-20 border border-gray-900 p-2 text-3xl rounded-lg flex justify-center my-3"
    :class="getScoreBackground(score.rating_total)"
    >
    <p
        class="self-center text-white text-lg md:text-xl font-semibold"
    >
        {{ score.rating_total }}
    </p>
    </div>
    <div
    class="text-left w-auto mx-auto text-white text-xs sm:text-base"
    >
    <div class="flex my-2 md:text-lg lg:text-base">
        <div
        class="flex rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2"
        :class="getScoreBackground(score.rating_sexism)"
        >
        <div class="self-center">{{ score.rating_sexism }}</div>
        </div>
        <p class="self-center">{{ t("categories.sexism") }}</p>
    </div>
    <div class="flex my-2 md:text-lg lg:text-base">
        <div
        class="flex rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2"
        :class="getScoreBackground(score.rating_racism)"
        >
        <div class="self-center">{{ score.rating_racism }}</div>
        </div>
        <p class="self-center">{{ t("categories.racism") }}</p>
    </div>
    <div class="flex my-2 md:text-lg lg:text-base">
        <div
        class="flex rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2"
        :class="getScoreBackground(score.rating_others)"
        >
        <div class="self-center">{{ score.rating_others }}</div>
        </div>
        <p class="self-center">{{ t("categories.others") }}</p>
    </div>
    <div class="flex my-2 md:text-lg lg:text-base">
        <div
        class="flex rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2"
        :class="getScoreBackground(score.rating_cringe)"
        >
        <div class="self-center">{{ score.rating_cringe }}</div>
        </div>
        <p class="self-center">{{ t("categories.cringe") }}</p>
    </div>
    </div>
</div>
<div
    v-else
    class="w-full flex flex-col mx-2 self-center rounded-tr"
>
    <div
    class="text-base md:text-2xl lg:text-lg self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200"
    >
    TRIGGERSC<font-awesome-icon
        :icon="['fas', 'angry']"
        class="text-white"
    />RE
    </div>
    <p class="text-white mt-4">{{ t("general.noRatings") }}</p>
</div>
</template>

<script setup lang='ts'>
import { useStore } from '~/stores/store'
import { getScoreBackground } from '~/utils/getScoreBackground'

const { t } = useI18n()
const store = useStore()

const score: any = computed(() => store.selectedMovieScore)

</script>