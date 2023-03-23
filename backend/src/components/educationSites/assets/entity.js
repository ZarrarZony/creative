/* eslint-disable max-len */
import _ from 'lodash';
import seed from './seed.js';
import { dataTypes, BaseEntity } from '../../../../shared/index.js';

class assets extends BaseEntity {
	static getCreateTableQuery = () => ({
		tableName: _.snakeCase(assets.name),
		columns: [{ name: 'name', type: dataTypes.TEXT, required: true }]
	});

	static getDisplayListColumnName = () => 'name';

	static getSeedTableData = (isDevSeed) => (isDevSeed ? seed.getDevSeeds() : seed.getProdSeeds());

	static getFieldsPermissions = () => {
		const { read, write, search } = BaseEntity.getFieldsAccessTypes();
		return {
			...BaseEntity.getFieldsPermissions(),
			name: [read, write, search]
		};
	};

	constructor(assets) {
		super(assets);
		this.name = assets?.name;
	}
}

export default assets;
