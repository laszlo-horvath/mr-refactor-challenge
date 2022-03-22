import type { ReactElement } from 'react';
import Layout from './layout';

import NftCalculatorContainer from './../components/NftCalculator/NftCalculatorContainer';
import NfstListContainer from './../components/NftList/NfstListContainer';

const Index = () => {
  return (
    <>
      <NftCalculatorContainer />
      <NfstListContainer />
    </>
  );
};

Index.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Index;
