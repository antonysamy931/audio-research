var exports = module.exports = {};

exports.INSERT_USER = "INSERT INTO Users VALUES (?,?,?,?,?,?,?,?,?,?)";

exports.SELECT_ALL_USER = "SELECT * FROM Users";

exports.SELECT_USER_BY_ID = `SELECT U.ID, U.Name, U.UserName, U.[Password], U.Role, CU.CustomerId, CU.BranchId FROM [Users] U join [CustomerUser] CU
                            ON U.ID = CU.UserId WHERE U.ID = ?`

exports.SELECT_ALL_CUSTOMER_USER = `SELECT U.ID AS UserId, U.Name, U.Role AS UserRole, CU.CustomerId, CU.BranchId 
                                    FROM [Users] as U INNER JOIN [CustomerUser] AS CU
                                    ON U.ID = CU.UserId WHERE U.Active = 1 `;

exports.SELECT_BRANCH_USERS = `SELECT U.* FROM Users U
                                JOIN [CustomerUser] CU 
                                ON U.ID = CU.UserId
                                WHERE CU.BranchId = ?`;

exports.UPDATE_BRANCH_USER_BY_ID = `UPDATE [Users] 
                                    SET Name = ?, UserName = ?, [Role] = ?, UpdatedBy = ?, UpdatedDate = ?
                                    WHERE ID = ?`;