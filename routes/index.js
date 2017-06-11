var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var btoa = require('btoa');
var bcrypt = require('bcrypt-nodejs');
var serverInfo = require('../config/config');
var array = [];
var request = require('request');
var newsApiKey = serverInfo.newApiKey;
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


router.get('/user', (req, res)=>{
  if(req.query.msg == 'loggedin'){
      bestPlayerIds = req.session.favPlayer;
      randomGoodPlayer = bestPlayerIds[Math.floor(Math.random()*bestPlayerIds.length)].player_id;
  }else {
    bestPlayerIds = [106, 129, 187, 20, 236, 231, 372, 477, 291, 450, 278, 182, 134, 386];
    randomGoodPlayer = bestPlayerIds[Math.floor(Math.random()*14)];
  }
  var news = [];
  var averagePlayerId = 519;
    var selectQuery = `SELECT photo, team, position, first_name, last_name FROM player_info WHERE (id = ${randomGoodPlayer}) OR (id = ${averagePlayerId});`;
    connection.query(selectQuery, (error, results)=>{
      if(error) throw error;
      var photoUrl = results[0].photo;
      var teamName = results[0].team;
      var position = results[0].position;
      var firstName = results[0].first_name;
      var lastName = results[0].last_name;
      var fullName = firstName + ' ' + lastName;
      var compName = results[1].first_name + ' ' + results[1].last_name;

      var newsUrl = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${fullName}&page=2&sort=newest&api-key=${newsApiKey}`;
      request.get(newsUrl, (err, response, newsData)=>{
        var newsData = JSON.parse(newsData);
        if (err) throw err;
        for (let i = 0; i < newsData.response.docs.length; i ++){
          news.push([newsData.response.docs[i].headline.main, newsData.response.docs[i].web_url]);
        }
      var rankQuery = `SELECT PPGrank, ASSrank, STLrank, REBrank, MINrank, THREErank,total_points, assists, steals, rebounds, minutes, three_points FROM per_game WHERE (id = ${randomGoodPlayer}) OR (id = ${averagePlayerId});`;

        connection.query(rankQuery, (error, results)=> {
          console.log(results[0]);
          var PPGrank = Math.round((results[0].PPGrank/517)*10000)/100;
          var ASSrank = Math.round((results[0].ASSrank/517)*10000)/100;
          var STLrank = Math.round((results[0].STLrank/517)*10000)/100;
          var REBrank = Math.round((results[0].REBrank/517)*10000)/100;
          var MINrank = Math.round((results[0].MINrank/517)*10000)/100;
          var THREErank = Math.round((results[0].THREErank/517)*10000)/100;
          var total_points = results[0].total_points;
          var assists = results[0].assists;
          var steals = results[0].steals;
          var rebounds = results[0].rebounds;
          var minutes = Math.round(results[0].minutes * 100) / 100;
          var three_points = results[0].three_points;

          var compPPGrank = Math.round((results[1].PPGrank/517)*10000)/100;
          var compASSrank = Math.round((results[1].ASSrank/517)*10000)/100;
          var compSTLrank = Math.round((results[1].STLrank/517)*10000)/100;
          var compREBrank = Math.round((results[1].REBrank/517)*10000)/100;
          var compMINrank = Math.round((results[1].MINrank/517)*10000)/100;
          var compTHREErank = Math.round((results[1].THREErank/517)*10000)/100;
          var comptotal_points = results[1].total_points;
          var compassists = results[1].assists;
          var compsteals = results[1].steals;
          var comprebounds = results[1].rebounds;
          var compminutes = Math.round(results[1].minutes * 100) / 100;
          var compthree_points = results[1].three_points;

          array = [];
          var nameQuery = "SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM player_info;";
          connection.query(nameQuery, (error, results)=>{
            if(error) throw error;
              for (let i = 0; i < results.length; i++){
                array.push(results[i].full_name);
              }
              var userFaves = [];
              var faveQuery = `SELECT CONCAT(player_info.first_name, ' ',
                          player_info.last_name)
                          AS player_full_name
                         FROM player_info
                         INNER JOIN fav_player ON player_info.id = fav_player.player_id;`;
            connection.query(faveQuery, (error, results)=> {

              for (let i = 0; i < results.length; i++) { 
                userFaves.push(results[i].player_full_name);
              }
              var sessionInfo = req.session;
              res.render('user-page', {
                photoUrl: photoUrl,
                teamName: teamName,
                position: position,
                fullName: fullName,
                sessionInfo: sessionInfo,
                total_points: total_points,
                assists: assists,
                steals: steals,
                rebounds: rebounds,
                minutes: minutes,
                three_points: three_points,
                PPGrank: PPGrank,
                ASSrank: ASSrank,
                STLrank: STLrank,
                REBrank: REBrank,
                MINrank: MINrank,
                THREErank: THREErank,
                nameArray: array,
                id: randomGoodPlayer,
                userFaves: userFaves,
                news:news,
                compPPGrank: compPPGrank,
                compASSrank: compASSrank,
                compSTLrank: compSTLrank,
                compREBrank: compREBrank,
                compMINrank: compMINrank,
                compTHREErank: compTHREErank,
                comptotal_points: comptotal_points,
                compassists: compassists,
                compsteals: compsteals,
                comprebounds: comprebounds,
                compminutes: compminutes,
                compthree_points: compthree_points,
                compName: compName
              });
            });
          });
        });
      });
    });
  });


/////////////////////


router.post('/user', (req, res)=>{
  var fullName = req.body.search;
  var nameArray = req.body.search.split(' ');
  var compName = req.body.compare;
  var compNameArray = req.body.compare.split(' ');

  var compareId;
  var playerId;



  var news = [];
  var newsUrl = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${fullName}&page=2&sort=newest&api-key=${newsApiKey}`;
  var idQuery = `SELECT id FROM player_info WHERE (first_name = '${nameArray[0]}' AND last_name = '${nameArray[1]}')
  OR (first_name = '${compNameArray[0]}' AND last_name = '${compNameArray[1]}');`;
  request.get(newsUrl, (err, response, newsData)=>{
    var newsData = JSON.parse(newsData);
    if (err) throw err;
    for (let i = 0; i < newsData.response.docs.length; i ++){
      news.push([newsData.response.docs[i].headline.main, newsData.response.docs[i].web_url]);
    }
    // console.log(news);
    connection.query(idQuery,(error, results)=> {
      if (error) throw error;
      playerId = results[0].id;
      compareId = results[1].id;

      // console.log(typeof(playerId));
      var selectQuery = `SELECT photo, team, position FROM player_info WHERE id = ${playerId};`;

        connection.query(selectQuery, (error, results)=>{
          if(error) throw error;
          var photoUrl = results[0].photo;
          var teamName = results[0].team;
          var position = results[0].position;
          
          var rankQuery = `SELECT PPGrank, ASSrank, STLrank, REBrank, MINrank, THREErank, total_points, assists, steals, rebounds, minutes, three_points FROM per_game WHERE (id = ${playerId}) OR (id = ${compareId});`;

          connection.query(rankQuery, (error, results)=> {
            var PPGrank = Math.round((results[0].PPGrank/517)*10000)/100;
            var ASSrank = Math.round((results[0].ASSrank/517)*10000)/100;
            var STLrank = Math.round((results[0].STLrank/517)*10000)/100;
            var REBrank = Math.round((results[0].REBrank/517)*10000)/100;
            var MINrank = Math.round((results[0].MINrank/517)*10000)/100;
            var THREErank = Math.round((results[0].THREErank/517)*10000)/100;
            var total_points = results[0].total_points;
            var assists = results[0].assists;
            var steals = results[0].steals;
            var rebounds = results[0].rebounds;
            var minutes = Math.round(results[0].minutes * 100) / 100;
            var three_points = results[0].three_points;

            var compPPGrank = Math.round((results[1].PPGrank/517)*10000)/100;
            var compASSrank = Math.round((results[1].ASSrank/517)*10000)/100;
            var compSTLrank = Math.round((results[1].STLrank/517)*10000)/100;
            var compREBrank = Math.round((results[1].REBrank/517)*10000)/100;
            var compMINrank = Math.round((results[1].MINrank/517)*10000)/100;
            var compTHREErank = Math.round((results[1].THREErank/517)*10000)/100;
            var comptotal_points = results[1].total_points;
            var compassists = results[1].assists;
            var compsteals = results[1].steals;
            var comprebounds = results[1].rebounds;
            var compminutes = Math.round(results[1].minutes * 100) / 100;
            var compthree_points = results[1].three_points;

              var userFaves = [];
              var faveQuery = `SELECT CONCAT(player_info.first_name, ' ',
                          player_info.last_name)
                          AS player_full_name
                         FROM player_info
                         INNER JOIN fav_player ON player_info.id = fav_player.player_id;`;
              connection.query(faveQuery, (error, results)=> {

                  for (let i = 0; i < results.length; i++) {
                      userFaves.push(results[i].player_full_name);
                  }

            res.render('user-page', {
                photoUrl: photoUrl,
                teamName: teamName,
                position: position,
                fullName: fullName,
                sessionInfo: req.session,
                PPGrank: PPGrank,
                ASSrank: ASSrank,
                STLrank: STLrank,
                REBrank: REBrank,
                MINrank: MINrank,
                THREErank: THREErank,
                nameArray: array,
                total_points: total_points,
                assists: assists,
                steals: steals,
                rebounds: rebounds,
                minutes: minutes,
                three_points: three_points,
                id: playerId,
                news: news,
                compPPGrank: compPPGrank,
                compASSrank: compASSrank,
                compSTLrank: compSTLrank,
                compREBrank: compREBrank,
                compMINrank: compMINrank,
                compTHREErank: compTHREErank,
                comptotal_points: comptotal_points,
                compassists: compassists,
                compsteals: compsteals,
                comprebounds: comprebounds,
                compminutes: compminutes,
                compthree_points: compthree_points,
                compName: compName,
                userFaves: userFaves
            });
            });
          });
        });
      });
    });
  });

  router.post("/signUp", (req, res)=>{

    var message = req.query.msg;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var hash = bcrypt.hashSync(password);
    var selectQuery = "SELECT * FROM users WHERE email = ?;";
    
    connection.query(selectQuery, [email], (error, results)=> {
      if (results.length == 0){
        var insertQuery = "INSERT INTO users(username, password, email) VALUES(?,?,?);";
        connection.query(insertQuery, [username, hash, email], (error, results)=> {
          console.log(username);
          if(error) throw error;
          // req.session.username = results.username;
          req.session.loggedin = true;
          req.session.registered = true;
          res.redirect('/user?msg=registered');
        });
      } else {
        res.redirect('/?msg=existingUser')
      }
    })
  });
    
    router.post('/login', (req, res)=> {
      console.log(req.body)
      var email = req.body.email;
      var password = req.body.password;
      var hash = bcrypt.hashSync(password);
      var selectQuery = "SELECT * FROM users WHERE email = ?;";
      connection.query(selectQuery, [email], (error, results)=> {
        if(error) throw error;
        if (results.length == 1){
            var match = bcrypt.compareSync(password, results[0].password);
            if (match){
              var username = results[0].username;
              var favPlayerIdQuery = `SELECT player_id FROM fav_player WHERE user_email = '${email}';`;
              connection.query(favPlayerIdQuery, (error, results)=>{
                if (error) throw error;
                req.session.email = email;
                req.session.favPlayer = results;
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/user?msg=loggedin');
              });
          } else {
          res.redirect('/?msg=invalid')
          }
        };
      });
    });

module.exports = router;
