module.exports = {
    INSERT : "INSERT INTO CustomerGroup VALUES(?,?,?)",
    SELECT : "SELECT * FROM CustomerGroup WHERE CustomerId=?",
    INSERTGROUPBRANCH : "INSERT INTO GroupBranches VALUES(?,?,?)",
    DELETEGROUPBRANCH : "DELETE FROM GroupBranches WHERE GroupId = ? AND BranchId = ?",
    DELETEALLBRANCH : "DELETE FROM GroupBranches WHERE GroupId = ?",
    DELETEGROUP : "DELETE FROM CustomerGroup WHERE ID = ?",
    GROUPNAMEEXIST : "SELECT COUNT('*') AS C FROM CustomerGroup WHERE LOWER(Name) = LOWER(?) AND CustomerId = ?",
    GROUPNAMEEXISTUPDATE : "SELECT COUNT('*') AS C FROM CustomerGroup WHERE LOWER(Name) = LOWER(?) AND ID <> ? AND CustomerId = ?"
};