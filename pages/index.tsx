import type { ReactElement } from 'react';
import NftCalculatorContainer from './../components/NftCalculator/NftCalculatorContainer';
import NfstListContainer from './../components/NftList/NfstListContainer';
import Layout from './layout';

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
