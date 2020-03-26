const os = require('os')
const fs = require('fs')
const moment = require('moment')

const homeDir = os.homedir()
const spacedTimeConfigFilePath = homeDir + '/.spacedTime'

class SpacedTime {

    constructor() {
        this.data = []
    }

    init() {
        //check to see that our file exist
        // filename is .spacedTime in the user's home directory
        const spacedTimeExists = fs.existsSync(spacedTimeConfigFilePath)

        if (!spacedTimeExists) {
            console.log('spacedTimeconfig not found, creating ...')
            this.saveData([])
            console.log('creating spacedTimeconfig done.')
        }

        this.data = this.loadData()
    }

    loadData() {
        const json = fs.readFileSync(spacedTimeConfigFilePath)

        return JSON.parse(json)
    }

    saveData(data) {
        const json = JSON.stringify(data)
        fs.writeFileSync(spacedTimeConfigFilePath, json)
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


}

module.exports = new SpacedTime()