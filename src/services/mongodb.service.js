
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
/**
 * 
 * @param {*} nombreColeccion 
 * @param {*} filtro 
 * @returns Documentos consultados
 */
const consultarDocumentos = async (nombreColeccion, filtro) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  filtro = filtro ? filtro : {}
  return coleccion.find(filtro).limit(parseInt(process.env.DEFAULT_LIMIT_PROPERTIES)).toArray()
}

//1.
/**
 * 
 * @param {String} nombreColeccion 
 * @returns Los diferentes tipos de propiedades que existen sin repeticion.
 */
const consTipoTodasProp = async (nombreColeccion) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)

  return coleccion.distinct('property_type')

  //let projection = {_id: 1}
  
  ////const cursor = coleccion.find().project(sort).limit(parseInt(process.env.DEFAULT_LIMIT_PROPERTIES))
  //.sort(sort)
  ////return cursor.distinct.toArray()

  //let coleccion = db.collection(nombreColeccion).aggregate(datos)
  //return coleccion.limit(parseInt(process.env.DEFAULT_LIMIT_PROPERTIES)).toArray()
}

/**
 const consTipoTodasProp = async (nombreColeccion) => {
  let db = await conectarDB()
  let pipeline = [{$group: {propiedad: '$property_type'}}]
  let coleccion = db.collection(nombreColeccion).aggregate(pipeline)
  return coleccion.limit(parseInt(process.env.DEFAULT_LIMIT_PROPERTIES)).toArray()
 */

//2.
/**
 * 
 * @param {String} nombreColeccion 
 * @returns La consulta de las 20 propiedades de airbnb con mayor numero de reseñas
 */ 
const consultarProp = async (nombreColeccion) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  const sort = {number_of_reviews: -1}
  let projection = {name: 1, beds: 1, number_of_reviews: 1, price: 1}
  const cursor = coleccion.find().project(projection).limit(20).sort(sort);
  //await cursor.forEach(console.dir);  //Me muestra en consola
  return cursor.toArray()
}

//3.
/**
 * 
 * @param {String} nombreColeccion 
 * @param {Param} numCamas 
 * @returns El numero de propiedades que tienen mayor numero de camas
 */
const modificarNumCam = async (nombreColeccion, numCamas) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  const sort = {beds: -1}
  const projection = {_id:0, name:1, beds:1, number_of_reviews:1, price:1}
  const cursor = coleccion.find().project(projection).limit(parseInt(numCamas)).sort(sort);
  return cursor.toArray()
}

module.exports = { consultarDocumentos, consTipoTodasProp, consultarProp, modificarNumCam }