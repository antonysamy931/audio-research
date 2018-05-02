module.exports = {
    VALID_USER : `SELECT Users.ID AS UserId, Users.Name, Users.Role AS UserRole, CustomerUser.CustomerId, CustomerUser.BranchId  FROM Users LEFT JOIN CustomerUser ON Users.ID = CustomerUser.UserId 
                WHERE Users.UserName = ? AND Users.Password = ? AND Users.Active = 1`
}