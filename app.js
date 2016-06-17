var profile = require("./profile");
var skill = process.argv.slice(2)[0];
var users = process.argv.slice(3);
users.forEach(function(user) {
  profile.get(skill, user);
});
