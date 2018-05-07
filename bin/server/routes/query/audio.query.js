var exports = module.exports = {};

exports.INSERT_AUDIO = `INSERT INTO PlayList VALUES(?,?,?,?,?,?,?,?)`;

exports.SELECT_PLAYLIST_BY_BRANCHID = `SELECT * FROM PlayList WHERE BranchId = ? ORDER BY Id desc LIMIT 1`;