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

exports.createDepense = (req, res, next) => {

  const bd = mysql.createConnection(connection.bd);

  bd.connect((error)=>{
   !error?console.log('connecter'):console.log(JSON.stringify(error));
 });
 
 bd.query('INSERT INTO depense SET ?', req.body, function (error, results, fields) {
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
exports.getAllDepense = (req, res, next) => {

  const bd = mysql.createConnection(connection.bd);
  
  bd.connect((error)=>{
      !error?console.log('connecter'):console.log(JSON.stringify(error));
    });
  
    bd.query('SELECT * FROM depense', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.status(200).json({ 'depense': results});
    });
  
    bd.end();
  
  };


/**
 * selection d'une station
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getOneDepense = (req, res, next) => {
 
  const bd = mysql.createConnection(connection.bd);
  var sql = 'SELECT * FROM depense WHERE id = ? ';

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  bd.query(sql,[req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'depense': results});
  });

  bd.end();
};

/**
 * Modification d'une station
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.modifyDepense = (req, res, next) => {
  const bd = mysql.createConnection(connection.bd);

  const sql= `UPDATE  depense SET ${matchDepense(req.body)} WHERE id  =${req.params.id}`;

  console.log(sql)
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

exports.deleteDepense = (req, res, next) => {
  const bd = mysql.createConnection(connection.bd);
 
  const sql = `DELETE FROM depense  WHERE id =${req.params.id}`;

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


function matchDepense(param){
   
    let tab=[];

    for (const key in param) {
  
        switch (key.toUpperCase()) {
          case 'MONTANT':
            tab.push(`MONTANT ='${param[key]}'`);
            break;
          case 'DESCRIPTION':
            tab.push(`DESCRIPTION ='${param[key]}'`);
            break;
          case 'DATE_SAISIE':
            tab.push(`montant ='${param[key]}'`);
            break;
          case 'STATION_ID':
            tab.push(`station_id ='${param[key]}'`);
            break;
          case 'TYPE_DEPENSE':
            tab.push(`type_depense ='${param[key]}'`);
            break;
          
        }
    }
    
    return tab.join(",");
}
