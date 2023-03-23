import EducationSitesExtras from './entity.js';
import { generateBasicControllersFunctions } from '../../../controllersBasicFunctions.js';

const { create, update, remove, search, searchCount, searchExport, getHistoryLog, getEntityDetails, getDisplayList } = generateBasicControllersFunctions(EducationSitesExtras);

export default { create, update, remove, search, searchCount, searchExport, getEntityDetails, getHistoryLog, getDisplayList };
