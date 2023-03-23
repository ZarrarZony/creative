import _ from 'lodash';
import clients from './entity.js';
import { DbHelperQueryService, ComponentsDiscoveryService } from '../../../../services/index.js';
import { generateBasicControllersFunctions } from '../../../controllersBasicFunctions.js';
import { Errors } from '../../../../shared/index.js';

const { NotFound } = Errors;

const { create, update, remove, search, searchCount, searchExport, getHistoryLog, getEntityDetails, getDisplayList } = generateBasicControllersFunctions(clients);

const authenticateClient = async (request, response, next) => {
	const { username, password, educationSite } = request.body;

	const website = await DbHelperQueryService.findOneBy(
		ComponentsDiscoveryService.getAllComponents().educationSitesWebsites.entity,
		{ domain: { mode: 'TEM', value: [educationSite] } },
		null,
		['id']
	);
	if (!website) return next(new NotFound({ message: 'Education site not found' }));

	const client = await DbHelperQueryService.findOneBy(clients, { username: [username], password: [password], educationSite: [website.id] });
	if (!client) return next(new NotFound({ message: 'Client not found' }));

	return next(null, _.omit(client, ['password', 'changeLog', 'educationSite']));
};

export default { create, update, remove, search, searchCount, searchExport, getEntityDetails, getHistoryLog, getDisplayList, authenticateClient };
