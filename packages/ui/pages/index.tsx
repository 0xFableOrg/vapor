import React from 'react';
import type { NextPage } from 'next';
import clsx from 'clsx';

import Layout from '@components/Layout/Layout';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div
        className={clsx({
          'container w-full h-full mx-auto px-[60px]': true,
          'bg-gray-100': true,
        })}
      ></div>
    </Layout>
  );
};

export default HomePage;
