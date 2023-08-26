const { Dog, Temperament } = require('../db');

const getAllDogs = async (req, res) => {
  try {
    const allDogs = await getAllDogsFromDb();
    res.status(200).json(allDogs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getDogById = async (req, res) => {
  try {
    const { idRaza } = req.params;
    const dog = await Dog.findByPk(idRaza, {
      include: Temperament,
    });
    if (dog) {
      res.status(200).json(dog);
    } else {
      res.status(404).send('Dog not found in the Data');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const createDog = async (req, res) => {
  try {
    const {
      name,
      height,
      weight,
      life_span,
      temperaments,
      image,
    } = req.body;

    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image: image || 'https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg',
    });

    const associatedTemperaments = await Temperament.findAll({
      where: { name: temperaments },
    });

    await newDog.addTemperament(associatedTemperaments);

    res.status(200).send('Dog created successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getAllDogsFromDb = async () => {
  try {
    const dogs = await Dog.findAll({
      include: Temperament,
    });
    return dogs;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllDogs,
  getDogById,
  createDog,
};
