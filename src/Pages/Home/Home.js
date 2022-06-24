import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Guide from "../../components/guide/Guide";
// import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import Table from "../../components/Table.js/Table";
import styles from "./home.module.scss";

const Home = () => {
  const [processingWalletConnect, setProcessingWalletConnect] = useState(false);
  const [chainID, setchainID] = useState(0);
  const [accountBalance, setAccountBalance] = useState(null);
  const [userWallet, setuserWallet] = useState("");
  const [walletAddress, setwalletAddress] = useState("");
  const [walletConnected, setwalletConnected] = useState(false);
  const text = `Please open this website on your pc and connect your wallet using Metamask extension on your PC`;
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.navbarContainer}>
          <Navbar
            setProcessingWalletConnect={setProcessingWalletConnect}
            processingWalletConnect={processingWalletConnect}
            setchainID={setchainID}
            setAccountBalance={setAccountBalance}
            setuserWallet={setuserWallet}
            userWallet={userWallet}
            setwalletAddress={setwalletAddress}
            walletAddress={walletAddress}
            walletConnected={walletConnected}
            setwalletConnected={setwalletConnected}
          />
        </div>
        {/*   <div className={styles.headerContainer}>
          <Header marqueeText={text} />
        </div>*/}
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
