import { fieldType } from '../../_fieldTypes.js';
import ApiService from '../../../services/ApiService.js';

const entity = 'clients';

const entityFields = {
	id: {
		search: { type: fieldType.NUMBER, multiple: true },
		display: { type: fieldType.NUMBER, sortable: true },
		create: null,
		edit: null
	},
	username: {
		search: { type: fieldType.SPECIAL_TEXT, multiple: true },
		display: { type: fieldType.SPECIAL_TEXT, sortable: true },
		create: { type: fieldType.SPECIAL_TEXT, required: true },
		edit: { type: fieldType.SPECIAL_TEXT, required: true }
	},
	password: {
		search: { type: fieldType.SPECIAL_TEXT, multiple: true },
		display: { type: fieldType.SPECIAL_TEXT, sortable: true },
		create: { type: fieldType.SPECIAL_TEXT, required: true },
		edit: { type: fieldType.SPECIAL_TEXT, required: true }
	},
	productName: {
		search: { type: fieldType.SELECT, itemFetcher: getProductNames },
		display: { type: fieldType.SPECIAL_TEXT, sortable: true },
		create: { type: fieldType.SELECT, itemFetcher: getProductNames, required: true },
		edit: { type: fieldType.SELECT, itemFetcher: getProductNames, required: true }
	},
	firstName: {
		search: { type: fieldType.SPECIAL_TEXT, multiple: true },
		display: { type: fieldType.SPECIAL_TEXT, sortable: true },
		create: { type: fieldType.SPECIAL_TEXT, required: true },
		edit: { type: fieldType.SPECIAL_TEXT, required: true }
	},
	educationSite: {
		search: { type: fieldType.SELECT, itemFetcher: ApiService.educationSitesWebsites.getDisplayList, multiple: true },
		display: { type: fieldType.SPECIAL_TEXT, sortable: true },
		create: { type: fieldType.SELECT, itemFetcher: ApiService.educationSitesWebsites.getDisplayList, required: true },
		edit: { type: fieldType.SELECT, itemFetcher: ApiService.educationSitesWebsites.getDisplayList, required: true }
	}
};

export default { entity, entityFields };
