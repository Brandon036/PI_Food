const temperamentHandlers = require('../handlers/temperamentHandlers');

const getAllTemperaments = async (req, res) => {
  await temperamentHandlers.getAllTemperaments(req, res);
};

module.exports = {
  getAllTemperaments,
};
