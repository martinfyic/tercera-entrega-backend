import passport from 'passport';
import { Strategy } from 'passport-local';
import userModel from '../schemas/userSchema.js';
import { isValidPassword } from '../utils/bcrypt.js';

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	userModel.findById(id, (err, user) => {
		done(err, user);
	});
});

export const strategyLogin = new Strategy(
	{
		passwordField: 'password',
		usernameField: 'email',
	},
	async (email, password, done) => {
		const user = await userModel.findOne({ email });
		if (!user) {
			return done(null, false, { message: 'Not user found' });
		}
		if (!isValidPassword(user, password)) {
			return done(null, false, { message: 'Not user found' });
		}
		return done(null, user);
	}
);
