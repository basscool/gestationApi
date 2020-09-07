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

exports.createPompe = (req, res, next) => {

  const bd = mysql.createConnection(connection.bd);

 bd.connect((error)=>{
   !error?console.log('connecter'):console.log(JSON.stringify(error));
 });

 bd.query('INSERT INTO pompe SET ?', req.body, function (error, results, fields) {
   if (error) throw error;
   res.status(200).json({ message: "enregistre"});
 });

 bd.end();
};

/**
 * Affiche toutes les stations
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getAllPompe = (req, res, next) => {

  const bd = mysql.createConnection(connection.bd);

    bd.connect((error)=>{
      !error?console.log('connecter'):console.log(JSON.stringify(error));
    });

    bd.query('SELECT * FROM pompe', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.status(200).json({ 'pompe': results});
    });

    bd.end();

  };


/**
 * selection d'une station
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getOnePompe = (req, res, next) => {
  const bd = mysql.createConnection(connection.bd);
  var sql = 'SELECT * FROM pompe WHERE id = ? ';

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  bd.query(sql,[req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'pompe': results});
  });

  bd.end();
};

exports.searchPompe = (req, res, next) => {

  const bd = mysql.createConnection(connection.bd);
  var sql = 'SELECT * FROM pompe WHERE id_station = ? ';

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  bd.query(sql,[req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'pompe': results});
  });

  bd.end();
};

/**
 * Modification d'une station
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.modifyPompe = (req, res, next) => {
  const bd = mysql.createConnection(connection.bd);

  const sql= `UPDATE pompe SET ${matchPompe(req.body)} WHERE id  =${req.params.id}`;
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

exports.deletePompe = (req, res, next) => {
  const bd = mysql.createConnection(connection.bd);

  const sql = `DELETE FROM pompe  WHERE id =${req.params.id}`;

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


function matchPompe(param){

    
    let tab=[];

    for (const key in param) {

        switch (key.toUpperCase()) {
          case 'CODE':
            tab.push(`code ='${param[key]}'`);
            break;
          case 'NAME':
            tab.push(`name ='${param[key]}'`);
            break;
          case 'DATE_CREATION':
            tab.push(`date_creation ='${param[key]}'`);
            break;
          case 'ID_STATION':
            tab.push(`id_station ='${param[key]}'`);
            break;
          case 'ID_CARBURANT':
            tab.push(`id_carburant ='${param[key]}'`);
            
            break;
        }
    }
    return tab.join(",");
}
