var exports = module.exports = {};

exports.INSERT_USER = "INSERT INTO Users VALUES (?,?,?,?,?,?,?,?,?,?)";

exports.SELECT_ALL_USER = "SELECT * FROM Users";

exports.SELECT_USER_BY_ID = "SELECT * FROM Users WHERE Id = ?"