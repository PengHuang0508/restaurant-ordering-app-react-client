import React, { useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getMenu } from '../redux/actions/menuActions';
// Hooks
import { useWindowSize } from '../hooks/useWindowSize';
// MUI
import LinearProgress from '@material-ui/core/LinearProgress';
// Components
import Banner from '../components/Banner/Banner';
import BannerMobile from '../components/Banner/BannerMobile';
import MenuDrawer from '../components/MenuDrawer/MenuDrawer';
import Menu from '../components/Menu/Menu';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => ({
    loading: state.menu.loading,
  }));
  const windowSize = useWindowSize();
  const isSmallViewport = windowSize.width < 800;

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  return (
    <React.Fragment>
      {isSmallViewport ? <BannerMobile /> : <Banner />}

      <MenuDrawer />

      {loading ? <LinearProgress color='secondary' /> : <Menu />}

      <Footer />
    </React.Fragment>
  );
};

export default Home;
