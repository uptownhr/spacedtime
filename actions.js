const spacedTime = require('./lib/SpacedTime')
const { prompt } = require('./lib/utils')
const promptly = require('promptly')

exports.recall = async function () {
    const qna = spacedTime.getSingleQuestion()

    if (!qna) return console.log('no questions to be recalled at this time. Try again later.')

    console.log(qna.question)

    await prompt('Press any key to reveal the answer')

    console.log(qna.answer)

    const remembered = await promptly.choose('did you remember successfully? yes(y) or no(n)', ['y', 'n'])

    spacedTime.recallAnswer(qna, remembered === 'y')
}

exports.add = async function (question, answer) {
    const qna = spacedTime.createQNA(question, answer)
    console.log('added', qna)
}