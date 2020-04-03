const SpacedTime = require('../lib/SpacedTime');
const os = require('os')
const configurationFilePath = os.tmpdir() + '/spacedtime-test.json'

describe('SpacedTime class', () => {
    let spacedTime
    beforeAll(() => {
        spacedTime = new SpacedTime(configurationFilePath)
        console.log('path', configurationFilePath)
    })
    test ('it contains data array', () => {
        expect(Array.isArray(spacedTime.data)).toBeTruthy()
    })

    test ('createQNA adds a question to the data arary', () => {
        spacedTime.createQNA(1, 2)

        expect(spacedTime.data[0].question).toBe(1)
        expect(spacedTime.data[0].answer).toBe(2)
    })

    test ('getSingleQuestion returns a single question', () => {
        const q = spacedTime.getSingleQuestion()

        expect(q.question).toBe(1)
    })

    test ('recallAnswer with true increments the streak and sets new askAgain Time', () => {
        const q = spacedTime.getSingleQuestion()

        spacedTime.recallAnswer(q, true)

        expect(q.streak).toBe(2)
    })

    test ('getSingleQuestion returns null when nothing to be asked', () => {
        const q = spacedTime.getSingleQuestion()

        expect(q).toBeFalsy()
    })

    test ('recallAnswer with false decrements the streak and sets new askAgain Time', () => {
        spacedTime.data[0].askAgainTime = new Date("2000-12-01")
        const q = spacedTime.getSingleQuestion()

        spacedTime.recallAnswer(q, false)

        expect(q.streak).toBe(1)
    })

    test('list will return questions in the database', () => {
        const list = spacedTime.list()

        expect(list.length).toBe(1)
    })

    test('delete will remove a question by index from the database', () => {
        spacedTime.createQNA(2, 2)

        spacedTime.remove(0)

        expect(spacedTime.data.length).toBe(1)
    })

    test('update(index, {question}) will update just the question', () => {
        const question = "this is updated"
        spacedTime.update(0, {question})

        expect(spacedTime.data[0].question).toBe(question)
    })

    test('update(index, {answer}) will update just the answer', () => {
        const answer = "this is updated"
        spacedTime.update(0, {answer})

        expect(spacedTime.data[0].answer).toBe(answer)
    })

    test('update(index, {answer, question}) will update both the question & answer', () => {
        const answer = "updated again"
        const question = "updated again"
        spacedTime.update(0, {answer, question})

        expect(spacedTime.data[0].answer).toBe(answer)
        expect(spacedTime.data[0].question).toBe(question)
    })
})