var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var btoa = require('btoa');
var bcrypt = require('bcrypt-nodejs');
var serverInfo = require('../config/config');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { });
// });




// router.get('/user', function(req, res, next){
//   var array = [];
//   var playerName = req.body.search;
//   var selectQuery = "SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM player_info;";
//   connection.query(selectQuery, (error, results)=>{
//     if(error) throw error;
//     for (let i = 0; i < results.length; i++){
//       array.push(results[i].full_name);
//     }
//     // console.log(array);
//     res.render('user-page', {playersFullName: array, sessionInfo: req.session});
//   });
//   // res.render('user-page', { });
// });


// var APIdata;
/* GET home page. */
router.get('/', function(req, res, next) {

  // APIdata = JSON.parse(APIdata);
  // console.log(APIdata);
  // =======================Getting player Stats from the API database======================
    // var players = APIdata.cumulativeplayerstats.playerstatsentry;
    // // res.json(players);

    // // console.log(players[0].stats.PtsPerGame['#text']);
    // for(let i = 0; i < players.length; i++){
  //      var points = parseFloat(players[i].stats.PtsPerGame['#text']);
  //      var assists = parseFloat(players[i].stats.AstPerGame['#text']);
  //      var steals = parseFloat(players[i].stats.StlPerGame['#text']);
  //      var rebounds = parseFloat(players[i].stats.RebPerGame['#text']);
  //      var minutes = parseFloat(players[i].stats.MinSecondsPerGame['#text']) / 60;
  //      var threePoints = parseFloat(players[i].stats.Fg3PtMadePerGame['#text']);
  //      var insertQuery = `INSERT INTO per_game (total_points, assists, steals, rebounds, minutes, three_points) VALUES ('${points}', '${assists}', '${steals}', '${rebounds}', '${minutes}', '${threePoints}');`;
  //      connection.query(insertQuery, (error, results)=>{
  //        if(error) throw error;
  //      });
  //    }

  // ===================Getting player information from the API database ===============
  // var players = APIdata.cumulativeplayerstats.playerstatsentry;
  // console.log(players[0]);
  // for(let i = 0; i < players.length; i++){
 //     var first_name = players[i].player.FirstName.match(/[a-zA-z]+/);
 //     var last_name = players[i].player.LastName.match(/[a-zA-z]+/);
 //     var team = players[i].team.Name;
 //     var position = players[i].player.Position;
 //     var insertQuery = `INSERT INTO player_info (first_name, last_name, team, position) VALUES ('${first_name}', '${last_name}', '${team}', '${position}');`;
 //     connection.query(insertQuery, (error, results)=>{
 //       if(error) throw error;
 //     });
 //    }
   // =============================End of for loop===========================================

  // for(let i = 0; i < APIdata.playerstatsentry.length; i++){
    // res.render('test', {data: APIdata.cumulativeplayerstats.playerstatsentry[1].player.LastName});
  // =============================== Getting rank for each per_game data =========================
  // var array = [];
  // var playerName = req.body.search;
  // var selectQuery = "SELECT id FROM per_game ORDER BY three_points ASC;";
  // connection.query(selectQuery, (error, results)=>{
  //   if(error) throw error;
  //   for (let i = 0; i < results.length; i++){
  //     array.push(results[i].id);
  //   }
  //   console.log(array);
  //   for (let j = 0; j < array.length; j++){
  //     var rank = j + 1;
  //     var insertQuery = `UPDATE per_game SET THREErank = ${rank} WHERE id = ${parseInt(array[j])};`;
  //     connection.query(insertQuery, (error, results)=>{
  //     if (error) throw error;

  //   });
  //   }
// });
   // ====================================END ======================================================
    res.render('index', {sessionInfo: req.session});


});



// var getData = function(callback) {
//     'use strict';
        
