import React from 'react'
import Header from '../Header'
import ImportantLinks from '../ImportantLinks'
import Footer from '../Footer'
import { Link } from "react-router-dom";
import newsBanner from "../../assets/images/main-banner.jpg"
import newsblog1 from "../../assets/images/zariBanner1.jpg"
import newsblog2 from "../../assets/images/zariBanner2.jpg"
import newsblog3 from "../../assets/images/zariBanner3.jpg"
import newsblog4 from "../../assets/images/newsblog1.jpg"
import newsblog5 from "../../assets/images/newsblog2.jpg"
import newsblog6 from "../../assets/images/newsblog3.jpg"
import newsblog7 from "../../assets/images/newsblog4.jpg"
import newsblog8 from "../../assets/images/newsblog5.jpg"
import newsblog9 from "../../assets/images/newsblog6.jpg"
import { useEffect } from 'react';

function NewsandBlog() {
  useEffect(()=>{
            window.scrollTo(0, 0);
          },[])
  return (
    <>
    <Header></Header>
   
    <div>
        <img src={newsBanner} className='newsBannerImg' alt="" />
    </div>
    <section className='leaf'>
    <div className='container'>
        <h2>TADOBA NATIONAL PARK NEWS and BLOG</h2>
        <h4>News/Information</h4>
        <div className="row">  
            <div className='col-sm-12 col-md-4 col-lg-4 mt-3'> 
        <div className="card" >
  <img className="card-img-top" src={newsblog1} alt="Card image cap"/>
  <div className="card-body">
  <>13-Dec-2024</>
    <h6 className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</h6>
    
    <Link to="/newsblogdetail" className="btn btn-light">Read More</Link>
  </div>
  </div></div>
  <div className='col-sm-12 col-md-4 col-lg-4 mt-3'>
  <div className="card" >
  <img className="card-img-top" src={newsblog2} alt="Card image cap"/>
  <div className="card-body">
  <>13-Dec-2024</>
    <h6 className="card-text">Anand Mahindra shares clip of tiger family at Tadoba National Park</h6>
    
     <Link to="/newsblogdetail" className="btn btn-light">Read More</Link>

  </div>
  </div>
  </div>
  <div className='col-sm-12 col-md-4 col-lg-4 mt-3'>
  <div className="card" >
  <img className="card-img-top" src={newsblog3} alt="Card image cap"/>
  <div className="card-body">
  <>13-Dec-2024</>
    <h6 className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</h6>
    
     <Link to="/newsblogdetail" className="btn btn-light">Read More</Link>

  </div>
  </div></div>

  <div className='col-sm-12 col-md-4 col-lg-4 mt-3'>
  <div className="card" >
  <img className="card-img-top" src={newsblog4} alt="Card image cap"/>
  <div className="card-body">
  <>13-Dec-2024</>
    <h6 className="card-text">The Ultimate List of Top 7 Winter Getaways in Maharashtra</h6>
    
     <Link to="/newsblogdetail" className="btn btn-light">Read More</Link>

  </div>
  </div></div>


  <div className='col-sm-12 col-md-4 col-lg-4 mt-3'>
  <div className="card" >
  <img className="card-img-top" src={newsblog5} alt="Card image cap"/>
  <div className="card-body">
  <>13-Dec-2024</>
    <h6 className="card-text">Welcome the New Year with a Thrilling Safari in Tadoba.</h6>
    
     <Link to="/newsblogdetail" className="btn btn-light">Read More</Link>

  </div>
  </div></div>


  <div className='col-sm-12 col-md-4 col-lg-4 mt-3'>
  <div className="card" >
  <img className="card-img-top" src={newsblog6} alt="Card image cap"/>
  <div className="card-body">
  <>13-Dec-2024</>
    <h6 className="card-text">Enjoy a Homestay Experience at the Spotted Owlet in Tadoba</h6>
    
     <Link to="/newsblogdetail" className="btn btn-light">Read More</Link>

  </div>
  </div></div>


  <div className='col-sm-12 col-md-4 col-lg-4 mt-3'>
  <div className="card" >
  <img className="card-img-top" src={newsblog7} alt="Card image cap"/>
  <div className="card-body">
  <>13-Dec-2024</>
    <h6 className="card-text">Book Online Tickets for Tadoba's Winter Safari</h6>
    
     <Link to="/newsblogdetail" className="btn btn-light">Read More</Link>

  </div>
  </div></div>


  <div className='col-sm-12 col-md-4 col-lg-4 mt-3'>
  <div className="card" >
  <img className="card-img-top" src={newsblog8} alt="Card image cap"/>
  <div className="card-body">
  <>13-Dec-2024</>
    <h6 className="card-text">Enthusing Activities You Can’t Miss in Maharashtra</h6>
    
     <Link to="/newsblogdetail" className="btn btn-light">Read More</Link>

  </div>
  </div></div>


  <div className='col-sm-12 col-md-4 col-lg-4 mt-3'>
  <div className="card" >
  <img className="card-img-top" src={newsblog9} alt="Card image cap"/>
  <div className="card-body">
  <>13-Dec-2024</>
    <h6 className="card-text">Plan a Perfect Trip to Tadoba National Park from Mumbai</h6>
    
     <Link to="/newsblogdetail" className="btn btn-light">Read More</Link>

  </div>
  </div></div>


        </div>
    </div>
    </section>
    <ImportantLinks></ImportantLinks>
    <Footer></Footer>
    </>
  )
}

export default NewsandBlog;