
const mysql = require('mysql');
const connection = require('../dbconnection.js');

/**
 * Affiche toutes les stations
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.depense = (req, res, next) => {

    const bd = mysql.createConnection(connection.bd);
  
    bd.connect((error)=>{
      !error?console.log('connecter'):console.log(JSON.stringify(error));
    });
  
    bd.query(`SELECT *, SUM(montant) AS prix_total
    FROM depense
    GROUP BY id_station`,
     function (error, results, fields) {
        if (error) throw error;
         res.status(200).json({ 'depense': results});
     }
    );

bd.end(); 
}

/**
 * 
 * @param {*} dateD 
 */
exports.prelevement = (req, res, next) => {

      const bd = mysql.createConnection(connection.bd);
    
      bd.connect((error)=>{
        !error?console.log('connecter'):console.log(JSON.stringify(error));
      });
    
      bd.query(`SELECT id,ecart,id_pompe, SUM(montant) AS prix_total
                FROM prelevement
                GROUP BY id_pompe`,
                 function (error, results, fields) {
                    if (error) throw error;
                     res.status(200).json({ 'depense': results});
                 }
            );
    
      bd.end();  
  }
