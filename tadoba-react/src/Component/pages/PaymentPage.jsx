import React from "react";
import Header from "../Header";
import { useEffect } from "react";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";

function PaymentPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />

      <div className="paymentHead">
        <h1>Payment</h1>
      </div>
      <section className="leaf">
        <div className="container ">
          <div className="paymentbox">
            <h4>Payment Information</h4>
            <hr />

            <div className="paymentinput">
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <label>
                    <span>Enter Amount</span>
                  </label>
                  <br />
                  <input type="text" placeholder="Enter Amount" />
                  <br />
                  <label>
                    <span>Enter Name</span>
                  </label>
                  <br />
                  <input type="text" placeholder="Enter Name" />
                  <br />
                  <label>
                    <span>Enter Email</span>
                  </label>
                  <br />
                  <input type="text" placeholder="Enter Email" />
                  <br />
                  <label>
                    <span>Enter Mobile</span>
                  </label>
                  <br />
                  <input type="text" placeholder="Enter Mobile no" />
                  <br />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <label>
                    <span>Enter Zip</span>
                  </label>
                  <br />
                  <input type="text" placeholder="ZIP Code" />
                  <br />
                  <label>
                    <span>Enter country Rupee</span>
                  </label>
                  <br />
                  <input type="text" placeholder="INR Indian Rupee" />
                  <br />

                  <label>
                    <span>Enter City Name *</span>
                  </label>
                  <br />
                  <input type="text" placeholder="Enter City Name" />
                  <br />
                  <label>
                    <span>Remark If any</span>
                  </label>
                  <br />
                  <input type="textarea" placeholder="" />
                  <br />
                </div>
              </div>
              <button type="button" class="btn btn-primary mt-3">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </section>

      <ImportantLinks />
      <Footer />
    </>
  );
}

export default PaymentPage;
