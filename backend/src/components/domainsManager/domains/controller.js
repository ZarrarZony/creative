import _ from 'lodash';
import ms from 'ms';
import entity from './entity.js';
import externalApisEntity from '../../../externalApis/entity.js';
import emailServiceComponentService from '../../emailService/service.js';
import { generateBasicControllersFunctions } from '../../../controllersBasicFunctions.js';
import { DbHelperCommandService, ComponentsDiscoveryService, DbHelperQueryService } from '../../../../services/index.js';
import { Errors } from '../../../../shared/index.js';

const { NotFound } = Errors;

const { remove, search, searchCount, searchExport, getHistoryLog, getEntityDetails, getDisplayList } = generateBasicControllersFunctions(entity);

const create = async (request, _response, next) => {
	const { isPurchased, autoRenew } = request.body;

	if (!isPurchased) request.body.isPurchased = false;
	if (!autoRenew) request.body.autoRenew = false;

	const newEntity = await DbHelperCommandService.insert(entity, request.auth.username, request.body, ['id']);

	next(null, { id: newEntity.id });
};

const update = async (request, _response, next) => {
	if ('autoRenew' in request.body) {
		const { autoRenew, id } = request.body;
		const { domain, registrar } = await DbHelperQueryService.findOneBy(entity, { id: { mode: 'EQ', value: [id] } });
		const { apiService, serviceName } = await getApiService(registrar);
		if (autoRenew && apiService.addAutoRenewal) await apiService.addAutoRenewal(serviceName, domain);
		else if (!autoRenew && apiService.removeAutoRenewal) await apiService.removeAutoRenewal(serviceName, domain);
	}
	const update = await DbHelperCommandService.updateById(entity, request.auth.username, request.body.id, request.body);
	next(null, update);
};

const getRegistrarsCountForDomainManager = (registrarCollection) => {
	const registrarsCount = _.transform(
		registrarCollection,
		(acc, { registrar }) => {
			if (acc[registrar]) acc[registrar] = ++acc[registrar];
			else acc[registrar] = 1;
		},
		{}
	);
	return registrarsCount;
};

const getRegistrarsDisplayList = async (request, response, next) => {
	//removed
};

const purchase = async (request, response, next) => {
	const { id, domain, externalApiServiceName } = request.body;

	const { apiService, serviceName } = await getApiService(externalApiServiceName);
	const purchaseResponse = await apiService.purchaseDomain(serviceName, { domain });
	const purchasedAt = new Date();
	const expiredAt = new Date();
	expiredAt.setFullYear(expiredAt.getFullYear() + 1);
	await DbHelperCommandService.updateById(entity, request.auth.username, id, {
		isPurchased: true,
		purchasedAt,
		expiredAt,
		autoRenew: !!purchaseResponse.autoRenew
	});

	next(null);
};

const getZoneByDomainId = async (id) => {
	const { entity } = ComponentsDiscoveryService.components.domainsManagerZones;
	const zone = await DbHelperQueryService.findOneBy(entity, { domain: { mode: 'EQ', value: [id] } });

	return zone;
};

const getNameservers = async (request, response, next) => {
	const { id, domain, externalApiServiceName } = request.body;

	const { apiService, serviceName } = await getApiService(externalApiServiceName);
	const registrarNameservers = await apiService.getNameservers(serviceName, { domain });

	const zone = await getZoneByDomainId(id);
	const zoneNameservers = zone?.nameservers || [];

	next(null, { registrarNameservers, zoneNameservers });
};

export default {
	create,
	update,
	remove,
	search,
	searchCount,
	searchExport,
	getEntityDetails,
	getHistoryLog,
	getDisplayList,
	getRegistrarsDisplayList,
	getEducationRegisteredDomains,
	purchase,
	getNameservers,
	updateNameservers
};
