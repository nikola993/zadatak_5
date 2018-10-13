const userController = require('../controllers').user;

module.exports = (app) => {
    app.post('/api/user/registration', userController.create);
    app.post('/api/user/login', userController.authenticate);
    app.post('/api/user/passwordchange/:username', userController.updatePassword);
    app.delete('/api/user/removeAccaunt/:username', userController.destroy);
};