// import './App.css';
import {useCallback, useEffect, useState} from 'react';
import clsx from 'clsx';
import {
    AppBar,
    Container,
    CssBaseline, Divider,
    Drawer,
    IconButton,
    makeStyles, Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import {
    Menu as MenuIcon,
} from "@material-ui/icons"
import {BrowserRouter} from 'react-router-dom';
import Routes from "./Routes";
import SideBar from "./components/SideBar";


const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        display: 'flex',
        flexFlow: 'column nowrap',
        maxHeight: '100vh',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        backgroundColor: theme.palette.background.default,
        '& h4 > a': {
            textDecoration: 'none',
            color: theme.palette.primary.main,
        },
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    contentRoot: {
        marginTop: -theme.spacing(3),
        '& > div': {
            marginTop: theme.spacing(3),
        },
    },
}));


function App() {
    const classes = useStyles();
    const theme = useTheme();
    const wideScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const [open, setOpen] = useState(wideScreen);
    useEffect(() => {
        setOpen(wideScreen)
    }, [wideScreen])

    const handleDrawerToggle = useCallback(() => {
        setOpen(open => !open);
    }, [setOpen]);

    return (
        <BrowserRouter>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Ways of Darkness Utils
                        </Typography>
                        <div className={classes.grow} />
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={open}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <Divider/>
                    <SideBar />
                    <Divider />
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.toolbar} />
                    <Container maxWidth="md" className={classes.contentRoot}>
                        <Routes />
                    </Container>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
