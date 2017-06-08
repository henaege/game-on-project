var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
});
router.get('/user', function(req, res, next) {
  res.render('user-page', { });
});
var btoa = require('btoa');
var mysql = require('mysql');
var serverInfo = require('../config/config');
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
  
  // res.render('index', { title: 'Express' });
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


module.exports = router;

