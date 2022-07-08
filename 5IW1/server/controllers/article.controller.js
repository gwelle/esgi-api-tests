const { ValidationError } = require("sequelize");
module.exports = function ArticleController(Article) {
    return {
        cget: async (req, res) => {
            return await Article.findAll({
                where: req.query,
            }).then(articles => {
                res.status(200).json(articles);
            }).catch( () => {   
                res.status(400).json({
                    status: 'error',
                    message: 'Article fetch failed'
                });
            })
        },  

        get: async (req, res) => {
            const article = await Article.findByPk(req.params.id).then(article => {
                return (article) ? res.json(article) : res.sendStatus(404);
            });
        },

        create: async (req, res) => {
           
            return await Article.create(req.body).then(article => {
                res.status(201).json(article); 
            })
            .catch(err => {
                if (err instanceof ValidationError) {
                    res.status(400).json(err.errors);
                } 
                else {
                    res.sendStatus(500);
                    console.error(err);
                }
            });
        },

        update: async (req, res) => {
            return await Article.update(req.body, {
                where: {
                    id: req.params.id,
                },
                returning: true,
            }).then(([nb, [data]]) => {
                if (nb === 1) res.json(data);
                else res.sendStatus(404);
            })
            .catch(err => {
                if (err instanceof ValidationError) {
                    res.status(400).json(err.errors);
                }
                else {
                    res.sendStatus(500);
                    console.error(err);
                }
            });
        },

        delete: async (req, res) => {
            return await Article.destroy({
                where: {
                    id: req.params.id,
                },
            }).then(nb => {
                if (nb) res.sendStatus(204);
                else res.sendStatus(404);
            }).catch(err => {
                res.sendStatus(500);
                console.error(err);
            }
            );
        }
    };
};
