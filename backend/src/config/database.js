import Firebird from 'node-firebird';

const dbOptions = {
    host: process.env.HOST_DATABASE,
    port: process.env.PORT_DATABASE,
    database: process.env.URL_DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    lowercase_keys: true,
    role: null,
    pageSize: 4096,
    retryConnectionInverval: 1000,
    blobAsText: false,
    encoding: "UTF8"
}

export const executeQuery = (sql, params, callback) => {
    Firebird.attach(dbOptions, function (err, db) {

    if (err) {
        return callback(err, []);
    }

    db.query(sql, params, function (err, result) {

        db.detach();

        if (err) {
            return callback(err, []);
        } else {
            return callback(undefined, result);
        }
    });
});
}

