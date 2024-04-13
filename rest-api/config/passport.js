const passport = require("passport");
const { cookieExtractor } = require("../utils/cookieExtractor");
const JwtStrategy = require("passport-jwt").Strategy;
const fs = require("fs").promises;

require("dotenv").config();

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const data = await fs.readFile("./data/users.json", "utf8");
      const users = JSON.parse(data);
      const user = users.find((u) => u.email === jwt_payload.sub);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "User not found" });
      }
    } catch (error) {
      return done(error);
    }
  })
);
