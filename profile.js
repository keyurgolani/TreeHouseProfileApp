
//Problem: Simple way to look at a user's badge count and Javascript points.
//Solution: Use node.js to connect to treehouse profile API to get profile information

var https = require("https");


//Print out message
function printMessage(username, badgeCount, points, skill) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in " + skill + ".";
  console.log(message);
}

//Print out error message
function printError(error) {
  console.error(error.message);
}

function get(skill, username) {
  //Connect to API URL (http://teamtreehouse.com/username.json)
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
    var body = "";
    //Read data
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      if(response.statusCode === 200) {
        try {
          //Parse data
          var profile = JSON.parse(body);
          //Print data
          var skillPoints = profile.points[skill];
          if(skillPoints != undefined) {
            printMessage(username, profile.badges.length, skillPoints, skill)
          } else {
            printError({message: "Skill " + skill + " is not a valid skill."});
          }
        } catch(error) {
          //Parse Error
          printError(error);
        }
      } else {
        //Status Code Error
        printError({message: "There was an error getting the profile for " + username + "."});
      }
    });
  });
  //Connection Error
  request.on('error', printError);
}

module.exports.get = get;
