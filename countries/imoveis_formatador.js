const fs = require('fs');
//criando arquivo de leitura
const stream = fs.createReadStream('./houses.csv')
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const chalk = require('chalk');

//Tratamento e leitura dos dados
let conteudo = [];
//Realizando leitura e ajuste com o pipe e o csv-parser
console.log(chalk.greenBright('Iniciando leitura dos arquivos...'))
stream.pipe(csvParser()).on('data', (dadosHouse) => {
    conteudo.push({
        id: conteudo.length + 1,
        city: dadosHouse['city'].trim(),
        area: Number(dadosHouse['area']),
        rooms: Number(dadosHouse['rooms']),
        bathroom: Number(dadosHouse['bathroom']),
        'parking spaces': Number(dadosHouse['parking spaces']),
        floor: dadosHouse['floor'],
        animal: Boolean(dadosHouse['animal']),
        furniture: Boolean(dadosHouse['furniture']),
        hoa: Number(dadosHouse['hoa'])*100,
        'rent amount': Number(dadosHouse['rent amount'])*100,
        'property tax': Number(dadosHouse['property tax'])*100,
        'fire insurance': Number(dadosHouse['fire insurance'])*100,
        total: Number(dadosHouse['total'])*100,
    })
})

stream.on('end', () => {
    const csvWriter = createCsvWriter({
        path: 'housesOut.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'city', title: 'cidade'},
            {id: 'area', title: 'area'},
            {id: 'rooms', title: 'quartos'},
            {id: 'bathroom', title: 'banheiros'},
            {id: 'parking spaces', title: 'vagas_de_estacionamento'},
            {id: 'floor', title: 'piso'},
            {id: 'animal', title: 'animais'},
            {id: 'furniture', title: 'moveis'},
            {id: 'hoa', title: 'hoa'},
            {id: 'rent amount', title: 'taxa_de_aluguel'},
            {id: 'property tax', title: 'condominio'},
            {id: 'fire insurance', title: 'seguro_incendio'},
            {id: 'total', title: 'total'},
        ]
});

//Criando o arquivo csv
    csvWriter.writeRecords(conteudo)
    console.log(chalk.blueBright('Arquivo CSV gerado com sucesso!'))
})

            