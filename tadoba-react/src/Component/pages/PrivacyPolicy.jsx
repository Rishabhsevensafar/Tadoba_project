import React from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import privacyBanner from "../../assets/images/privacy-banner.jpg";
function PrivacyPolicy() {
  return (
    <>
      <Header></Header>
     
        <div>
          <img
            className="tcbanner"
            src={privacyBanner}
            alt="term and condition banner"
          />
        </div>
        <section className="pb-4">
        <div className="container">
          <div>
            {" "}
            <h1>PRIVACY POLICY</h1>
            <h6>Data Sharing and Information</h6>
            <p>
              As a general rule, we shall will not disclose or share any of your
              personal information except when we have specifically obtained
              your permission or under special circumstances, such as when we
              believe in good faith that the law requires it or as permitted in
              terms of this policy.
            </p>
          </div>
          <div>
            <h6>Protection of Collected data and information:</h6>
            <p>
              Whenever we handle personal information as described above
              regardless of where this occurs, we take steps to ensure that your
              information is treated securely and in accordance with the
              relevant Terms & conditions and this Privacy Policy.
            </p>
            <p>
              Unfortunately, no data transmission over the Internet can be
              guaranteed to be 100% secure. As a result, while we strive to
              protect your personal information, we cannot ensure or warrant the
              security of any information you transmit to us, and you do so at
              your own risk. Once we receive your transmission, we make best
              efforts to ensure data security on our systems.
            </p>
            <p>
              Thanks for using our website. Wish you happy and safe browsing...
            </p>
          </div>
          <div>
            <h6>Contact Us:-</h6>
            <p className="contact">
            Office no Ground floor 7,
             H-73, H Block Sector-63
            info@tadoba.com
            contact@tadoba.com
             9988764563
            </p>
          </div>
        </div>
      </section>
      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default PrivacyPolicy;
