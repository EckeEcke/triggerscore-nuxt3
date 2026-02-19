<template>
	<header :class="isFixed ? 'fixed' : 'absolute'" role="banner">
		<section class="container">
			<h1>
				<NuxtLink
					:to="localePath('/')"
					:aria-label="t('header.home')"
					class="header-logo"
				>
					TRIGGERSC<AngryAnimation />RE
				</NuxtLink>
			</h1>
			<div class="links-wrapper">
				<NuxtLink
					v-for="link in navLinks"
					:key="link.name"
					:to="localePath(link.target)"
					class="animated-link"
				>
					{{ link.name }}
				</NuxtLink>
				<LanguageSelect />
				<button class="flex" @click="openSearch">
					<font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
				</button>
				<span class="menu-btn">
					<font-awesome-icon :icon="['fas', 'bars']" @click="openNav" />
				</span>
			</div>
		</section>
		<Teleport to="#__nuxt">
			<transition-group
				enter-active-class="duration-300 ease-out"
				enter-from-class="opacity-0"
				enter-to-class="opacity-100"
				leave-active-class="duration-500 ease-in"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<div
					v-if="showNav"
					key="backdrop"
					class="nav-backdrop"
					@click="showNav = false"
				/>
				<nav v-if="showNav" key="sidebar" aria-label="Main navigation">
					<div class="close-btn">
						<font-awesome-icon
							:icon="['fas', 'times']"
							@click="showNav = false"
						/>
					</div>
					<div class="mb-6">
						<NuxtLink
							:to="localePath('/')"
							class="nav-logo"
							@click="showNav = false"
						>
							TRIGGERSC<font-awesome-icon
								:icon="['fas', 'angry']"
								class="text-white"
							/>RE
						</NuxtLink>
					</div>

					<NuxtLink
						v-for="link in navLinksExtended"
						:key="link.name"
						:to="localePath(link.target)"
						class="sidebar-link"
					>
						<div class="py-6" @click="showNav = false">
							{{ link.name }}
						</div>
					</NuxtLink>
				</nav>
			</transition-group>
		</Teleport>

		<transition
			enter-active-class="duration-300 ease-out"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="duration-500 ease-in"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div v-if="showSearch" class="backdrop-container">
				<div class="backdrop">
					<div
						class="backdrop-overlay"
						@click="showSearch = false"
					/>
					<div class="container search-box">
						<div
							class="search-box-content"
							style="max-width: 40rem"
						>
							<div class="search-form">
								<button
									class="submit-search-btn"
									@click="searchMovie"
								>
									<font-awesome-icon
										:icon="['fas', 'search']"
										class="text-lg"
									/>
								</button>
								<input
									ref="searchHeader"
									v-model="searchInput"
									type="text"
									class="search-input"
									:placeholder="t('header.searchPlaceholder')"
									@keyup.enter="searchMovie"
									@input="resetSearchResults"
								>
								<div
									class="close-search-icon"
								>
									<font-awesome-icon
										:icon="['fas', 'times']"
										class="self-center"
										@click="showSearch = false"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</header>
</template>

<script setup lang="ts">
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import AngryAnimation from '~/components/animations/AngryAnimation.vue'

const route = useRoute()
const localePath = useLocalePath()
const { t, locale } = useI18n()
const store = useStore()

const isFixed = computed(() => route.path !== '/Quiz')

const showSearch = useState('showSearch', () => false)
const showMenu = ref(false)
const showNav = ref(false)

const searchHeader = ref()
const searchInput = ref('')

const searchMovie = () => {
	if (searchInput.value.length > 0) {
		store.searchInput = searchInput.value
		store.setSearchResults(locale.value)
		showSearch.value = false
		navigateTo(localePath('/search'))
	}
}

const resetSearchResults = () => {
	store.resetSearch()
}

const focusSearch = () => {
	searchHeader.value.focus()
}

const openSearch = () => {
	showSearch.value = !showSearch.value
	showMenu.value = false
	showNav.value = false
	setTimeout(focusSearch, 200)
}

