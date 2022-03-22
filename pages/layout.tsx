import type { ReactElement } from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Head>
        <title>Momentranks Challenge | László Horváth © 2022</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
