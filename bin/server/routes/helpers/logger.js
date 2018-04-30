const path = require('path');
const log4js = require('log4js')

const fileDir = path.join(__dirname, '../../logs');

log4js.configure({
  appenders: { error: {   
            type: 'file',
            filename: fileDir + "/error.log", // specify the path where u want logs folder error.log
            category: 'error',
            maxLogSize: 20480,
            backups: 10
        }, info: {   
            type: "file",
            filename: fileDir + "/info.log", // specify the path where u want logs folder info.log
            category: 'info',
            maxLogSize: 20480,
            backups: 10
        }, debug: {   
            type: 'file',
            filename: fileDir + "/debug.log", // specify the path where u want logs folder debug.log
            category: 'debug',
            maxLogSize: 20480,
            backups: 10
        }
    },
  categories: { default: { appenders: ['error'], level: 'error' },
                error: { appenders: ['error'], level: 'error' },
                info: { appenders: ['info'], level: 'info' },
                debug: { appenders: ['debug'], level: 'debug' } }
});

module.exports = log4js