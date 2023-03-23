import _ from "lodash";
import fs from "fs/promises";
import localeCodes from "locale-codes";
import {
  DbHelperQueryService,
  ComponentsDiscoveryService,
} from "../../../services/index.js";
import * as Services from "../../../services/index.js";
import { files, Errors } from "../../../shared/index.js";

const getServicesNames = async (domain) => {
  const { entity } = ComponentsDiscoveryService.components.emailServiceDomains;
  const record = await DbHelperQueryService.findOneBy(entity, {
    domain: { mode: "EQ", value: [domain] },
  });
  if (!record)
    throw new Errors.BadRequest({
      message: `Domain '${domain}' is not available`,
    });

  const { defaultService, services } = record;
  return { defaultService, services };
};

const getLocale = async ({ template, language }) => {
  const filePath = files.getFilePath(
    `/src/components/custom/emailService/templates/${template}/locales`
  );

  // if language was sent as full language name
  if (language?.length !== 2) {
    const result = localeCodes.all.find((locale) =>
      locale.name.includes(language)
    );
    language = result ? result.tag.split("-")[0] : "en";
  }

  // removed

  return { formattedLanguage, locale: JSON.parse(data) };
};

const getServices = async (servicesList) => {
  const { entity } = ComponentsDiscoveryService.components.externalApis;
  const services = await DbHelperQueryService.findBy(entity, {
    serviceName: { mode: "TEM", value: servicesList },
  });

  return services;
};

const triggerEmail = async ({ servicesNames, from, to, htmlTemplate }) => {
  // create an list of services, the default is the first one.
  const servicesList = _([
    servicesNames.defaultService,
    ...servicesNames.services,
  ])
    .filter()
    .uniq()
    .value();

  const servicesRecords = await getServices(servicesList);
  const services = _.map(servicesList, (serviceName) =>
    _.find(servicesRecords, { serviceName })
  );

  let isEmailSent = false;
  for (const service of services) {
    //removed
  }

  return { isEmailSent };
};

const sendEmail = async ({ from, to, template, templateData, language }) => {
  const [, domain] = _.split(from.email, "@");

  const servicesNames = await getServicesNames(domain);
  const htmlTemplate = await createTemplate({
    template,
    templateData,
    language,
  });

  const { isEmailSent } = await triggerEmail({
    servicesNames,
    from,
    to,
    htmlTemplate,
  });

  return {
    isEmailSent,
    template: {
      subject: htmlTemplate.subject,
      content: htmlTemplate.contentNoCustomHtml,
    },
  };
};

export default { sendEmail };
