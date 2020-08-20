//Chamando bibliotecas
//Biblioteca de leitura e escrita
const fs = require('fs');
//Criando stream de leitura
const stream = fs.createReadStream("./breweries.csv");
// requisitando a bib do csv-parser para leitura mais eficiente
const csvParser = require('csv-parser') 
//Requisitando a bib do csv-writer para escrever no nosso novo csv de saída
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

//Tratamento dos dados da tabela
let conteudo = [];//Variavel do tipo array que vai receber o conteudo
stream.pipe(csvParser()).on("data", (dados) => {
    conteudo.push({
        id: Number(dados.id),
        name: (dados.name).trim().replace(/[`']/g, ''),
        city: (dados.city).trim().replace(/['`]/g, ''),
        state: (dados.state).trim().replace(/[`']/g, '')
    });
})

//Ouvidor de evento que vai atuar quando a leitura stream terminar
stream.on('end', () => {
    const csvWriter = createCsvWriter({
        path: 'breweriesOut.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'name', title: 'nome_da_cervejaria'},
            {id: 'city', title: 'cidade'},
            {id: 'state', title: 'estado'},
        ]
    })
//Criando o arquivo csv
    csvWriter.writeRecords(conteudo)
})


