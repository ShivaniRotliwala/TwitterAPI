const express         =     require('express')
  , path              =     require('path')
  , passport          =     require('passport')
  , TwitterStrategy   =     require('passport-twitter').Strategy
  , session           =     require('express-session')
  , cookieParser      =     require('cookie-parser')
  , bodyParser        =     require('body-parser')
  , app               =     express();

  passport.use(new TwitterStrategy({
        consumerKey:"VOHNN1hlJ6aYaAKIVda2dguJE",
        consumerSecret:"PH3uQ52C17QANWuBxBZ6aG96JLuNegMAX5zoN8JCBYuvXohSWZ",
        callbackURL:"http://localhost:8003/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, callback)
  {
      return callback(null,profile);
  }));

  app.set("views",path.join(__dirname,"views"));
  app.set("view engine","ejs");
  app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res){
    res.render("index")
});

app.get("/auth/twitter",passport.authenticate("twitter"))
app.get("/twitter/callback",passport.authenticate("twitter",{
    failureRedirect:"/"
}))

app.listen(8003);
//module.exports=app;