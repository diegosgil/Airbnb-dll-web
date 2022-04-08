
// Importar los servicio
const { consultarDocumentos, consultarProp, modificarNumCam} = require('../services/mongodb.service');

//0.
const consultarAirbnb = async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "Airbnb consultados"
        let resultado = await consultarDocumentos(process.env.COLLECTION_AIRBNB)
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando los airbnb."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

//1.

//2.
const consultarPropiedades = async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "Propiedades consultadas"
        let resultado = await consultarProp(process.env.COLLECTION_AIRBNB)
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando las propiedades."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

//3.
const modificarNumeroCamas = async (req, res) => {
    let respuesta = {}
    try {
        let numCamas = req.params["nro_beds"]
        respuesta.ok = true
        respuesta.message = "Número de camas consultadas."
        //Modificar el número de camas
        let informacion = req.body
        let resultado = await modificarNumCam(numCamas, process.env.COLLECTION_AIRBNB)
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando el número de camas."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}


module.exports = {consultarAirbnb, consultarPropiedades, modificarNumeroCamas}