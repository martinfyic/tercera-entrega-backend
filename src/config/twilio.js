import twilio from 'twilio';
import { logger } from './index.js';

const accountSid = process.env.TWILIO_ACOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export const sendWhatsapp = async (userPhone, OrderNum) => {
	try {
		await client.messages.create({
			body: `Su pedido Nro: *${OrderNum}* fue recibido 📦`,
			from: process.env.TWILIO_PHONE,
			to: userPhone,
		});
	} catch (error) {
		logger.error(error);
	}
};
