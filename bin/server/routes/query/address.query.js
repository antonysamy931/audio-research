var exports = module.exports = {};

exports.INSERT_ADDRESS = 'INSERT INTO Address VALUES (?,?,?,?,?,?,?)';
exports.UPDATE_CUSTOMER_ADDRESS = `UPDATE Address 
                        SET AddressLine1 = ?, AddressLine2 = ?, City = ?, State = ?
                        WHERE CustomerId = ?`;
exports.UPDATE_BRANCH_ADDRESS = `UPDATE Address 
                        SET AddressLine1 = ?, AddressLine2 = ?, City = ?, State = ?
                        WHERE BranchId = ?`;