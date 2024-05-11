import "dotenv/config";
import passport from 'passport';

import {Strategy as GoogleStrategy} from "passport-google-oauth2"

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:4034/api/v1/auth/google/callback",
        passReqToCallback   : true
},
function(request, accessToken, refreshToken, profile, done) {
       console.log("profile", profile)
        return done(null, profile);
}
));

passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(user, done) {
done(null, user);
});

export default passport