const pg = require('pg');
const port = '3080';
const express = require('express');
const app = express(), bodyParser = require('body-parser');
const pool = new pg.Pool({user: 'postgres', host: 'localhost', database: 'postgres', password: 'postgres', port: 5432});
const Caminho = require('./objeto/caminho');

app.listen(port, () => {
    console.log('server listen on port: ' + port);
})

app.use(bodyParser.json());

app.get('/buscar-lista-aeroportos', async(req, res) => {
    const client = await pool.connect();
    let result = await client.query("select origem " +
        "from path " +
        "group by origem");
    let nomeAeroporto = [];
    if (result != null) {
        result.rows.forEach(r => {
            nomeAeroporto.push(r.origem);
        })
    }
    client.release();
    res.json(nomeAeroporto);
});

app.get('/calcular-distancia', async (req, res) => {
    if (!Object.is(req.body, null)){
        let origem = req.query.aeroportoOrigem;
        let destino = req.query.aeroportoDestino;
        let totalDistancia = 0;
        let conexao = [];
        let final = '';
        let resultado = [];
        let caminhoTemp;
        let distanciaTemp = Infinity;
        conexao = await estrada(origem);
        while (final != destino) {
            caminhoTemp = conexao[0];
            conexao.forEach(p => {
                if (distanciaTemp > (p.distancia)) {
                    distanciaTemp = p.distancia;
                    caminhoTemp = p;
                }
            });
            totalDistancia += distanciaTemp;
            console.log(caminhoTemp);
            final = caminhoTemp.destino;
            resultado.push(caminhoTemp);
            conexao = await estrada(final)
        }
        res.json(resultado);
    }
});

async function estrada(caminho) {
    const client = await pool.connect();
    let result = await client.query("select * from path where origem like" + "'" + caminho + "'");
    let passagem = [];
    if (result != null) {
        result.rows.forEach(temp => {
            passagem.push(new Caminho(temp.origem, temp.distancia, temp.destino));
        })
    }
    client.release();
    return passagem;
}


