#!/usr/bin/env node
const fs = require('fs')
const os = require('os')

const fibonacci = require('fibonacci')
const moment = require('moment')

const { program } = require('commander');
const promptly = require('promptly')

const homeDir = os.homedir()
const spacedTimeConfigFilePath = homeDir + '/.spacedTime'

let data

function saveData(data) {
    const json = JSON.stringify(data)
    fs.writeFileSync(spacedTimeConfigFilePath, json)
}

function loadData() {
    const json = fs.readFileSync(spacedTimeConfigFilePath)

    return JSON.parse(json)
}

function createQNA(question, answer) {
    const qna = { question, answer, streak: 0 }

    data.push(qna)

    saveData(data)

    return qna
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getSingleQuestion() {
    const length = data.length

    return data.find(qna => {
        if (qna.streak === undefined) qna.streak = 0
        if (!qna.askAgainTime) return true
        return moment(qna.askAgainTime) < moment()
    })
}

const init = function () {
    //check to see that our file exist
    // filename is .spacedTime in the user's home directory
    const spacedTimeExists = fs.existsSync(spacedTimeConfigFilePath)

    if (!spacedTimeExists) {
        console.log('spacedTimeconfig not found, creating ...')
        saveData([])
        console.log('creating spacedTimeconfig done.')
    }

    data = loadData()
}

const main = function () {
    init()

    program.version('0.0.1');

    program
        .command('add <question> <answer>')
        .description('add a question and answer that you want to remember')
        .action((question, answer) => {
            const qna = createQNA(question, answer)
            console.log('added', qna)
        });

    program
        .command('recall')
        .description('will display a question for you to recall')
        .action(async () => {
            const qna = getSingleQuestion()

            if (!qna) return console.log('no questions to be recalled at this time. Try again later.')

            console.log(qna.question)

            await promptly.prompt('Press any key to reveal the answer');

            console.log(qna.answer)

            const remembered = await promptly.choose('did you remember successfully? yes(y) or no(n)', ['y', 'n'])

            if (remembered === 'y') {
                qna.streak++
                const { number } = fibonacci.iterate(qna.streak)
                const askAgainTime = moment().add(number, 'minute')

                qna.askAgainTime = askAgainTime
                console.log('congrats, we are going to ask you again later', askAgainTime.fromNow())
            } else {
                if (qna.streak > 1) qna.streak--

                const { number } = fibonacci.iterate(qna.streak)
                const askAgainTime = moment().add(number, 'minute')

                qna.askAgainTime = askAgainTime
                console.log('sorry we will ask again sooner', askAgainTime.fromNow())
            }

            saveData(data)
        })

    program.parse(process.argv);
}

main()