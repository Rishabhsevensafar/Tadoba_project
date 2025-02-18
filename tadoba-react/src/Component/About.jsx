import React from 'react'
import about1 from '../assets/images/tadoba-zonee.webp'
import about2 from '../assets/images/tour-package2.webp'
import about3 from '../assets/images/tour-package3.jpg'
import about4 from '../assets/images/tour-package4.jpg'
function About() {
    return (
        <>
        <section className='my-lg-4 my-md-4 section'>
          <div className='container'>
          <div className='row '>
            <div className='col-lg-3 col-md-3 col-sm-12 aboutImages'>
                    <div >
                        <img  src={about1} alt="" />
                        <img  src={about2} alt="" />
                    </div>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-12 aboutImages'>
              <img className='aboutImage3' src={about3} alt="" />
              <img  src={about4} alt="" />
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12'>
                <div className='homeabout px-lg-3 px-md-3'>
                  <h1>About Tadoba National Park</h1>
                  <p>Tadoba Andhari Tiger Reserve and Sanctuary is one of the noted wildlife destination popular for Tiger Safari in India. It is located in Chandrapur district which lies in the state of Maharashtra, India. Its name Tadoba has been derived from the Tribal god honoured in this region Taru or Tadoba and the river that flows through the area Andhari. Tadoba National Park is one of the biggest and oldest national parks of Maharashtra which was created in the year 1955 sprawl over an area of approx 1727 square kms. In the year 1986 Andhari Wildlife sanctuary came into existence and later it was diluted with the area of Tadoba National Park.</p>
                  <h3>Our Excellence</h3>
                  <p>
                    We are the revolutionary entrepreneurs in the wildlife tourism world in the terms of 
                    working, methods and services quality. We invented and carved a platform where 
                    you can just enter and get an access to travel India. We are the revolutionary entrepreneurs in the wildlife tourism world in the terms of 
                    working, methods and services quality. We invented and carved a platform where 
                    you can just enter and get an access to travel India.
                  </p>
                </div>
  
            </div>
          </div>
          </div>
        </section>
        </>
    )
}

export default About
