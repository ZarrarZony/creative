import _ from 'lodash';
import assets from './entity.js';
import controller from './controller.js';
import permissions from './permissions.js';
import seed from './seed.js';

const componentName = _.camelCase(assets.name);

const publicFunctions = [];

export default { componentName, publicFunctions, entity: assets, seed, controller, permissions };
