const { Router } = require('express');
const dogController = require('../controllers/dogController');

const router = Router();

router.get('/', dogController.getAllDogs);
router.get('/:idRaza', dogController.getDogById);
router.post('/', dogController.createDog);

module.exports = router;


/*const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const { MY_API_KEY } = process.env;
const axios = require('axios');

const router = Router();

//es una función llamada getApiData que realiza una solicitud a una API para obtener datos sobre razas de perros
const getApiData = async () => {
    const urLink = `https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`;
    const apiData = await axios.get(urLink);
    const apiInfo = await apiData.data.map(el => {
        let temperamentArray = [];
        if (el.temperament) {
            temperamentArray = el.temperament.split(", ");
        }

        let heightArray = [];
        if (el.height.metric) {
            heightArray = el.height.metric.split(" - ");
        }

        let weightArray = [];
        if (el.weight.metric) {
            weightArray = el.weight.metric.split(" - ");
        }

        return {
            id: el.id,
            name: el.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: el.life_span,
            image: el.image.url,
        }
    });
    return apiInfo;
}

//esta función realiza una consulta a la base de datos para obtener todos los registros de la tabla Dog, 
//incluyendo el nombre del temperamento asociado a cada perro.
const getFromDb = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
};

//esta función obtiene datos de una API y una base de datos, los combina en un solo arreglo y luego devuelve ese arreglo.
const getAllDogs = async () => {
    const dataFromApi = await getApiData();
    const dataFromDb = await getFromDb();
    const allDataMixed = [...dataFromApi, ...dataFromDb];
    return allDataMixed;
}

// este controlador maneja una solicitud GET en la ruta '/' y devuelve todos los datos de perros o filtra los perros por nombre, 
//dependiendo de si se proporciona el parámetro de consulta name.
router.get('/', async (req, res) => {
    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        dog.length ? res.status(200).send(dog) : res.status(404).send("Dog not found");
    } else {
        res.status(200).send(allDogs);
    }
});

//este controlador maneja una solicitud GET en la ruta '/idRaza' y busca un perro específico en los datos de perros. 
//Si se encuentra el perro, se devuelve en la respuesta con el estado 200 y formato JSON. 
//Si no se encuentra ningún perro, se devuelve un mensaje de error con el estado 404.
router.get('/:idRaza', async (req, res) => {
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();
    const dog = allDogs.filter(el => el.id == idRaza);
    if (dog.length) {
        res.status(200).json(dog);
    } else {
        res.status(404).send("Dog not found in the Data");
    }
});

//este controlador maneja una solicitud POST en la ruta '/' y crea un nuevo perro en la base de datos utilizando los datos proporcionados en el cuerpo de la solicitud. 
//También establece la asociación entre el perro y los temperamentos proporcionados. 
//Finalmente, devuelve una respuesta con el estado 200 y un mensaje indicando el éxito de la creación del perro.
router.post('/', async (req, res) => {
    let {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        temperaments,
        image
    } = req.body

    const fixedHeight = [min_height, max_height];
    const fixedWeight = [min_weight, max_weight];

    let dog = await Dog.create({
        name,
        height: fixedHeight,
        weight: fixedWeight,
        life_span,
        image: image ? image : "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg",
    });

    let associatedTemp = await Temperament.findAll({
        where: { name: temperaments },
    });

    dog.addTemperament(associatedTemp);

    res.status(200).send("Dog created successfully!");
});

module.exports = router;
*/