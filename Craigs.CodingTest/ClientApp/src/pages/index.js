import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    textAlign: 'center',
      paddingTop: theme.spacing.unit * 20,
      maxWidth: 900,
      margin: 'auto'
    },
    header: {
        marginTop: '0.35em'
    },
    img: {
        maxWidth: '100%'
    }
});

class Index extends React.Component {
  state = { open: false };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
        <div className={classes.root}>
            <Dialog open={open} onClose={this.handleClose} maxWidth="md">
          <DialogTitle>Craigs Coding Challenge 1</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom className={classes.header}>Brief</Typography>
            <DialogContentText>
                As you know, Craigs Investment Partners Limited is one of New Zealand's largest investment advisory firms.
                We offer tailored investment solutions to private, corporate and institutional clients. Our clients need to be sure their assets are well protected.
                One very sceptical client is unsure about the property market. They have heard an asteroid might one day hit earth and decrease the value of their property.
                We need an application where clients can browse a list of all near-by asteroids on a per-day basis, and view any information about them. Our clients are very visual people, so the solution needs to look nice, and display data in the forms of tables or graphs.
            </DialogContentText>
            <Typography variant="h6" gutterBottom className={classes.header}>Method</Typography>
            <DialogContentText>
                        NASA have a complete free api that providers daily data about all near-by asteroids, and full documentation can be found here. <br />
                        <a href="https://api.nasa.gov/api.html#neows-swagger">https://api.nasa.gov/api.html#neows-swagger</a> <br />
                        There are two apis in particular you will need to integrate with: <br />
                        -Get today's latest 'Near earth objects': <a href="https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=DEMO_KEY">https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=DEMO_KEY</a> <br />
                        -Get individual near earth object's info: <a href="https://api.nasa.gov/neo/rest/v1/neo/3669885?api_key=DEMO_KEY">https://api.nasa.gov/neo/rest/v1/neo/[asteroid_id]?api_key=DEMO_KEY</a> <br />
                        You have creative freedom to design the application however you like, and display the data however you feel most appropriate.
                        We have included a small UI mockup as a base for you to work off, but again, you have freedom to create it however you like.
            </DialogContentText>
                    <img src="mockup.PNG" className={classes.img} />
                    <Typography variant="h6" gutterBottom className={classes.header}>Things to consider</Typography>
                    <DialogContentText>
                        You can use this application as a base to work off, so feel free to remove/add things as you like. <br />
                        This application has been packaged with ReactJS (<a href="https://reactjs.org/">https://reactjs.org/</a>), and Material UI for faster UI building (<a href="https://material-ui.com/">https://material-ui.com/</a>), and would be nice if you followed the material UI standards. <br />
                        Here are some recomendations of features you could implement (in no particular order): <br />
                        -The "/today" call gets a list of today's NEO. It has an attribute called "links", with children "next" and "prev". They could be used to navigate between different days<br />
                        -The "neo/[asteroid_id]" call has lots of information, and could be useful to display. Find ways of displaying the data so it's easily readable.<br />
                        -The "neo/[asteroid_id]" call has a child called "close_approach_data". This is a list of dates, and how close to the earth it was/ is. This could be a cool dataset to display in a table (or if you have time/want to, a graph)<br />
                        -The "neo/[asteroid_id]" call has a child called "estimated_diameter". This could be a cool way to visually compare the size of the asteroid to something we all can relate to like the sky tower, earth, etc<br />
                        -How does the website perform on a mobile device? Can you improve on the mockup so that it's more usable on a desktop AND mobile device?<br />
                    </DialogContentText>
                    <DialogContentText>
                        The most important thing about this challenge is to have fun, and use it to show us how you like designing things. Regardless of the outcome, you can keep whatever code you make and use it towards your future portfolios or have as a cool addition to your github site. <br />
                        If you have any questions, feel free to contact me at Robert.Burke@craigsip.com. Have fun! <br />
                    </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
            </Dialog>
            <img src="CIP-Logo.jpg" />
            <Typography variant="h2" gutterBottom className={classes.header}>
          Welcome to the Craigs Coding Challenge
        </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Thank you for participating in our coding challenge, and I hope you have as much fun solving it as we did coming up with the problem. 
                This challenge was designed to test your UI/UX skills, and how you can leverage off of existing 3rd party frameworks and providers. 
                We have estimated it should take 3 hours to complete the spec, but if you feel like you need/want more time in order to go over and beyond the spec, you are more than welcome to do so.
                So, let's get started!
        </Typography>
        <Button variant="contained" color="secondary" onClick={this.handleClick}>
          Show me the spec
        </Button>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
