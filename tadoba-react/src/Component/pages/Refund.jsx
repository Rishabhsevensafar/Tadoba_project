import React from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import refundBanner from "../../assets/images/refund-banner.jpg";
import refund1 from "../../assets/images/refund.jpg";
import refund2 from "../../assets/images/refund2.jpg";
function Refund() {
  return (
    <>
      <Header></Header>
      <div>
        <img
          className="refundBanner"
          src={refundBanner}
          alt="refund banner image"
        />
      </div>
      
      <section className="pb-4">
            <div className="container">
                <div>
                    <h1>Refund, Cancellation, Retrun Policy - Booking Return</h1>
                    <p>
                    Services booked with us must be intimated to us in written for
                    cancellation within 15 days or before from the date it has been
                    booked to the customer. Booking must be cancelled with all cost
                    levied in its original at the time of booking receipt, invoice &
                    other papers.
                    </p>
                    <h6>Refund</h6>
                    <p>
                    Once the cancellation e-mail is received to the company
                    successfully. will instantly initiate the
                    refund to your source account or chosen method of refund within 7
                    working days.
                    </p>
                    <h6>Refund and Cancellation for Service Provider Company</h6>
                    <p>
                    Due to service providers in nature "NO REFUND", "NO CANCELLATION"
                    will be entertained once the Payment has been made.
                    </p>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8">
                    <div>
                        <h6>Cancellation Policy</h6>
                        <p>
                        Please note an order can only be canceled within 24 hours of
                        placing the order. Once the order is processed after 24 hours,
                        no cancellation request will be entertained. However refund is
                        possible for all orders/services. OrCustomers can CANCEL order
                        only before the services has been booked. After the services
                        have been confirmed, The Customer CANNOT Cancel the Orders.
                        However cancellation is possible for all orders/products.
                        </p>
                        <h6>Service Delivery Policies:-</h6>
                        <p>
                        Offers safari and accommodation booking
                        services to almost all parts of India. Booking placed will be
                        confirmed within 24* hrs. We provide assistance 24*7 on all
                        Holidays too. Challenges beyond our control for which is not liable and would request its users to
                        cooperate as GTI continuously tries to nought such instances.
                        Also,  reserves the right to cancel your order at its sole
                        discretion in cases where it takes longer than usual delivery
                        time or the services is physically untraceable and refund the
                        amount paid for cancelled product(s) to your source account.
                        </p>
                        <h6>Mode of Payment</h6>
                        <p>
                        Our user friendly website provides option for overseas advance
                        payment through online transfer to our bank through net
                        banking, Master/Visa debit or credit card. Foreign nationals
                        can make payment through currency notes / traveler cheque or
                        through master/visa American Express Credit Card. Please note
                        that in case of payment made through credit card, the bank
                        charges as applicable would be added to the total amount and
                        will be paid at the same.
                        </p>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4">
                    <img className="refundImg" src={refund1} alt="Refund Image" />
                    <img className="refundImg" src={refund2} alt="Refund Image" />
                    </div>
                </div>
                <div>
                    <h6>POLICY REGARDING CANCELLATION/ NO SHOW / EARLY DEPARTURE</h6>
                    <p>
                    In case if you are postponing or cancelling your tour/travel due
                    to any unavoidable reasons, you must intimate us in writing.
                    Please make it sure that cancellation charges would be effective
                    from the date we receive your mail in writing. Following
                    cancellation policy would be applicable :
                    </p>
                    <div>
                    <ul>
                        <li>30 days prior to arrival - 10% of the tour cost.</li>
                        <li>
                        15 days to 29 days prior to arrival - 30% of the tour cost.
                        </li>
                        <li>
                        07 days to 14 days prior to arrival - 40 % of the tour cost.
                        </li>
                        <li>
                        02 days to 06 days prior to arrival - 50% of the tour cost.
                        </li>
                        <li>Less than 48 hours or no show - NO REFUND.</li>
                    </ul>
                    </div>
                    <p>
                    In case of peak season - weekends or weekdays (Holi, Diwali, X'Mas
                    & New Year) hotel bookings; separate cancellation policy is
                    applicable (which would be advised as and when required).
                    </p>
                    <p>
                    Our Liabilities and Limitations : Please note that after you
                    finalize the tour/service cost and in case if there are any hikes
                    in permit fees of safaris/ taxes, fuel cost or guide charges
                    decided by the Govt of India, the same would be charged as extra.
                    </p>
                </div>
            </div>
      </section>

      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default Refund;
