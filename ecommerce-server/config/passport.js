const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User'); // User modelinin yolu düz olduğundan əmin ol

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback", // GitHub-da yazdığın URL
      scope: ['user:email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // GitHub-dan gələn email
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

        if (!email) {
            return done(new Error("GitHub hesabında email tapılmadı"), null);
        }

        // Useri yoxlayırıq
        let user = await User.findOne({ $or: [{ githubId: profile.id }, { email: email }] });

        if (user) {
          // Əgər user varsa, amma githubId yoxdursa, əlavə edirik
          if (!user.githubId) {
              user.githubId = profile.id;
              await user.save();
          }
          return done(null, user);
        }

        // User yoxdursa yaradırıq
        user = await User.create({
          name: profile.displayName || profile.username,
          email: email,
          githubId: profile.id,
          password: "", // Parol yoxdur
          isAdmin: false
        });

        return done(null, user);

      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;