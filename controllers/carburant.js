/**
https://www.w3schools.com/nodejs/nodejs_mysql_where.asp
*/
/**
 * CREATE TABLE type_carburant (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    code VARCHAR(30),
    name VARCHAR(70),
    prix int,
    date_creation Date
);
 */

var mysql = require('mysql');
const connection = require('../dbconnection.js');

/**
 * creation de sation
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

exports.createCarburant = (req, res, next) => {

  const bd = mysql.createConnection(connection.bd);
  req.body['date_creation']=  new Date().toISOString().slice(0,10)

  bd.connect((error)=>{
   !error?console.log('connecter'):console.log(JSON.stringify(error));
 });
 
 bd.query('INSERT INTO type_carburant SET ?', req.body, function (error, results, fields) {
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
exports.getAllCarburant = (req, res, next) => {

    const bd = mysql.createConnection(connection.bd);
  
    bd.connect((error)=>{
      !error?console.log('connecter'):console.log(JSON.stringify(error));
    });
  
    bd.query('SELECT * FROM type_carburant', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.status(200).json({ 'carburant': results});
    });
  
    bd.end();
  
  };


/**
 * selection d'une station
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getOneCarburant = (req, res, next) => {
 
  const bd = mysql.createConnection(connection.bd);
  var sql = 'SELECT * FROM type_carburant WHERE id = ? ';

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  bd.query(sql,[req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'carburant': results});
  });

  bd.end();
};

/**
 * Modification d'une station
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.modifyCarburant = (req, res, next) => {
    const bd = mysql.createConnection(connection.bd);

  const sql= `UPDATE  type_carburant SET ${matchCarburant(req.body)} WHERE id  =${req.params.id}`;
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

exports.deleteCarburant = (req, res, next) => {
  const bd = mysql.createConnection(connection.bd);
 
  const sql = `DELETE FROM type_carburant  WHERE id =${req.params.id}`;

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


function matchCarburant(param){
    let tab=[];

    for (const key in param) {
  
        switch (key.toUpperCase()) {
          case 'CODE':
            tab.push(`code ='${param[key]}'`)
            break;
          case 'NAME':
            tab.push(`name ='${param[key]}'`);
            break;
          case 'DATE_CREATION':
            tab.push(`date_creation ='${param[key]}'`);
            break;
          case 'PRIX':
            tab.push(`prix =${param[key]}`);
            break;
          
        }
    }
    return tab.join(',');
}