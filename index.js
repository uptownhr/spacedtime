#!/usr/bin/env node
const fs = require('fs')
const os = require('os')
const { program } = require('commander');

const homeDir = os.homedir()
const timeSpacedConfigFilePath = homeDir + '/.timespaced'

let data

function saveData (data) {
    const json = JSON.stringify(data)
    fs.writeFileSync(timeSpacedConfigFilePath, json)
}

function loadData () {
    const json = fs.readFileSync(timeSpacedConfigFilePath)

    return JSON.parse(json)
}

function createQNA (question, answer) {
    const qna = {question, answer}
        
    data.push(qna)

    saveData(data)

    return qna
}

const init = function () {
    //check to see that our file exist
    // filename is .timespaced in the user's home directory
    const timeSpacedExists = fs.existsSync(timeSpacedConfigFilePath)

    if (!timeSpacedExists) {
        console.log('timespacedconfig not found, creating ...')
        saveData([])
        console.log('creating timespacedconfig done.')
    }

    data = loadData()

    console.log('data', data)
}

const main = function () {
    console.log(1)
    init()
    console.log(2)
    program.version('0.0.1');

    program
        .command('add <question> [answer]')
        .description('clone a repository into a newly created directory')
        .action((question, answer) => {
            console.log('clone command called', question, answer);
            const qna = createQNA(question, answer)
        });

    program.parse(process.argv);
}


main()