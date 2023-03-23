import _ from 'lodash';
import entity from './entity.js';
import controller from './controller.js';
import permissions from './permissions.js';
import seed from './seed.js';

const componentName = _.camelCase(entity.name);

const publicFunctions = [];

export default { componentName, publicFunctions, entity, seed, controller, permissions };
