import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { CollectionProvider } from "../src/context/CollectionContext";
import { AppBar, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router'
import NextNprogress from 'nextjs-progressbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: '#202020'
    },
    title: {
      background: '#ec1d24',
      letterSpacing: '-2px',
      padding: '0px 2px 0px 0px',
      lineHeight: '25px',
      cursor: 'pointer',
    },
  }),
);

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const classes = useStyles();
  const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Marvel Collection</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CollectionProvider>
          <CssBaseline />
          <NextNprogress
            color="#ec1d24"
            startPosition={0.3}
            stopDelayMs={200}
            //@ts-ignore
            height="4"
          />
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <h1 onClick={() => router.push('/')} className={classes.title}>MARVEL COLLECTION</h1>
            </Toolbar>
          </AppBar>
          <Component {...pageProps} />
        </CollectionProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
