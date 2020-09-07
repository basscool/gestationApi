const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const connection = require('../dbconnection.js');

class User{
  constructor(body,id) {
    this._body = body;
    this._id=id;
    this._res=null;
  }
  get body() {
    return this._body;
  }

  set body(value){
    this._body=value;
  }

  get id(){
    return this._id;
  }

  set id(value){
    this._id=value;
  }

  get res(){
    return this._res;
  }

  set res(value){
    this._res=value;
  }

}

const user=new User(null,1);

/**
 * creation d'utilisateur
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.signup = (req, res, next) => {

  const bd =mysql.createConnection(connection.bd);

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  bcrypt.hash("Password1", 10)
  .then(hash => {
    req.body['password']=hash;
    let station=req.body['station_id'];
    let respo= req.body['respo']?req.body['respo']:0;
    const body=req.body;
    const todayDate = new Date().toISOString().slice(0,10)
    delete body.station_id;
    bd.query('INSERT INTO user SET ?', body, function (error, results, fields) {
      if (error) throw error;

    });

    bd.query('SELECT MAX(id) as id FROM user', function (error, results, fields) {
      if (error) throw error;
      let max_id=results[0]['id'];

      const bd2 = mysql.createConnection(connection.bd);;

      bd2.query('INSERT INTO station_user SET ?',
                            {station_id:station,user_id:max_id,respo:respo,date_rattachement:todayDate},
                          function (error, results, fields) {
            if (error) throw error;

            res.status(200).json({ message: "enregistre"});
          });

            bd2.end();

        });

        bd.end();
  })
  .catch(error => res.status(500).json({ error }));
};


/**
 * Affiche toutes les utilisateurs
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getAllUser = (req, res, next) => {

  const bd =mysql.createConnection(connection.bd);

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

 const sql=`SELECT user.id,user.login,user.password,user.nom,user.prenoms,
 user.numero,user.type,user.etat,station_user.station_id,station_user.respo,
 station_user.date_rattachement
 FROM user
 LEFT JOIN station_user ON user.id = station_user.user_id `
 bd.query(sql, function (error, results, fields) {
    if (error) throw error;

    res.status(200).json({ 'user': results});
  });

  bd.end();
};

/**
 * selection d'un utilisateur
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getOneUser = (req, res, next) => {
  const bd =mysql.createConnection(connection.bd);
  const sql = `
  SELECT user.id,user.login,user.nom,user.prenoms,user.numero,user.type,user.etat,station_user.station_id
 FROM user
      LEFT JOIN station_user ON user.id = station_user.user_id  WHERE user.id = ${req.params.id} `;

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  bd.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'station': results});
  });

  bd.end();
};

/**
 * Modification d'une utilisateur
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.modifyUser = (req, res, next) => {

  user.body=req.body;
  user.id=req.params.id
  user.res=req.res;

  Object.keys(req.body).forEach(key => {
    const value = req.body[key];
    delete req.body[key];
    req.body[key.toUpperCase()] = value;
  });

  if(matchUser(req.body).length>0 && mathStationUser(req.body).length>0){

   if(req.body.hasOwnProperty('PASSWORD')) {

    bcrypt.hash( user.body['PASSWORD'], 10)
    .then(hash => {

      user.body['PASSWORD']=hash

      updateUser(true)

    })

   }else{

    updateUser(true)

   }

  }else if (matchUser(req.body).length>0){

    if(req.body.hasOwnProperty('PASSWORD')) {

      bcrypt.hash( user.body['PASSWORD'], 10)
      .then(hash => {

        user.body['PASSWORD']=hash

        updateUser(false)

      })

     }else{

      updateUser(false)

     }

  }else if(mathStationUser(req.body).length>0){

    updateStationUser()

  }else{
   res.status(200).json({ message: " record(s) updated bad"});
  }

};

exports.login = (req, res, next) => {

  const bd =mysql.createConnection(connection.bd);
  bd.connect((error)=>{
      !error?console.log('connecter'):console.log(JSON.stringify(error));
    });

    const sql = 'SELECT * FROM user WHERE login = ? ';
    bd.query(sql, [req.body.login],function (err, result) {
      if (err) throw err;

      if(result.length==1){

        res.status(200).json({
          userId: result[0].id,
          login:result[0].login,
          sup:result[0].type,
          etat:result[0].etat,
          token: jwt.sign(
              { userId: result[0].login },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
          )
        });

        /*
        bcrypt.compare(req.body.password, result[0].password)
        .then(valid => {
          if (!valid) {
             res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: result[0].login,
            sup:result[0].type,
            etat:result[0].etat,
            token: jwt.sign(
                { userId: result[0].login },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));*/

    }else{
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
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

  var sql = 'SELECT * FROM user WHERE login = ? OR nom = ?';

  connection.bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  connection.bd.query(sql,[req.params.id,req.body.amount], function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'station': results});
  });

  connection.bd.end();
};

