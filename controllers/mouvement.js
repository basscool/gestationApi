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

exports.createMouvement = (req, res, next) => {

  const bd = mysql.createConnection(connection.bd);

  bd.connect((error)=>{
   !error?console.log('connecter'):console.log(JSON.stringify(error));
 });
console.log('me voici')
 console.dir( req.body)
 
 bd.query('INSERT INTO prelevement SET ?', req.body, function (error, results, fields) {
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
exports.getAllMouvement = (req, res, next) => {

    const bd = mysql.createConnection(connection.bd);
  
    bd.connect((error)=>{
      !error?console.log('connecter'):console.log(JSON.stringify(error));
    });
  
    bd.query('SELECT * FROM prelevement', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.status(200).json({ 'prelevement': results});
    });
  
    bd.end();
  
}


/**
 * selection d'une station
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getOneMouvement = (req, res, next) => {
 
  const bd = mysql.createConnection(connection.bd);
  var sql = 'SELECT * FROM prelevement WHERE id = ? ';

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  bd.query(sql,[req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'mouvement': results});
  });

  bd.end();
};



exports.searchMouvement = (req, res, next) => {
 
  const bd = mysql.createConnection(connection.bd);
  var sql = 'SELECT * FROM prelevement WHERE id_pompe = ? ';
  
  
  
  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  bd.query(sql,[req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'mouvement': results});
  });

  bd.end();
};
/**
 * Modification d'une station
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.modifyMouvement = (req, res, next) => {
    const bd = mysql.createConnection(connection.bd);

  const sql= `UPDATE  prelevement SET ${matchMouvement(req.body)} WHERE id  =${req.params.id}`;

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

exports.deleteMouvement = (req, res, next) => {
  const bd = mysql.createConnection(connection.bd);
 
  const sql = `DELETE FROM prelevement  WHERE id =${req.params.id}`;

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  bd.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message:"Number of records deleted: " + result.affectedRows});
  });
   
  bd.end();
};

function matchMouvement(param){
    let tab=[];
    for (const key in param) {
  
        switch (key.toUpperCase()) {
          case 'QTE_OUVERT':
            tab.push(`qte_ouvert ='${param[key]}'`);
            break;
          case 'QTE_LIVRE':
            tab.push(`qte_livre ='${param[key]}'`);
            break;
          case 'MONTANT':
            tab.push(`montant ='${param[key]}'`);
            break;
          case 'QTE_JAUGE':
            tab.push(`qte_jauge ='${param[key]}'`);
            break;
          case 'MONTANT':
            tab.push(`montant ='${param[key]}'`);
            break;
          case 'ECART':
            tab.push(`ecart ='${param[key]}'`);
            break;
          case 'POMPE_ID':
            tab.push(`pompe_id ='${param[key]}'`);
            break;
        }
    }
    
    return tab.join(',');
}