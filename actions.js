const spacedTime = require('./lib/SpacedTime')
const { prompt } = require('./lib/utils')
const promptly = require('promptly')
const fibonacci = require('fibonacci')
const moment = require('moment')

exports.recall = async function () {
    const qna = spacedTime.getSingleQuestion()

    if (!qna) return console.log('no questions to be recalled at this time. Try again later.')

    console.log(qna.question)

    await prompt('Press any key to reveal the answer')

    console.log(qna.answer)

    const remembered = await promptly.choose('did you remember successfully? yes(y) or no(n)', ['y', 'n'])

    //todo: can be in the library file
    if (remembered === 'y') {
        qna.streak++
        const { number } = fibonacci.iterate(qna.streak)
        const askAgainTime = moment().add(number, 'minute')

        qna.askAgainTime = askAgainTime
        console.log('congrats, we are going to ask you again later', askAgainTime.fromNow())
    } else {
        if (qna.streak > 1) qna.streak--
        if (qna.streak === 0) qna.streak = 1

        const { number } = fibonacci.iterate(qna.streak)
        const askAgainTime = moment().add(number, 'minute')

        qna.askAgainTime = askAgainTime
        console.log('sorry we will ask again sooner', askAgainTime.fromNow())
    }

    spacedTime.saveData(spacedTime.data)
}

exports.add = async function (question, answer) {
    const qna = spacedTime.createQNA(question, answer)
    console.log('added', qna)
}