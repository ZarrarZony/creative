import { getSurveyQuestions, createSurvey } from '../apis/ccc';

const sendSurvey = async (req, res) => {
	await createSurvey(req.body);
};

const getQuestions = async (req, res) => {
	const { data: questions } = await getSurveyQuestions(req.body);
	return questions;
};

export default {
	sendSurvey,
	getQuestions
};
