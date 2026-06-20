import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import 'dotenv/config';
import prisma from './prisma/queries.js';
// import dotenv from "dotenv";

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      let user = await prisma.findOrCreate(profile.id, profile.displayName, profile.picture);
      return done(null, user);
    } catch (error) {
      console.error(error);
    }
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.getUserbyId(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
});

export default "auth"

