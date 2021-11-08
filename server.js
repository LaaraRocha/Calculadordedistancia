const pg = require('pg');
const pool = new pg.Pool({user: 'postgres', host: 'localhost', database: 'postgres', password: 'postgres', port: 5432});


client.connect(function (err) {
    if (err) throw err;
    client.query('select * from path', function (err, result){
        if (err) throw err;
        console.log(result.rows);
    });

})

export function estrada (){
    client.connect(function (err) {
        if (err) throw err;
        client.query('select * from path', function (err, result){
            if (err) throw err;
            console.log(result.rows);
        });

    })
}



export function buscaCaminho () {
    try {
        const client = pool.connect;
        let result = client.query('select * from path');
        let caminho = [];
        result.forEach(r => {
            caminho.push(r);
        })
        return caminho;
    } catch (err) {

    }
}

