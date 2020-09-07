
const mysql = require('mysql');
const connection = require('../dbconnection.js');
const condition="";

/**
 * Affiche toutes les stations
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getAllDepense = (req, res, next) => {

  console.dir(req.body['periode'][0]);

    const bd = mysql.createConnection(connection.bd);
  
    bd.connect((error)=>{
      !error?console.log('connecter'):console.log(JSON.stringify(error));
    });
  
    bd.query(`SELECT * FROM depense WHERE date_saisie BETWEEN '${translateDate(req.body['periode'][0])}' AND '${translateDate(req.body['periode'][1])}' ${condition}`, function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({ 'depense': results});
    });
  
    bd.end();  
}


function  translateDate(dateD){
  return dateD.slice(0,4) +'-'+dateD.slice(5,7)+'-'+dateD.slice(8,10);
}


function addCondition(param){
  let tab=[];
  for (const key in param) {

      switch (key.toUpperCase()) {
        case 'STATION':
          tab.push(`qte_ouvert ='${param[key]}'`);
          break;
        case 'USER':
          tab.push(`qte_livre ='${param[key]}'`);
          break;
        case 'TYPE_DEPENSE':
          tab.push(`montant ='${param[key]}'`);
          break;
        case 'MONTANT':
          tab.push(`qte_jauge ='${param[key]}'`);
          break;
      }
  }
  
  return tab.join('AND');
}
