<template>
	<search-page-container :search-page-name="searchPageName" :custom-action-handler="customActionHandler" />
</template>

<script>
import { Page } from '../../../mixins/index.js';
import VueService from '../../../services/VueService.js';
import ApiService from '../../../services/ApiService.js';
import templates from '../../../assets/extrasTemplate.json';

const PAGE_NAME = 'educationSitesExtras';

export default {
	mixins: [Page(PAGE_NAME)],
	components: {
		'search-page-container': () => import('../../../components/SearchPageContainer.vue')
	},
	data() {
		return { searchPageName: PAGE_NAME };
	},
	methods: {
		async customActionHandler(action, params) {
			const newParams = _.transform(params, (acc, value, key) => {
				const [, newKey] = _.split(key, '.');
				if (!newKey) return;
				acc[newKey] = value;
			});
			switch (action.name) {
				case 'update': {
					let value = {};
					value = newParams.value;
					if (!newParams.value) {
						value = templates.find((template) => {
							return Object.keys(template)[0] === newParams.name;
						});
						value = value[newParams.name];
					}
					await new Promise((resolve, reject) => {
						const createModal = VueService.openModal({
							name: 'Value',
							maxWidth: 600,
							maxHeight: 700,
							component: 'create-form',
							componentProps: {
								fields: [{ name: 'value', label: 'Value', type: 'textarea', required: true, value: JSON.stringify(value, 2, 2) }],
								vertical: true,
								save: async (values) => {
									try {
										const result = await ApiService.educationSitesExtras.update({ id: newParams.id, value: values.value });
										if (result.error) {
											VueService.showToastMessage({ text: action.errorMessage, type: 'error' });
										} else {
											VueService.closeModal(createModal);
											resolve();
											VueService.showToastMessage({ message: 'Value Added', type: 'success' });
										}
									} catch (error) {
										VueService.showToastMessage({ text: action.errorMessage, type: 'error' });
									}
								}
							}
						});
					});
					break;
				}
				default:
			}
		}
	}
};
</script>
