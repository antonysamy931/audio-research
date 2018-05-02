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

module.exports = {
    userrepo,
    playrepo,
    addressrepo,
    auditrepo,
    authenticaterepo,
    branchrepo,
    customerrepo,
    customeruserrepo
}