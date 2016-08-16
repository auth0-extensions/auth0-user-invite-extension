import users from '../../lib/users';

function getUsersHandler(req, res, next) {
  let options = {
    auth0: req.auth0,
    filter: req.query.filter,
    perPage: req.query.per_page,
    page: req.query.page
  };
  users.getUsers(options, function onGetUsers(err, result) {
    if (err) {
      return next(err);
    }
    return res.json(result);
  });
}

function createUserHandler(req, res, next) {
  let options = {
    auth0: req.auth0,
    connection: req.body.user.connection,
    email: req.body.user.email,
    host: req.get('host')
  };
  users.createUser(options, function onCreateUser(err, result) {
    if (err) {
      return next(err);
    }
    return res.json(result);
  });
}

function validateUserTokenHandler(req, res, next) {
  let options = {
    auth0: req.auth0,
    token: req.query.token
  };
  users.validateUserToken(options, function onValidateToken(err, result) {
    if (err) {
      return next(err);
    }
    return res.json(result);
  });
}

module.exports = {
  getUsersHandler: getUsersHandler,
  createUserHandler: createUserHandler,
  validateUserTokenHandler: validateUserTokenHandler
};