/**
 * Suppresion d'un User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

exports.deleteUser = (req, res, next) => {

  const bd =mysql.createConnection(connection.bd);
  const sql = `DELETE FROM user  WHERE id =${req.params.id}`;
  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  bd.query(sql, function (err, result) {
    if (err) throw err;
    const bd =mysql.createConnection(connection.bd);
    const sql = `DELETE FROM station_user  WHERE user_id =${req.params.id}`;
    bd.query(sql, function (err, result) {
      if (err) throw err;
      res.status(200).json({ message:"Number of records deleted: " + result.affectedRows});
    });
    bd.end();

  });

  bd.end();
};

/**
 *
 * @param {*} param
 */

 function mathStationUser(param){
   const {respo,station_id}=param

   let tab=[];
   if(respo!=undefined){
    tab.push(`respo ='${respo}'`);
   }

   if(station_id!=undefined){
    tab.push(`station_id ='${station_id}'`);
   }

  return tab.join(',');
 }

/*
*/

 function matchUser(param){
  let tab=[];

  for (const key in param) {

      switch (key.toUpperCase()) {
        case 'LOGIN':
          tab.push(`login ='${param[key]}'`);
          break;
        case 'PASSWORD':
          tab.push(`password ='${param[key]}'`);
          break;
        case 'DATE_CREATION':
          tab.push(`date_creation ='${param[key]}'`);
          break;
        case 'NOM':
          tab.push(`nom ='${param[key]}'`);
          break;
        case 'PRENOMS':
          tab.push(`prenoms ='${param[key]}'`);
          break;
        case 'NUMERO':
          tab.push(`numero ='${param[key]}'`);
          break;
        case 'EMAIL':
          tab.push(`email ='${param[key]}'`);
          break;
        case 'SUP':
          tab.push(`sup =${param[key]}`);
          break;
        case 'ETAT':
          tab.push(`etat =${param[key]}`);
          break;
        case 'TYPE':
          tab.push(`type =${param[key]}`);
        break;

      }
  }

  return tab.join(',');
}

function updateUser(next=false){
  const bd = mysql.createConnection(connection.bd);

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });
  const sql= `UPDATE  user SET ${matchUser(user.body)} WHERE id  =${user.id}`;

  bd.query(sql, function (error, results, fields) {
    if (error) throw error;
    if(next){
      updateStationUser()
    }else{
      user.res.status(200).json({ message: "enregistre"});
    }
  });

  bd.end();
}

function updateStationUser(){

  const bd = mysql.createConnection(connection.bd);

  bd.connect((error)=>{
    !error?console.log('connecter'):console.log(JSON.stringify(error));
  });

  const sql= `UPDATE  station_user SET ${mathStationUser(user.body)} WHERE id  =${user.id}`;

  bd.query(sql, function (error, results, fields) {
    if (error) throw error;
    user.res.status(200).json({ message: "enregistre"});
  });

  bd.end();
}
