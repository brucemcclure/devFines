// Must install & require both passport and passport-local
// As this process will involve modifing users the UserModel will be required.
const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("../database/models/user_model");


//what is passed in for the "done", is the user we have access to here
// user _.id is used because the user can change their ID but not their user ID.
passport.serializeUser((user, done) => {
    done(null, user._id);
});

//Use the user id to query the DB and bring back the info
passport.deserializeUser(async(id, done) => {
    try {
    const user = await UserModel.findById(id);
    done(null, user);
    } catch (error) {
    return done(error);
    }
});


passport.use(new LocalStrategy({ 
    usernameField: "email"
}, 
    async (email, password, done) => {
        try{
            //looks for a user by their email
            const user = await UserModel.findOne({ email });
            // if the password is able to be verified
            if (user && user.verifyPasswordSync(password)) {
            // return done, pass user to done. First argument is an error. Therefore null
                return done(null, user);
            }
            return done (null, false);
        } catch (error){
        return done(error);
        }
    }
));

module.exports = passport;