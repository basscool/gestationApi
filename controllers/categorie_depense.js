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

exports.createCategorieDepense = (req, res, next) => {

  const bd = mysql.createConnection(connection.bd);

 bd.connect((error)=>{
   !error?console.log('connecter'):console.log(JSON.stringify(error));
 });

 bd.query('INSERT INTO type_depense SET ?', req.body, function (error, results, fields) {
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
exports.getAllCategorieDepense = (req, res, next) => {

  const bd = mysql.createConnection(connection.bd);

    bd.connect((error)=>{
      !error?console.log('connecter'):console.log(JSON.stringify(error));
    });

    bd.query('SELECT * FROM type_depense', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.status(200).json({ 'categorieDepense': results});
    });

    bd.end();

  };


/**
 * selection d'une station
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getOneCategorieDepense = (req, res, next) => {
  const bd = mysql.createConnection(connection.bd);
  var sql = 'SELECT * FROM type_depense WHERE id = ? ';

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  bd.query(sql,[req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'categorieDepense': results});
  });

  bd.end();
};

/**
 * Modification d'une station
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.modifyCategorieDepense = (req, res, next) => {
  const bd = mysql.createConnection(connection.bd);

  const sql= `UPDATE type_depense SET ${matchCarburant(req.body)} WHERE id  =${req.params.id}`;
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

exports.deleteCategorieDepense = (req, res, next) => {
  const bd = mysql.createConnection(connection.bd);

  const sql = `DELETE FROM type_depense  WHERE id =${req.params.id}`;

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
            tab.push(`code ='${param[key]}'`);
            break;
          case 'NAME':
            tab.push(`name ='${param[key]}'`);
            break;
          case 'DATE_CREATION':
            tab.push(`date_creation ='${param[key]}'`);
            break;
        }
    }
    return tab.join(',');
}
