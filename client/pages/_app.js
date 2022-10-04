import "./index.scss";
import React from "react";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

App.getInitialProps = async ({ ctx, Component }) => {
  const pageProps = await Component.getinitialProps?.(ctx);
  return { pageProps };
};

export default App;
