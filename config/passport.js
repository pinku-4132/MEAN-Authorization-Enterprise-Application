const jwtStratergy=require('passport-jwt').Strategy;
const extractJwt=require('passport-jwt').ExtractJwt;

const config=require('./database');
const User=require('../models/user');

module.exports=function(passport){
    let opts={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function(err, user) {
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