const JwtStratergy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;

const config=require('../config/database');
const User=require('../models/user');

module.exports=function(passport){
    let opts={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStratergy(opts, (jwt_payload, done)=> {
        User.getUserById(jwt_payload._doc._id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
                // or you could create a new account 
            }
        });
    }));
};