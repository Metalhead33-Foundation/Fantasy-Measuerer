import './App.css';
import {useState} from 'react';

type Unit = {
    name: string,
}

const units: Unit[] = [
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

function App() {
    const [size, setSize] = useState(1);
    const [population, setPopulation] = useState(1);
    const [density, setDensity] = useState(1);
    const [unit, setUnit] = useState("kilometres")
    const {ratio, size: newSize} = calculate({size, population, density})

    return (
        <div className="App">
            <h1>Fantasy size measurer</h1>
            <form action="#">
                <fieldset>
                    <legend>Fantasy stats</legend>
                    <div>
                        <label htmlFor="size">Size (pixels):</label>
                        <input type="number" id="size" min="1" step="any" value={size}
                               onChange={(ev) => setSize(parseInt(ev.target.value))}/>
                    </div>
                    <div>
                        <label htmlFor="population">Population:</label>
                        <input type="number" id="population" min="1" step="any" value={population}
                        onChange={(ev) => setPopulation(parseInt(ev.target.value))}/>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Real-life reference</legend>
                    <div>
                        <label htmlFor="density">Reference population density:</label>
                        <input type="number" id="density" value={density} onChange={(ev) => setDensity(parseInt(ev.target.value))} min="1" step="any"/>
                        <select name="unit" id="unit" value={unit} onChange={(ev) => setUnit(ev.target.value)}>
                            {units.map(({name}, idx) => (
                                <option key={idx} value={name}>per square {name}</option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Outputs:</legend>
                    <div>
                        Each pixel represents <output id="translation" name="translation"
                                                      htmlFor="size, population, density">
                        {`${ratio.toFixed(4)} square ${unit}`}
                    </output>.
                    </div>
                    <div>
                        <label htmlFor="newSize">Kingdom size: </label>
                        <output id="newSize" name="newSize" htmlFor="size, population, density">
                            {`${newSize.toFixed(0)} square ${unit}`}
                        </output>
                    </div>
                </fieldset>

            </form>
        </div>
    );
}

export default App;
