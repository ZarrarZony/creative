import { fieldType } from '../../_fieldTypes.js';

const entity = 'assets';

const entityFields = {
	id: {
		search: { type: fieldType.NUMBER, multiple: true },
		display: { type: fieldType.NUMBER, sortable: true },
		create: null,
		edit: null
	},
	name: {
		search: { type: fieldType.SPECIAL_TEXT, multiple: true },
		display: { type: fieldType.SPECIAL_TEXT, sortable: true },
		create: { type: fieldType.SPECIAL_TEXT, required: true },
		edit: { type: fieldType.SPECIAL_TEXT, required: true }
	}
};

export default { entity, entityFields };
