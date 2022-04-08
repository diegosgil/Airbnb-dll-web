
const { query } = require("express");
const { MongoClient } = require("mongodb");

const uri = process.env.URI_MONGODB;

const client = new MongoClient(uri);

const conectarDB = async () => {
  await client.connect();
  let DB = client.db(process.env.DB_MONGODB)
  return DB;
}
//0.
const consultarDocumentos = async (nombreColeccion, filtro) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  filtro = filtro ? filtro : {}
  return coleccion.find(filtro).limit(parseInt(process.env.DEFAULT_LIMIT_PROPERTIES)).toArray()
}

//1.


//2.
const consultarProp = async (nombreColeccion) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  const sort = {number_of_reviews: -1}

  const projection = {name: 1, beds: 1, number_of_reviews: 1, price: 1}
  const cursor = coleccion.find().project(projection).limit(20).sort(sort);
  //await cursor.forEach(console.dir);  //Me muestra en consola
  return cursor.toArray()
}

//3.
const modificarNumCam = async (numCamas, nombreColeccion) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  const sort = {beds: -1}

  const projection = {name:1, beds:1, number_of_reviews:1, price:1}
  const cursor = coleccion.find().project(projection).limit(parseInt(numCamas)).sort(sort);
  //await cursor.forEach(console.dir);  //Me muestra en consola
  return cursor.toArray()
}




module.exports = { consultarDocumentos, consultarProp, modificarNumCam}