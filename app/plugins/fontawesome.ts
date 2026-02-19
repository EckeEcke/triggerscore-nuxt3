import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
	faAngry,
	faSearch,
	faBars,
	faTimes,
	faArrowCircleLeft,
	faArrowCircleRight,
	faThumbsUp,
	faThumbsDown,
	faCircle,
	faEnvelope,
	faLink,
	faFlag,
	faCaretUp,
	faCaretDown,
	faFilter,
	faChevronLeft,
	faChevronRight,
	faUser,
	faClock,
	faCircleQuestion,
	faSpinner,
	faExpand
} from '@fortawesome/free-solid-svg-icons'

library.add(
	faAngry,
	faSearch,
	faBars,
	faTimes,
	faArrowCircleLeft,
	faArrowCircleRight,
	faThumbsUp,
	faThumbsDown,
	faCircle,
	faEnvelope,
	faLink,
	faFlag,
	faCaretUp,
	faCaretDown,
	faFilter,
	faChevronLeft,
	faChevronRight,
	faUser,
	faClock,
	faCircleQuestion,
	faSpinner,
	faExpand
)

config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
