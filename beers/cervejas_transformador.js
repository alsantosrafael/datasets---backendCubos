// Passo 01 Instalar pacotes csv-writer e csv-parser
//Passo 02 Chamar bibliotecas
const fs = require('fs');
const stream = fs.createReadStream("./beers.csv");
const csvParser = require("csv-parser");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


//Passo 03 criar stream de leitura de csv

//Passo 04 Formatar dados csv
let conteudo = [];

//Ativo método pipe, passando como argumento meu csvParser executando(função)
// coloco tudo isso ouvindo o evento 'data' e passo uma callback que recebe
//dadosCervejas
stream.pipe(csvParser()).on('data', (dadosCervejas) => {
    conteudo.push({
        id: Number(dadosCervejas.id),
        abv: Number(dadosCervejas.abv).toFixed(4),
        ibu: Number(dadosCervejas.ibu),
        national_id: Number(dadosCervejas.national_id),
        name: dadosCervejas.name.trim().replace(/['`]/g, ''),
        "style": dadosCervejas["style"].trim(),
        brewery_id: Number(dadosCervejas.brewery_id),
        ounces: Number(dadosCervejas.ounces)
    })
})
//Passo05 escrever no csv novo
stream.on('end', () => {
    const csvWriter = createCsvWriter({
        path: 'cervejasOut.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'abv', title: 'abv'},
            {id: 'ibu', title: 'ibu'},
            {id: 'national_id', title: 'id_nacional'},
            {id: 'name', title: 'nome'},
            {id: 'style', title: 'estilo'},
            {id: 'brewery_id', title: 'id_cervejaria'},
            {id: 'ounces', title: 'peso_oncas'}
        ]
    });
    //Escrevendo arquivo
    csvWriter.writeRecords(conteudo);
})
