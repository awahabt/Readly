const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user');
const jwt = require('jsonwebtoken');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/user.phonenumbers.read'], // Request phone number
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("Google Profile:", profile);

                let user = await User.findOne({ email: profile.emails[0].value });

                const phoneNumber = profile.phoneNumbers ? profile.phoneNumbers[0].value : '+0000000000';

                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        phone_no: phoneNumber,
                        permanent_address: "Not Provided"
                    });

                    await user.save();
                }

                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                return done(null, { user, token });
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
