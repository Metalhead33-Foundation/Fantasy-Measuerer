type Unit = {
    name: string,
}

export const units: Unit[] = [
    {name: 'kilometres'},
    {name: 'miles'},
]

export type CalculateProps = {
    population: number,
    size: number,
    density: number,
}

export const calculate = ({population, size, density}: CalculateProps) => {
    return {
        ratio: population / size / density,
        size: population / density,
    }
}
