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

this.estrada = async function (final) {
    return [];
}
app.post('/calcular-distancia', async (req, res) => {
    if (!Object.is(req.body, null)){
        console.log('chegou aqui');
        console.log('body origem: ' + req.body.origem);
        console.log('body destino: ' + req.body.destino);
        let origem = req.body.origem;
        let destino = req.body.destino;
        let totalDistancia = 0;
        let conexao = [];
        let final = '';
        let resultado = [];
        let caminhoTemp;
        let distanciaTemp = Infinity;
        conexao = await this.estrada(origem);
        while (final != destino) {
            console.log('conexao: ' + conexao[0]);
            caminhoTemp = conexao[0];
            console.log('caminho temp: ' + caminhoTemp);
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
            conexao = await this.estrada(final)
        }
        return resultado;
    }
});

module.exports = {
    estrada: async function(caminho){
        console.log('entrou query ' + caminho);
        const client = await pool.connect();
        let result = await client.query("select * from path where origem like" + "'" + caminho + "'");
        let passagem = [];
        if (result != null) {
            result.rows.forEach(temp => {
                console.log('temp: ' + temp.origem);
                passagem.push(new Caminho(temp.origem, temp.distancia, temp.destino));
            })
        }
        client.release();
        return passagem;
    }
}

