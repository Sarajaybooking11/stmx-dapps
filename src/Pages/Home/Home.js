import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Guide from "../../components/guide/Guide";
import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import Table from "../../components/Table.js/Table";
import styles from "./home.module.scss";

const Home = () => {
  const [processingWalletConnect, setProcessingWalletConnect] = useState(false);
  const text = `Please open this website on your pc and connect your wallet using Metamask extension on your PC`;
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.navbarContainer}>
          <Navbar
            setProcessingWalletConnect={setProcessingWalletConnect}
            processingWalletConnect={processingWalletConnect}
          />
        </div>
        <div className={styles.headerContainer}>
          <Header marqueeText={text} />
        </div>
        <div className={styles.guideContainer}>
          <Guide />
        </div>
        <div className={styles.tableContainer}>
          <Table />
        </div>
        <div className={styles.footerContainer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
