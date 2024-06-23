const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const user_functions = require('../data/user_functions');
const { ObjectId } = require('mongodb'); // Import ObjectId

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true
},
  async function (req, accessToken, refreshToken, profile, done) {
    try {
      // Correctly use email to find the user
      let user = await user_functions.getUserByEmail({ email: profile.email });

      if (!user) {
        user = await user_functions.createUserGoogle({
          username: profile.displayName,
          email: profile.email,
          googleId: profile.id
        });
        console.log("New User Created:", user.id, user.googleId);
      } else {
        console.log("User already exists:", user._id);
      }
      return done(null, user);
    } catch (error) {
      console.error("Error in authentication:", error);
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Fetch user from MongoDB using id
    const user = await user_functions.getUserById({ id: new ObjectId(id) }); // Use new ObjectId(id)
    done(null, user);
  } catch (error) {
    done(error);
  }
});