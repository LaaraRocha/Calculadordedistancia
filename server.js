const pg = require('pg');
const client = new pg.Client('postgres://postgres:postgres@localhost:5432/postgres');


client.connect(function (err) {
    if (err) throw err;
    client.query('select * from path', function (err, result){
        if (err) throw err;
        console.log(result.rows);
    });

})