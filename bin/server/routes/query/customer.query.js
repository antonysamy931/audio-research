var exports = module.exports = {};

exports.INSERT_CUSTOMER = 'INSERT INTO Customer VALUES (?,?,?,?,?,?,?,?)';
exports.SELECT_ALL_CUSTOMERS = `SELECT ID as CustomerId, Name, Description FROM [Customer] WHERE Active = 1`;
exports.SELECT_CUSTOMER_BY_ID = `SELECT C.ID as CustomerId, C.Name, C.Description, 
                                A.AddressLine1, A.AddressLine2, A.City, A.State
                                FROM [Customer] C JOIN [Address] A
                                ON C.ID = A.CustomerId
                                WHERE C.Active = 1 AND C.ID = ?`;
exports.UPDATE_CUSTOMER = `UPDATE Customer 
                            SET Description = ?, UpdatedBy = ?, UpdatedDate = ?
                            WHERE ID = ?`;
exports.DELETE_CUSTOMER = `UPDATE Customer 
                            SET Active = ?, UpdatedBy = ?, UpdatedDate = ?
                            WHERE ID = ?`;
exports.IS_CUSTOMER_EXIST = `SELECT COUNT(1) AS RowCount FROM [Customer] WHERE lower(Name) = lower(?)`