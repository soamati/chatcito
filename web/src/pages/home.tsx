import React from 'react';
import { NextPage } from 'next';
import { withAuthGSSP } from '../utils/withAuthGSSP';
import { BottomNav } from '../layouts/BottomNav';
import { Page } from '../layouts/Page';

const Home: NextPage = () => {
  return (
    <Page>
      <BottomNav />
    </Page>
  );
};

export default Home;

export const getServerSideProps = withAuthGSSP();
