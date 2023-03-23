import axios from 'axios';
import config from '../config.js';

const instance = axios.create({
	baseURL: 'https://api.sendgrid.com/v3',
	headers: {
		Authorization: `Bearer ${config.sendgridApiKey}`
	}
});

const sendEmail = async ({ templateId, to, body }) => {
	console.log(config.sendgridApiKey);
	console.log(
		JSON.stringify(
			{
				from: {
					email: '',
					name: ''
				},
				personalizations: [
					{
						to: [
							{
								email: to
							}
						],
						dynamic_template_data: body
					}
				],
				reply_to: {
					email: body.email
				},
				template_id: templateId
			},
			2,
			2
		)
	);
	const { data } = await instance.post('/mail/send', {
		from: {
			email: '',
			name: ''
		},
		personalizations: [
			{
				to: [
					{
						email: to
					}
				],
				dynamic_template_data: body
			}
		],
		reply_to: {
			email: body.email
		},
		template_id: templateId
	});

	return data;
};

const sendContactUsEmail = (to, body) =>
	sendEmail({
		templateId: '',
		to,
		body
	});

export { sendContactUsEmail, sendRefundRequestEmail };
