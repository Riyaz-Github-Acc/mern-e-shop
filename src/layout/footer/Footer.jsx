import styles from "./Footer.module.scss";
import NewsLetter from "./NewsLetter";

const Footer = () => {
  return (
    <footer className="mt-24">
      <NewsLetter />

      <div className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.item}>
              <h3>Useful Links</h3>
              <span>Home</span>
              <span>About Us</span>
              <span>Contact Us</span>
            </div>

            <div className={styles.item}>
              <h3>Shopping</h3>
              <span>Shop</span>
              <span>Women</span>
              <span>Men</span>
              <span>Kids</span>
            </div>

            <div className={styles.item}>
              <h3>Quick Links</h3>
              <span>My Account</span>
              <span>Wishlist</span>
              <span>Cart</span>
            </div>

            <div className={styles.item}>
              <h3>Policy Links</h3>
              <span>Privacy Policy</span>
              <span>Terms & Conditions</span>
              <span>Return Policy</span>
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.left}>
              <div className={styles.logo}>
                <h3>MERNeShop</h3>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.copyright}>
                &#169; Copyright 2023. All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
