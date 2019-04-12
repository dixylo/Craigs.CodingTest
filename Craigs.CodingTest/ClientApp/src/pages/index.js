import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';
import { AppBar, Toolbar, IconButton, Badge, Drawer, Divider, List, ListItemIcon, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { Menu, ChevronLeft, Assignment } from '@material-ui/icons';
import classNames from 'classnames';

const drawerWidth = 240;

const styles = (theme) =>
    createStyles({
        root: {
            display: 'flex'
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
        toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        },
        menuButton: {
            marginLeft: 12,
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing.unit * 7,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing.unit * 9,
            },
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            padding: theme.spacing.unit * 3,
            height: '100vh',
            overflow: 'auto',
        },
        chartContainer: {
            marginLeft: -22,
        },
        tableContainer: {
            height: 320,
        },
        h5: {
            marginBottom: theme.spacing.unit * 2,
        },
    });


class Index extends React.Component {
        state = { open: true };

    async componentWillMount() {
        const result = await fetch('https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=DEMO_KEY');
        const data = await result.json();
        this.setState({ ...this.state, getAsteroidResponse: data });
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    }

    handleDrawerClose() {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        const { getAsteroidResponse, asteroid } = this.state;
        const asteroidListItems = getAsteroidResponse !== undefined ?
            getAsteroidResponse.near_earth_objects[Object.keys(getAsteroidResponse.near_earth_objects)[0]].map(a => (
                <ListItem button key={a.name}>
                    <ListItemIcon>
                        <Assignment />
                    </ListItemIcon>
                    <ListItemText primary={a.name} />
                </ListItem>
            )) : [];

        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)} >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton color="inherit" aria-label="Open drawer" onClick={() => this.handleDrawerOpen()} className={classNames(classes.menuButton,this.state.open && classes.menuButtonHidden)}>
                            <Menu />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>The Asteroids</Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={() => this.handleDrawerClose()}>
                            <ChevronLeft />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {asteroidListItems}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    Put some stuff in here
                </main>
            </div>
        );
    }
}

export default withRoot(withStyles(styles)(Index));