const openNav = () => {
	showNav.value = !showNav.value
	showMenu.value = false
	showSearch.value = false
}

const closeSearchWithEsc = (event: KeyboardEvent) => {
	if (event.key === 'Escape') {
		if (showSearch.value) {
			showSearch.value = false
			searchInput.value = ''
		} else if (showNav.value) {
			showNav.value = false
		}
	}
}

const navLinks = [
	{
		target: '/',
		name: t('header.home')
	},
	{
		target: '/all',
		name: t('header.allMovies')
	},
	{
		target: '/quiz',
		name: 'QUIZ'
	},
	{
		target: '/stats',
		name: 'STATS'
	},
	{
		target: '/about',
		name: t('header.about')
	}
]

const navLinksExtended = [
	...navLinks,
	{
		target: '/faq',
		name: t('header.faq')
	},
	{
		target: '/contact',
		name: t('header.contact')
	}
]

watch(
	() => route.path,
	() => {
		showSearch.value = false
		showNav.value = false
	}
)

onMounted(() => {
	window.addEventListener('keydown', closeSearchWithEsc)
})

onUnmounted(() => {
	window.removeEventListener('keydown', closeSearchWithEsc)
})
</script>

<style scoped>
header {
	@apply w-screen h-auto bg-red-950 bg-opacity-95 z-30 shadow-md flex flex-col top-0;
}

nav {
	@apply w-80 bg-gray-900 bg-opacity-80 backdrop-blur h-screen fixed top-0 right-0 shadow-lg md:hidden z-40;
}

.nav-logo {
	@apply text-2xl self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer;
}

.header-logo {
	@apply leading-none text-xl md:leading-6 md:text-2xl self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer;
}

.container {
	@apply mx-auto h-full p-4 xl:w-10/12 flex justify-between;
}

.search-icon {
	@apply text-lg text-white mr-6 sm:mr-10 md:mr-0 self-center hover:text-yellow-500;
}

.search-box {
	@apply flex flex-col md:flex-row mx-auto md:px-4 xl:w-10/12 absolute top-1/3 left-1/2 transform -translate-x-1/2 h-32;
}

.search-box-content {
  @apply flex mx-auto mt-6 p-4 sm:px-0 h-24 self-center w-full;
}

.search-input {
  @apply lg:text-xl px-4 w-full outline-none transition;
}

.search-form {
  @apply rounded-lg flex w-full justify-start;
}

.close-search-icon {
  @apply bg-white rounded-r-xl h-full w-8 flex justify-center;
}

.submit-search-btn {
  @apply flex items-center justify-center px-3 w-16 rounded-l-xl bg-yellow-500 text-white;
}

.backdrop-container {
  @apply absolute top-0 left-0;
}

.backdrop {
	@apply relative h-screen w-screen bg-gray-900 bg-opacity-90 overflow-hidden backdrop-blur;
}

.backdrop-overlay {
  @apply absolute top-0 left-0 w-full h-full;
}

.menu-btn {
	@apply md:hidden flex self-center text-white text-lg;
}

.close-btn {
	@apply text-right text-xl p-4 text-white;
}

.nav-backdrop {
	@apply fixed bg-gray-900 bg-opacity-40 top-0 left-0 w-full h-screen overflow-hidden;
}

.links-wrapper {
	@apply flex items-center sm:text-sm;
}

.sidebar-link {
	@apply text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase;
}

.animated-link {
	text-decoration: none;
	position: relative;
	@apply text-white font-semibold self-center mr-6 md:mr-10 hidden md:block hover:text-yellow-500 uppercase;
}

.animated-link::before {
	content: '';
	position: absolute;
	display: block;
	width: 100%;
	height: 4px;
	bottom: -4px;
	border-radius: 8px;
	left: 0;
	background-color: rgba(255, 255, 255);
	transform: scaleX(0);
	transition: transform 0.3s ease;
}

.animated-link:hover::before {
	transform: scaleX(1);
	background-color: rgba(245, 158, 11);
}
</style>
