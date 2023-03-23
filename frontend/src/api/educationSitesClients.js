import { getSharedApiMethods } from '../../api.js';

const BASE_URL = '/api/clients';

const { create, update, remove, search, searchCount, searchExport, getHistoryLog, getEntityDetails } = getSharedApiMethods(BASE_URL);

export default { create, update, remove, search, searchCount, searchExport, getHistoryLog, getEntityDetails };