//     const httpTransport = require('https');
//     const responseEncoding = 'utf8';
//     const httpOptions = {
//         hostname: 'www.mysportsfeeds.com',
//         port: '443',
//         path: 'https://www.mysportsfeeds.com/api/feed/pull/nba/2016-regular/cumulative_player_stats.json?playerstats=PTS/G,AST/G,STL/G,REB/G,MIN/G,3PM/G',
//         method: 'GET',
//         headers: {"Authorization":"Basic " + btoa('henaege' + ":" + 'DigitalCrafts')},
//     };
//     httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
//     const request = httpTransport.request(httpOptions, (res) => {
//         let responseBufs = [];
//         let responseStr = '';
        
//         res.on('data', (chunk) => {
//             if (Buffer.isBuffer(chunk)) {
//                 responseBufs.push(chunk);
//             }
//             else {
//                 responseStr = responseStr + chunk;            
//             }
//         }).on('end', () => {
//             responseStr = responseBufs.length > 0 ? 
//                 Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
//             callback(null, res.statusCode, res.headers, responseStr);
//         });
        
//     })
//     .setTimeout(0)
//     .on('error', (error) => {
//         callback(error);
//     });
//     request.write("")
//     request.end();


// }((error, statusCode, headers, body) => {
//     console.log('ERROR:', error); 
//     console.log('STATUS:', statusCode);
//     console.log('HEADERS:', JSON.stringify(headers));
//     // console.log(body);
//     APIdata = JSON.parse(body);

// });

var connection = mysql.createConnection({
    host: serverInfo.host,
    user: serverInfo.username,
    password: serverInfo.password,
    database: serverInfo.database
});
connection.connect();

//////////////////

router.get('/user', (req, res)=>{
  console.log('request');
  bestPlayerIds = [106, 129, 187, 20, 236, 231];
  randomGoodPlayer = bestPlayerIds[Math.floor(Math.random()*6)];
  console.log(randomGoodPlayer);

  var selectQuery = `SELECT photo, team, position, first_name, last_name FROM player_info WHERE id = ${randomGoodPlayer};`;
  connection.query(selectQuery, (error, results)=>{
    if(error) throw error;
    var photoUrl = results[0].photo;
    var teamName = results[0].team;
    var position = results[0].position;
    var firstName = results[0].first_name;
    var lastName = results[0].last_name;
    var fullName = firstName + ' ' + lastName;


        res.render('user-page', {
          photoUrl: photoUrl,
            teamName: teamName,
            position: position,
            fullName: fullName,
            sessionInfo: req.session
            });
        });

});


/////////////////////

router.post('/user', (req, res)=>{
  var fullName = req.body.search;
  var nameArray = req.body.search.split(' ');
  var playerId;
  var idQuery = `SELECT id FROM player_info WHERE first_name = '${nameArray[0]}' AND last_name = '${nameArray[1]}';`;
  connection.query(idQuery,(error, results)=> {
    if (error) throw error;
    playerId = results[0].id;
    // console.log(typeof(playerId));
    var selectQuery = `SELECT photo, team, position FROM player_info WHERE id = ${playerId};`
    connection.query(selectQuery, (error, results)=>{
      if(error) throw error;
      var photoUrl = results[0].photo;
      var teamName = results[0].team;
      var position = results[0].position;
      res.render('user-page', {
          photoUrl: photoUrl, 
          teamName: teamName, 
          position: position,
          fullName: fullName,
          sessionInfo: req.session
        });
    });
  });
});

  router.post("/signUp", (req, res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var hash = bcrypt.hashSync(password);
    var selectQuery = "SELECT * FROM users WHERE username = ?;";
    connection.query(selectQuery, [username], (error, results)=> {
      if (results.length == 0){
        console.log(username);
        var insertQuery = "INSERT INTO users(username, password) VALUES(?,?);";
        connection.query(insertQuery, [username, hash], (error, results)=> {
          if(error) throw error;
          req.session.username = username;
          req.session.loggedin = true;
          res.redirect('/user?msg=registered');
        });
      } else {
        res.redirect('/?msg=existingUser')
      }
    })
  });

module.exports = router;
