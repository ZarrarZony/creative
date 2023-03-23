import _ from 'lodash';
import service from './service.js';
import { Errors } from '../../../shared/index.js';
import { DbHelperQueryService, ComponentsDiscoveryService } from '../../../services/index.js';

const { BadRequest } = Errors;

const getEmailServicesDisplayList = async (request, response, next) => {
	const externalApisEntity = ComponentsDiscoveryService.components.externalApis.entity;
	const emailServices = await DbHelperQueryService.findBy(externalApisEntity, { apiSettings: { mode: 'EQ', value: { isEmailService: true } } });

	const servicesNames = _.map(emailServices, (item) => ({ text: item.serviceName, value: item.serviceName }));

	next(null, servicesNames);
};

const sendEmail = async (request, response, next) => {
	const { from, to, template, templateData, language } = request.body;

	try {
		const output = await service.sendEmail({ from, to, template, templateData, language });

		next(null, output);
	} catch (err) {
		next(new BadRequest({ message: err.message }));
	}
};

export default { getEmailServicesDisplayList, sendEmail };
