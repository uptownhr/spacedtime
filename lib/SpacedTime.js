const os = require('os')
const fs = require('fs')
const moment = require('moment')
const fibonacci = require('fibonacci')

/* const homeDir = os.homedir()
const spacedTimeConfigFilePath = homeDir + '/.spacedTime' */

const chalk = require('chalk')

class SpacedTime {

    constructor(spacedTimeConfigFilePath) {
        this.spacedTimeConfigFilePath = spacedTimeConfigFilePath
        this.data = []
    }

    init() {
        //check to see that our file exist
        // filename is .spacedTime in the user's home directory
        const spacedTimeExists = fs.existsSync(this.spacedTimeConfigFilePath)

        if (!spacedTimeExists) {
            console.log( chalk.yellow('spacedTimeconfig not found, creating ...') )
            this.saveData([])
            console.log( chalk.yellow('creating spacedTimeconfig done.') )
        }

        this.data = this.loadData()
    }

    loadData() {
        const json = fs.readFileSync(this.spacedTimeConfigFilePath)

        return JSON.parse(json)
    }

    saveData(data) {
        const json = JSON.stringify(data)
        fs.writeFileSync(this.spacedTimeConfigFilePath, json)
    }

    createQNA(question, answer) {
        const qna = { question, answer, streak: 1 }

        this.data.push(qna)

        this.saveData(this.data)

        return qna
    }

    getSingleQuestion() {
        return this.data.find(qna => {
            if (qna.streak === undefined) qna.streak = 0
            if (!qna.askAgainTime) return true
            return moment(qna.askAgainTime) < moment()
        })
    }

    recallAnswer(qna, remembered = false) {
        if (remembered) {
            qna.streak++
            const { number } = fibonacci.iterate(qna.streak)
            const askAgainTime = moment().add(number, 'minute')

            qna.askAgainTime = askAgainTime
            console.log( chalk.green('congrats, we are going to ask you again later'), chalk.green(askAgainTime.fromNow()))
        } else {
            if (qna.streak > 1) qna.streak--
            if (qna.streak === 0) qna.streak = 1

            const { number } = fibonacci.iterate(qna.streak)
            const askAgainTime = moment().add(number, 'minute')

            qna.askAgainTime = askAgainTime
            console.log( chalk.redBright('No worries, spacedtime will ask again sooner'), chalk.redBright(askAgainTime.fromNow()))
        }

        this.saveData(this.data)
    }
}

module.exports = SpacedTime