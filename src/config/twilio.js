import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export const sendWhatsapp = async (userPhone, OrderNum) => {
	try {
		const message = await client.messages.create({
			body: `Su pedido Nro: *${OrderNum}* fue recibido 📦`,
			from: process.env.TWILIO_PHONE,
			to: userPhone,
		});
		console.log(message);
	} catch (error) {
		console.log(error);
	}
};
