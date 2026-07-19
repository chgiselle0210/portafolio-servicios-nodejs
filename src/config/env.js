const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const environment = process.env.NODE_ENV || 'development';

process.env.NODE_ENV = environment;

const environmentFilePath = path.resolve(
    process.cwd(),
    `.env.${environment}`
);

const legacyEnvironmentFilePath = path.resolve(
    process.cwd(),
    '.env'
);

if (fs.existsSync(environmentFilePath)) {
    dotenv.config({
        path: environmentFilePath,
    });
} else if (
    environment === 'development' &&
    fs.existsSync(legacyEnvironmentFilePath)
) {
    dotenv.config({
        path: legacyEnvironmentFilePath,
    });
}

module.exports = {
    environment,
    environmentFilePath,
};