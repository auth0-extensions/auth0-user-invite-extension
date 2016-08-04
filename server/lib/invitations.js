const csv = require('csv');
const each = require('each-async');
const Joi = require('joi');

const inviteUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string()
});

const inviteUsersSchema = Joi.object().keys({
  csv: Joi.string().required()
});

const getInvitationsSchema = Joi.object().keys({
  filter: Joi.string().valid('pending', 'accepted')
});

function inviteUser(payload, callback) {
  Joi.validate(payload, inviteUserSchema, (err, value) => {
    if (err) {
      return callback(err);
    }
    return callback(null, {});
  });
}

function inviteUsers(payload, callback) {
  Joi.validate(payload, inviteUsersSchema, (err, value) => {
    if (err) {
      return callback(err);
    }
    csv.parse(payload.csv, function onParsed(err, records) {
      if (err) {
        return callback(err);
      }
      return each(records, (fields, index, done) => {
        inviteUser({ username: fields[0], email: fields[1] }, done);
      }, callback);
    })
  });
}

function getInvitations(payload, callback) {
  Joi.validate(payload, getInvitationsSchema, (err, value) => {
    if (err) {
      return callback(err);
    }
    const filter = payload.filter;
    console.log('FILTER::: ', filter)

    var fakeData = [
      { username: 'test1', email: 'test1@test.com', status: 'pending' },
      { username: 'test2', email: 'test2@test.com', status: 'accepted' }
    ];

    return callback(null, fakeData.filter((item) => filter === item.status));
  });
}

module.exports = {
  inviteUser: inviteUser,
  inviteUsers: inviteUsers,
  getInvitations: getInvitations
};
