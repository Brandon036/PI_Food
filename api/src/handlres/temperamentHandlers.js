const { Temperament } = require('../db');
const axios = require('axios');
const { MY_API_KEY } = process.env;

const getAllTemperaments = async (req, res) => {
  try {
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`);
    const temperaments = temperamentsApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(async (el) => {
      let i = el.trim();
      await Temperament.findOrCreate({
        where: { name: i }
      });
    });

    const allTemp = await Temperament.findAll();
    res.send(allTemp);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllTemperaments,
};
