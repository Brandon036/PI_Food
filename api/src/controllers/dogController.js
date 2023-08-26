const dogHandlers = require('../handlers/dogHandlers');


const getAllDogs = async (req, res) => {
  await dogHandlers.getAllDogs(req, res);
};

const getDogById = async (req, res) => {
  await dogHandlers.getDogById(req, res);
};

const createDog = async (req, res) => {
  await dogHandlers.createDog(req, res);
};

module.exports = {
  getAllDogs,
  getDogById,
  createDog,
}
