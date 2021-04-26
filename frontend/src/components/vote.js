import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Copyright from './copyright';

import {auth,db} from '../utils/firebase';
import firebase from 'firebase';
import { useHistory ,Link} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textDecoration:'none',
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
    bu:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      
    },
  },
}));

const tiers = [
  {
    title: 'Candidate A',
    subheader: 'Party X',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Vote A',
    vote:'A',
    buttonVariant: 'contained',
  },
  {
    title: 'Candidate B',
    subheader: 'Party X',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Vote B',
    vote:'B',
    buttonVariant: 'contained',
  },
  {
    title: 'Candidate C',
    subheader: 'Party X',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Vote C',
    vote:'C',
    buttonVariant: 'contained',
  },
];


export default function Vote() {
  const classes = useStyles();
  const hist = useHistory();
  const vote = async (x) => {
    const user = auth.currentUser ? auth.currentUser.uid:null;
    if(user){
    const vd =  await db.collection('voterslist').doc(user).get();
    const data = vd.data();
    if(data){
      if(data.voted == false){
        db.collection('voteCount').doc(x).update({cnt:firebase.firestore.FieldValue.increment(1)}).then(()=>console.log("done"))
        db.collection('voterslist').doc(user).update({voted:true});
        alert("You have successfully casted your vote")
      }
      else{
        alert("You have already casted your vote")
      }
    }
  }
 
 }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Elections App
          </Typography>
          <Link to='/'>
          <Button  color="primary" variant="outlined" className={classes.link}>
          Go Home
        </Button> </Link>
          <Button  onClick={()=>{auth.signOut(); hist.push('/')}} color="primary" variant="outlined" className={classes.link}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
     
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                //   action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} color="primary" onClick={()=>{vote(tier.vote)}} >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
      </Container>
    
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        {/* <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid> */}
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
