import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Guide from "../../components/guide/Guide";
import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import Table from "../../components/Table.js/Table";
import styles from "./home.module.scss";

const Home = () => {
  const [stateValue, setStateValue] = useState({
    initiateWallet: false,
    processingWalletConnect: false,
    chainID: 0,
    accountBalance: 0,
    userWallet: false,
    walletAddress: false,
    walletConnected: false,
  });

  const [loadingTable, setLoadingTable] = useState(false);
  let Text = !stateValue.walletConnected
    ? `Calm down and read the instruction on how to get started and ensure you are on etherium main network before connecting your wallet`
    : `Read the instructions on how stake your tokens`;
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.navbarContainer}>
          <Navbar
            stateValue={stateValue}
            setStateValue={setStateValue}
            setLoadingTable={setLoadingTable}
          />
        </div>
        <div className={styles.headerContainer}>
          <Header marqueeText={Text} />
        </div>
        <div className={styles.guideContainer}>
          <Guide
            stateValue={stateValue}
            setStateValue={setStateValue}
            loadingTable={loadingTable}
            setLoadingTable={setLoadingTable}
          />
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
