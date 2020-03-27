const spacedTime = require('../lib/SpacedTime');

describe('SpacedTime class', () => {

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

    
})