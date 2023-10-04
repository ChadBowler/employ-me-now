import React from "react";
import gitlogo from "../../styles/images/github-mark.png";
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles['footer-container']}>
      <div className={styles['git-icon']}>
        <a href="https://github.com/ChadBowler/employ-me-now" target="_blank" rel="noreferrer">
          <img src={gitlogo} alt="Git Icon" />
        </a>
      </div>
      <div className={styles['copy-text']}>
        <p>&copy; 2023 4ninjas group</p>
      </div>
    </div>
  );
};

export default Footer;
