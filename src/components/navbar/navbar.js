import React from "react";
import styles from "./navbar.module.scss";
import logo from "../../assets/favicon.jpg";
import { toast } from "react-toastify";
import { ethers } from "ethers";

const Navbar = ({ setProcessingWalletConnect, processingWalletConnect }) => {
  // console.log(processingWalletConnect);
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const id = toast.loading("Processing...");
      setProcessingWalletConnect(true);
      // request for the account of a connected user
      let [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const { chainId } = await provider.getNetwork();
        console.log(chainId);
        // setchainID(parseInt(chainId));

        // getBalance function accepts strings only
        let balance = await provider.getBalance(account);
        balance = ethers.utils.formatEther(balance);
        balance = parseFloat(balance).toFixed(5);
        console.log(balance);

        // Format the user wallet address
        account = `${account.slice(0, 4)}…${account.slice(
          account.length - 5,
          account.length
        )}`;
        console.log(account);
        setProcessingWalletConnect(false);
        return toast.update(id, {
          render: "Wallet connected",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        console.log("Error: ", error);
        return toast.update(id, {
          render:
            "Please install metamask browser extension wallet and import your wallet to get started ",
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } else {
      const id = toast.loading("Processing...");
      return toast.update(id, {
        render:
          "Please install metamask browser extension wallet and import your wallet ",
        type: "warning",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <div className={styles.logoContent}>
          <img src={logo} alt={logo} />
        </div>
        <div className={styles.logoText}>StormX</div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={connectWallet}>
          {!processingWalletConnect ? "Connect Wallet" : "Processing"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
