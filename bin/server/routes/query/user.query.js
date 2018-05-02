var exports = module.exports = {};

exports.INSERT_USER = "INSERT INTO Users VALUES (?,?,?,?,?,?,?,?,?,?)";

exports.SELECT_ALL_USER = "SELECT * FROM Users";

exports.SELECT_USER_BY_ID = "SELECT * FROM Users WHERE Id = ?"

exports.SELECT_ALL_CUSTOMER_USER = `SELECT U.ID AS UserId, U.Name, U.Role AS UserRole, CU.CustomerId, CU.BranchId 
                                    FROM [Users] as U INNER JOIN [CustomerUser] AS CU
                                    ON U.ID = CU.UserId WHERE U.Active = 1 `;