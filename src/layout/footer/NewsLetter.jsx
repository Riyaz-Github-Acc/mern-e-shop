import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import GoogleIcon from "@mui/icons-material/Google";

import Button from "../../components/Button";

import styles from "./NewsLetter.module.scss";

const NewsLetter = () => {
  return (
    <div className={`${styles.newsLetter} bg-red-500`}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h3>GET IN TOUCH WITH US:</h3>
        </div>

        <div className={styles.mail}>
          <input type="text" placeholder="Enter Your Email Address" />
          <Button type="primaryBtn">Subscribe</Button>
        </div>

        <div className={styles.social}>
          <InstagramIcon className={styles.icon} />
          <FacebookIcon className={styles.icon} />
          <TwitterIcon className={styles.icon} />
          <PinterestIcon className={styles.icon} />
          <GoogleIcon className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
