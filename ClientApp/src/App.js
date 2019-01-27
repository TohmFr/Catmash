import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Rank from './components/Rank';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
        <Route path='/rank/:pageIndex?' component={Rank} />
  </Layout>
);
