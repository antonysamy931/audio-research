var exports = module.exports = {};

exports.INSERT_BRANCH = 'INSERT INTO Branch VALUES (?,?,?,?,?,?,?,?,?)';
exports.GET_ALL_BRANCHES = `SELECT ID as BranchId, CustomerId, Name, Description FROM [Branch] WHERE Active = 1`;
exports.GET_CUSTOMER_BRANCHES = `SELECT ID as BranchId, Name, Description FROM [Branch] WHERE Active = 1 AND CustomerId = ?`;
exports.SELECT_Branch_BY_ID = `SELECT B.ID as BranchId, B.CustomerId, B.Name, B.Description, 
                                A.AddressLine1, A.AddressLine2, A.City, A.State
                                FROM [Branch] B JOIN [Address] A
                                ON B.ID = A.BranchId
                                WHERE B.Active = 1 AND B.ID = ?`;
exports.UPDATE_BRANCH = `UPDATE Branch 
                            SET Description = ?, UpdatedBy = ?, UpdatedDate = ?
                            WHERE ID = ?`;
exports.DELETE_BRANCH = `UPDATE Branch 
                            SET Active = ?, UpdatedBy = ?, UpdatedDate = ?
                            WHERE ID = ?`;