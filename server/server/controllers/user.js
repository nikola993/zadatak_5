const config = require('../config/jwtConfig.json');
const jwt = require('jsonwebtoken');
const User = require('../models').Users;

module.exports = {
    create(req, res) {
        return User
            .create({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName, 
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).json({ message: 'Username already taken' }));
    },
    destroy(req, res) {
        return User
            .destroy({
                where: {
                    username: req.params.username,
                },
            })
            .then(user => res.status(201).send())
            .catch(error => res.status(400).send(error));
    },
    authenticate(req, res) {
        User.findAll({
            raw: true,
            attributes: ['id', 'username', 'firstName', 'lastName'],
            where: {
                username: req.body.username,
                password: req.body.password,
            },
        })
            .then(user => {
                const token = jwt.sign({ userId: user[0].id }, config.secret);
                res.status(201).send({
                    user,
                    token,
                });
            })
            .catch(error => res.status(400).json({ message: 'Username or password is incorrect' }));
    },
    updatePassword (req, res) {
        User.update({
            password: req.body.password,
        }, {
            where: {
                username: req.params.username,
            },  
        })
            .then(user => res.status(201).send())
            .catch(error => res.status(400).send(error));
    },
};
