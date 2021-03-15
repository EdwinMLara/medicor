import React, { useContext } from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AirlineSeatFlatIcon from '@material-ui/icons/AirlineSeatFlat';
import { Fragment } from 'react';

import { IsLoggedContext } from '../App';
import Button from '@material-ui/core/Button';

import { withRouter } from 'react-router-dom';


import { Route, Switch } from "react-router-dom";
import Consultas from './Consultas';
import Inicio from './Inicio';
import Pacientes from './pacientes/Pacientes';
import AddPacientes from './pacientes/AddPacientes';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    grow:{
        flexGrow: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

interface DataDrawer{
    text : string,
    icon : any,
    onClick : (props : any) => any 
}

function DrawerM(props : any) {
    const { history } = props;

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const {islogged,setislogged} = useContext(IsLoggedContext);

    const arrayAdmin : Array<DataDrawer> = [
        {
            text : 'Inicio',
            icon :  <HomeIcon/>,
            onClick : () => history.push("/")
        },
        {
            text : 'Consultas',
            icon :  <LocalHospitalIcon/>,
            onClick : () => history.push("/consultas")
        },
        {
            text : 'Pacientes',
            icon :  <AirlineSeatFlatIcon/>,
            onClick : () => history.push("/pacientes")
        }];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    { islogged ?
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton> : null
                    }
                    <Typography variant="h6" noWrap>
                        Medico
                    </Typography>
                    {islogged ? <React.Fragment>
                                    <div className={classes.grow}></div>
                                    <Button color="inherit"
                                        onClick={()=>{setislogged(!islogged)}}>
                                            Log out
                                    </Button>
                                </React.Fragment> : null }
                    
                </Toolbar>
            </AppBar>
            {islogged ?
            <Fragment>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {
                        arrayAdmin.map((item : DataDrawer, index : number) => {       
                        const {text,icon,onClick} = item
                        return(
                            <ListItem button key={text} onClick={onClick}>
                                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText primary={text} />
                            </ListItem>
                        )})
                    }
                </List>
            </Drawer> 
            <main className={classes.content}>
                <div className={classes.toolbar} />
                
                <Switch>
                    <Route exact path="/" render={props => <Inicio/>} />
                    <Route exact path="/consultas" render={props => <Consultas/>} />
                    <Route exact path="/pacientes" render={props => <Pacientes />} />
                    <Route exact path="/addPacientes" render={props => <AddPacientes />} />
                </Switch>
            </main> 
            </Fragment> : null}
        </div> 
    )
}

export default withRouter(DrawerM);
