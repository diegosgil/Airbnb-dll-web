const express = require('express')
const router = express.Router()

const airbnbCtr = require("../controllers/airbnb.controller")

const vs = "/api/version1"

//0.
router.get(vs + "/airbnb/all-properties", airbnbCtr.consultarAirbnb)

//1.


//2.
router.get(vs + "/airbnb/reviews", airbnbCtr.consultarPropiedades)

//3.
router.get(vs + "/airbnb/beds/:nro_beds", airbnbCtr.modificarNumeroCamas)
module.exports = router




