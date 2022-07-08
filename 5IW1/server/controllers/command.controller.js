const { ValidationError } = require("sequelize");
const Command = require("../models/Command");

module.exports = function CommandController(Command) {
  return {
    cget: async (req, res) => {
      const command = await Command.findAll({
        where: req.query,
      });
      res.json(command);
    },

    get: async (req, res) => {
      const command = await Command.findByPk(req.params.id);
      if (command) res.json(command);
      else res.sendStatus(404);
    },

    create: async (req, res) => {
      try {
        const command = await Command.create(req.body);
        res.status(201).json(command);
      } catch (err) {
        if (err instanceof ValidationError) {
          res.status(400).json(err.errors);
        } else {
          res.sendStatus(500);
          console.error(err);
        }
      }
    },

    update: async (req, res) => {
      try {
        const [nb, [data]] = await Command.update(req.body, {
          where: {
            id: req.params.id,
          },
          returning: true,
        });
        if (nb === 1) res.json(data);
        else res.sendStatus(404);
      } catch (err) {
        if (err instanceof ValidationError) {
          res.status(400).json(err.errors);
        } else {
          res.sendStatus(500);
          console.error(err);
        }
      }
    },

    delete: async (req, res) => {
      try {
        const [nb] = await Command.destroy({
          where: {
            id: req.params.id,
          },
        });
        if (nb) res.sendStatus(204);
        else res.sendStatus(404);
      } catch (err) {
        res.sendStatus(500);
        console.error(err);
      }
    }
  };
};
