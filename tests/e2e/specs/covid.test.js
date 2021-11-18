const covidTest = require("../../../src/utils/covid")

test("May have Covid-19", () => {
    expect(covidTest(90, 37.9)).toBe(true)
})

test("May be healthy", () => {
    expect(covidTest(92, 37.7)).toBe(false)
})