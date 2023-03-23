import _ from 'lodash';
import clients from './entity.js';
import controller from './controller.js';
import permissions from './permissions.js';
import seed from './seed.js';

const componentName = _.camelCase(clients.name);

const publicFunctions = [];

export default { componentName, publicFunctions, entity: clients, seed, controller, permissions };
