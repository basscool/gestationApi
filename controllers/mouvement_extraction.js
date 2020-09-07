
const mysql = require('mysql');
const connection = require('../dbconnection.js');
let condition="";

/**
 * Affiche toutes les stations
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getAllMouvement = (req, res, next) => {

 
  //  	"periode":"coulibaly"

  if (req.body['periode']!=undefined){
    condition='AND '+addCondition(req.body)

    const bd = mysql.createConnection(connection.bd);
  
    bd.connect((error)=>{
      !error?console.log('connecter'):console.log(JSON.stringify(error));
    });
    
    console.log(req.body['periode'])
    //console.dir(`${translateDate(req.body['periode'][0]) }' AND '${translateDate(req.body['periode'][1])}' ${condition}`)
    bd.query(`SELECT * FROM prelevement WHERE date_prelevement BETWEEN '${translateDate(req.body['periode'][0]) }' AND '${translateDate(req.body['periode'][1])}' ${condition}`, function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({ 'prelevement': results});
    });
  
    bd.end();  

  }else{

    res.status(200).json({ 'erreur': "reseigner la periode"});

  }

   
}

function  translateDate(dateD){
  return dateD.slice(0,4) +'-'+dateD.slice(5,7)+'-'+dateD.slice(8,10);
}


function addCondition(param){
  let tab=[];
  for (const key in param) {

      switch (key.toUpperCase()) {
        case 'POMPE':
          tab.push(`ID_POMPE ='${param[key]}'`);
          break;
        case 'USER':
          tab.push(`ID_USER ='${param[key]}'`);
          break;
       
      }
  }
  
  return tab.join(' AND ');
}



