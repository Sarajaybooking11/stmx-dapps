import React from "react";
import styles from "./guide.module.scss";
import gift from "../../assets/Gift.svg";
import { BsArrowRightSquareFill } from "react-icons/bs";

import Countdown from "react-countdown";

const Guide = () => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <span>
        {days}:{hours}:{minutes}:{seconds}
      </span>
    );
  };
  return (
    <div className={styles.container}>
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
            <div className={styles.claimReward}>
              <h2>HOW TO CLAIM REWARD</h2>
              <nav>
                <ul>
                  <li>
                    <div>
                      <span>
                        <BsArrowRightSquareFill />
                      </span>
                      <span>
                        Make sure you are veiwing the website on pc and have a
                        metamask wallet extension
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>
                        <BsArrowRightSquareFill />
                      </span>
                      <span>
                        Make use you are using on pc and have a metamask wallet
                        extension
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>
                        <BsArrowRightSquareFill />
                      </span>
                      <span>
                        Make use you are using on a pc and have a metamask
                        wallet extension installed
                      </span>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={styles.noteReward}>
              <h2>Note</h2>
              <nav>
                <ul>
                  <li>
                    <div>
                      <span>
                        <BsArrowRightSquareFill />
                      </span>
                      <span>
                        This offer is only available to stmx holders and the
                        reward is different for each stmx holder
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>
                        <BsArrowRightSquareFill />
                      </span>
                      <span>
                        The connected wallet must hold stmx tokens or else the
                        feature would be unavailable
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>
                        <BsArrowRightSquareFill />
                      </span>
                      <span>
                        This offer is 100% legitimate and completely safe
                      </span>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
