import nodemailer from 'nodemailer';
import { logger } from './index.js';

export const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.NODEMAILER_EMAIL, // generated ethereal user
		pass: process.env.NODEMAILER_PASS, // generated ethereal password
	},
});

transporter.verify().then(() => {
	logger.info('***** 🔥 Ready for send emails *****');
});
