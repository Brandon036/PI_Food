const { Router } = require('express');
const temperamentController = require('../controllers/temperamentController');

const router = Router();

router.get('/', temperamentController.getAllTemperaments);

module.exports = router;
/*const { Router } = require('express');
const { Temperament } = require('../db');
const axios = require('axios');

const router = Router();

//este controlador realiza una solicitud GET a una API externa para obtener una lista de temperamentos de perros. 
//Luego, procesa los datos y crea o busca los temperamentos en la base de datos.
// Finalmente, devuelve una respuesta con todos los temperamentos encontrados en la base de datos.
router.get('/', async (req, res) => {
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const temperaments = temperamentsApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(el => {
        let i = el.trim();
        Temperament.findOrCreate({
            where: { name: i }
        });
    });

    const allTemp = await Temperament.findAll();
    res.send(allTemp);
});

module.exports = router;*/
