import {calculate} from './App'

function getRandomInt({min,max}: {min?: number, max: number}) {
    if(min === undefined) {
        min = 0;
    }
    return Math.floor(Math.random() * Math.floor(max-min)+min)
}

test('calculate', () => {
    const population = getRandomInt({min: 1, max: 100})
    const density = getRandomInt({min: 1, max: 100})
    const size = getRandomInt({min: 1, max: 100})
    const {ratio, size: newSize} = calculate({population, density, size})
    expect(ratio).toBe(population/size/density)
    expect(newSize).toBe(population/density);
})