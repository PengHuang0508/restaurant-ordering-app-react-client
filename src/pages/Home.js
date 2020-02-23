import React, { useState, useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getMenuData } from '../redux/actions/menuActions';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
// Components
import MenuList from '../components/menu/MenuList';
import MenuCard from '../components/menu/MenuCard';
// File
import headerBg from '../images/homeHeaderBg.jpg';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    //backgroundColor: theme.palette.background.paper,
    backgroundImage: `linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4) ),url(${headerBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'rgb(255,255,255)',
    padding: theme.spacing(8, 0, 6)
  }
}));

const Home = () => {
  const classes = useStyles();
  const { menuData } = useSelector((state) => ({
    menuData: state.menu.menuData
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuData());
  }, [dispatch]);

  const [toggle, setToggle] = useState(false);

  const handleChange = (event) => {
    setToggle(event.target.checked);
  };

  let menuMarkup = menuData.map((category) =>
    toggle ? (
      <MenuCard key={category.categoryId} category={category} />
    ) : (
      <MenuList key={category.categoryId} category={category} />
    )
  );
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.headerContainer}>
          <Container maxWidth='sm'>
            <Typography component='h1' variant='h3' align='center' gutterBottom>
              Welcome to Recto
            </Typography>
            <Typography variant='h5' align='center' paragraph>
              Company motto - Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Voluptas, sunt necessitatibus dolore modi et
              dolores tempore nam rem unde fugiat ducimus aperiam harum ex
              provident praesentium corporis repudiandae alias reiciendis?
            </Typography>
            <div>
              <Grid container spacing={2} alignItems='center' justify='center'>
                <Grid item>List View</Grid>
                <Grid item>
                  <Switch
                    checked={toggle}
                    onChange={handleChange}
                    value='toggleView'
                  />
                </Grid>
                <Grid item>Photo View</Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid}>{menuMarkup}</Container>
      </main>
    </React.Fragment>
  );
  // return (
  //   <Container className={classes.menuContainer} disableGutters>
  //     <Typography component='div' className={classes.toggleContainer}>
  //       {' '}
  //       <Grid
  //         component='label'
  //         container
  //         alignItems='center'
  //         justify='flex-end'
  //         spacing={1}
  //       >
  //         <Grid item>List View</Grid>
  //         <Grid item>
  //           <Switch
  //             checked={toggle}
  //             onChange={handleChange}
  //             value='toggleView'
  //           />
  //         </Grid>
  //         <Grid item>Photo View</Grid>
  //       </Grid>
  //     </Typography>
  //     {menuMarkup}
  //   </Container>
  // );
};

export default Home;
