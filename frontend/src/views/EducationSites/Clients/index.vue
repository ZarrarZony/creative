<template>
	<search-page-container :search-page-name="searchPageName" :custom-action-handler="customActionHandler" />
</template>

<script>
import { Page } from '../../../mixins/index.js';

const PAGE_NAME = 'clients';

export default {
	mixins: [Page(PAGE_NAME)],
	components: {
		'search-page-container': () => import('../../../components/SearchPageContainer.vue')
	},
	data() {
		return { searchPageName: PAGE_NAME };
	},
	methods: {
		customActionHandler(action, params) {}
	}
};
</script>
