module.exports = {
    INSERT: `INSERT INTO CurrentUsers VALUES (?,?,?,?)`,
    DELETE: `DELETE FROM CurrentUsers WHERE UserId = ?`,
    USEREXIT: `SELECT * FROM CurrentUsers WHERE UserId= ?`,
    CUSTOMERS: `SELECT CustomerId FROM CurrentUsers`,
    BRANCHES: `SELECT BranchId FROM CurrentUsers WHERE CustomerId = ?`
}