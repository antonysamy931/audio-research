const express = require('express');
const path = require('path');

const userrepo = require(path.join(__dirname,'./repo/user.repo'));
const playrepo = require(path.join(__dirname,'./repo/playfile.repo'));
const addressrepo = require(path.join(__dirname,'./repo/address.repo'));
const auditrepo = require(path.join(__dirname,'./repo/audit.repo'));
const authenticaterepo = require(path.join(__dirname,'./repo/authenticate.repo'));
const branchrepo = require(path.join(__dirname,'./repo/branch.repo'));
const customerrepo = require(path.join(__dirname,'./repo/customer.repo'));
const customeruserrepo = require(path.join(__dirname,'./repo/customer.user.repo'));
const socketrepo = require(path.join(__dirname,'./repo/socket.current.users.repo'));
const customergrouprepo = require(path.join(__dirname,'./repo/customer.group.repo'));

module.exports = {
    userrepo,
    playrepo,
    addressrepo,
    auditrepo,
    authenticaterepo,
    branchrepo,
    customerrepo,
    customeruserrepo,
    socketrepo,
    customergrouprepo
}

/*customergrouprepo.Insert({Name:"test",CustomerId:"custc47938a0-5112-11e8-88db-2f00136624f8",BranchIds:
["branch360c62d0-5113-11e8-88db-2f00136624f8","branchf3885b60-52b8-11e8-87a2-89c853278f89"]})*/

//customergrouprepo.DeleteBranch({ID:"group28fd0ac0-625e-11e8-9657-d329e01ebe2a",BranchId:"branch360c62d0-5113-11e8-88db-2f00136624f8"})

//customergrouprepo.Delete({ID:"group28fd0ac0-625e-11e8-9657-d329e01ebe2a"})

/*customergrouprepo.GroupNameExistUpdate({Name:"test",GroupId:"groupb36c6cd0-6260-11e8-8c7d-e3f9159f100c"}).then(function(result){
    console.log(result);
})*/