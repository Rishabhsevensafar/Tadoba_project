import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
function Footer() {
    return (
       <>
       <footer className='footerSection'> 
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-12'>
                        <p className='foothead'>About</p>
                        <p>Tadoba Andhari Tiger Reserve and Sanctuary is one of the noted wildlife destination popular for Tiger Safari in India. Tadoba Andhari. Tadoba Andhari Tiger Reserve and Sanctuary is one of the noted wildlife destination popular for Tiger Safari in India. Tadoba Andhari.</p>
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-12 ps-lg-5'>
                        <p className='foothead'>Useful Links</p>
                        <ul>
                            <li>About</li>
                            <li>Contact Us</li>
                            <li>Tour Packages</li>
                            <li>Online Safari</li>
                            <li>Hotels</li>
                        </ul>
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-12 ps-lg-5'>
                        <p className='foothead'>Contact Us</p>
                        <p>Office no 6, 3rd floor<br></br>
                        H-72, H Block Sector-73 </p>
                        <p>info@tadoba.com<br></br>
                        contact@tadoba.com</p>
                        <p>9988764563</p>
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-12 ps-lg-5'>
                        <p className='foothead'>Follow Us</p>
                        <div className='followicon'>
                            <FontAwesomeIcon icon={faFacebook} style={{ padding: '10px', fontSize: '20px' }}/>
                            <FontAwesomeIcon icon={faInstagram} style={{ padding: '10px', fontSize: '20px' }}/>
                            <FontAwesomeIcon icon={faLinkedin} style={{ padding: '10px', fontSize: '20px' }}/>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
</> 

    )
}

export default Footer
