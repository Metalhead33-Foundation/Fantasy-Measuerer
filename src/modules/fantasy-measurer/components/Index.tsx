import {useState, Fragment} from "react";
import {calculate, units} from "../data";
import {
    FormControl,
    Grid, makeStyles,
    MenuItem,
    Paper,
    Select,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    divider: {
        margin: theme.spacing(2,0)
    }
}));

const Index = () => {
    const classes = useStyles();

    const [size, setSize] = useState(1);
    const [population, setPopulation] = useState(1);
    const [density, setDensity] = useState(1);
    const [unit, setUnit] = useState("kilometres")
    const {ratio, size: newSize} = calculate({size, population, density})

    return (
        <Fragment>
            <Paper className={classes.root}>
                <Typography component="h1" variant="h2">Fantasy size measurer</Typography>
            </Paper>
            <Paper className={classes.root}>
                <form action="#">
                    <Typography variant="h6" gutterBottom>
                        Fantasy stats
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                type="number"
                                required
                                id="size"
                                name="size"
                                label="Size (pixels)"
                                fullWidth
                                value={size.toString(10)}
                                onChange={(ev) => setSize(parseInt(ev.target.value))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                type="number"
                                required
                                id="population"
                                name="population"
                                label="Population"
                                fullWidth
                                value={population.toString(10)}
                                onChange={(ev) => setPopulation(parseInt(ev.target.value))}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.divider}/>
                    <Typography variant="h6" gutterBottom>
                        Real-life reference
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="number"
                                required
                                id="density"
                                name="density"
                                label="Reference population density"
                                value={density.toString(10)}
                                onChange={(ev) => setDensity(parseInt(ev.target.value))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    value={unit}
                                    onChange={(ev) => setUnit(ev.target.value as string)}>
                                    {
                                        units.map(({name}, idx) => (
                                            <MenuItem key={idx} value={name}>per square {name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Paper className={classes.root}>
                <Typography variant="h6" gutterBottom>
                    Output
                </Typography>
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
            </Paper>
        </Fragment>
    )
}

export default Index;