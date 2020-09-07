/**
https://www.w3schools.com/nodejs/nodejs_mysql_where.asp
*/

var mysql = require('mysql');
const connection = require('../dbconnection.js');

/**
 * creation de sation
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

exports.createStation = (req, res, next) => {

  const bd = mysql.createConnection(connection.bd);

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });
  req.body['date_creation'] = new Date().toISOString().slice(0,10)
  bd.query('INSERT INTO station SET ?', req.body, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ message: "enregistre"});
  });

  bd.end();
};

/**
 * selection d'une station
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getOneStation = (req, res, next) => {


  const bd = mysql.createConnection(connection.bd);
  var sql = 'SELECT * FROM station WHERE id = ? ';

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  bd.query(sql,[req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'station': results});
  });

  bd.end();
};

/**
 * Modification d'une station
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.modifyStation = (req, res, next) => {

  const bd = mysql.createConnection(connection.bd);

  const sql= `UPDATE  station SET ${matchStation(req.body)} WHERE id  =${req.params.id}`;
  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

   bd.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message:result.affectedRows + " record(s) updated"});
  });

  bd.end();
};

/**
 * Suppresion d'une station
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

exports.deleteStation = (req, res, next) => {
  const bd = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'dataStation1'
  });

  const sql = `DELETE FROM station  WHERE id =${req.params.id}`;


  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

   bd.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
    res.status(200).json({ message:"Number of records deleted: " + result.affectedRows});
  });

  bd.end();
};

/**
 * Affiche toutes les stations
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getAllStation = (req, res, next) => {

  const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dataStation1'
  });

  connection.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  connection.query('SELECT * FROM station', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.status(200).json({ 'station': results});
  });

  connection.end();

};



function matchStation(param){
  let tab=[];

  for (const key in param) {

      switch (key.toUpperCase()) {
        case 'CODE':
          tab.push(`code ='${param[key]}'`);
          break;
        case 'NOM':
          tab.push(`nom ='${param[key]}'`);
          break;
        case 'DATE_CREATION':
          tab.push(`date_creation ='${param[key]}'`);
          break;
        case 'VILLE':
          tab.push(`ville ='${param[key]}'`);
          break;
        case 'LOCALITE':
          tab.push(`localite ='${param[key]}'`);
          break;
        case 'CONTACT':
          tab.push(`contact ='${param[key]}'`);
          break;
        case 'NBREPUIT':
          tab.push(`nbrePuit ='${param[key]}'`);
          break;
      }
  }
  console.dir(tab.join(","))
  return tab.join(",");
}
