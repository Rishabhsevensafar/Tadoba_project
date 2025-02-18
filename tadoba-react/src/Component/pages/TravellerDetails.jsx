import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function TravellerDetails() {
  useEffect(()=>{
            window.scrollTo(0, 0);
          },[])
  return (
    <>
    <div className="travellerHeader ">
          <h2>Traveller Details : </h2>
        </div>
    <div className="">
      <div className="container travellerBorder mb-5">
                <div className="safaridatetime mt-3">
          <h6>Safari Date: 20th Feb 2025 | Safari Time: 06:00 AM to 10:00 AM</h6>
        </div>
        {/* <div className="row details"> */}

        {/* <div className="col-sm-12 col-md-2 col-lg-2">
            <input type="text" placeholder="Enter Name" />
          </div>
          <div className="col-sm-12 col-md-2 col-lg-2">
            <select name="" id="">
                <option value="">Male</option>
                <option value="">Female</option>
            </select>
          </div>
          <div className="col-sm-12 col-md-2 col-lg-2">
            <input type="number"  placeholder="Age"/>
          </div>
          <div className="col-sm-12 col-md-2 col-lg-2">
            <select name="" id="">
                <option value="">Indian</option>
                <option value="">Foriegner</option>
            </select>
          </div>
          <div className="col-sm-12 col-md-2 col-lg-2">
            <select name="" id="">
                <option value="">Adhar Card</option>
                <option value="">Voter Id</option>
                <option value="">Passport</option>
                <option value="">Driving Licence</option>
                <option value="">OCI</option>
                <option value="">Any Other Id Card</option>
            </select>
          </div>
          <div className="col-sm-12 col-md-2 col-lg-2">
            <input type="number" className="ID Number"/>
          </div>
        </div> */}

        <div >
          <div className="d-flex justify-content-around mt-4">
            <div>
              <p>1. Adult</p>
            </div>
            <div>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Age" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Indian</option>
                <option value="">Foreigner</option>
              </select>
            </div>
            <div>
              <select name="" id="">
                <option value="">Adhar Card</option>
                <option value="">Voter Id</option>
                <option value="">Passport</option>
                <option value="">Driving Licence</option>
                <option value="">OCI</option>
                <option value="">Any Other Id Card</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="ID Number" />
            </div>
          </div>

          <div className="d-flex justify-content-around mt-2">
            <div>
              <p>2. Adult</p>
            </div>
            <div>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Age" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Indian</option>
                <option value="">Foreigner</option>
              </select>
            </div>
            <div>
              <select name="" id="">
                <option value="">Adhar Card</option>
                <option value="">Voter Id</option>
                <option value="">Passport</option>
                <option value="">Driving Licence</option>
                <option value="">OCI</option>
                <option value="">Any Other Id Card</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="ID Number" />
            </div>
          </div>

          <div className="d-flex justify-content-around mt-2">
            <div>
              <p>3. Adult</p>
            </div>
            <div>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Age" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Indian</option>
                <option value="">Foreigner</option>
              </select>
            </div>
            <div>
              <select name="" id="">
                <option value="">Adhar Card</option>
                <option value="">Voter Id</option>
                <option value="">Passport</option>
                <option value="">Driving Licence</option>
                <option value="">OCI</option>
                <option value="">Any Other Id Card</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="ID Number" />
            </div>
          </div>

          <div className="d-flex justify-content-around mt-2">
            <div>
              <p>4. Adult</p>
            </div>
            <div>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Age" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Indian</option>
                <option value="">Foreigner</option>
              </select>
            </div>
            <div>
              <select name="" id="">
                <option value="">Adhar Card</option>
                <option value="">Voter Id</option>
                <option value="">Passport</option>
                <option value="">Driving Licence</option>
                <option value="">OCI</option>
                <option value="">Any Other Id Card</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="ID Number" />
            </div>
          </div>

          <div className="d-flex justify-content-around mt-2">
            <div>
              <p>5. Adult</p>
            </div>
            <div>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Age" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Indian</option>
                <option value="">Foreigner</option>
              </select>
            </div>
            <div>
              <select name="" id="">
                <option value="">Adhar Card</option>
                <option value="">Voter Id</option>
                <option value="">Passport</option>
                <option value="">Driving Licence</option>
                <option value="">OCI</option>
                <option value="">Any Other Id Card</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="ID Number" />
            </div>
          </div>

          <div className="safaridatetime mt-3">
            <h6>Child ( Between 5 to 12 Years )</h6>
          </div>

          <div className="d-flex justify-content-around mt-4">
            <div>
              <p>1. Child</p>
            </div>
            <div>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Age" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Indian</option>
                <option value="">Foreigner</option>
              </select>
            </div>
            <div>
              <select name="" id="">
                <option value="">Adhar Card</option>
                <option value="">Voter Id</option>
                <option value="">Passport</option>
                <option value="">Driving Licence</option>
                <option value="">OCI</option>
                <option value="">Any Other Id Card</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="ID Number" />
            </div>
          </div>

          <div className="d-flex justify-content-around mt-2">
            <div>
              <p>2. Child</p>
            </div>
            <div>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Age" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Indian</option>
                <option value="">Foreigner</option>
              </select>
            </div>
            <div>
              <select name="" id="">
                <option value="">Adhar Card</option>
                <option value="">Voter Id</option>
                <option value="">Passport</option>
                <option value="">Driving Licence</option>
                <option value="">OCI</option>
                <option value="">Any Other Id Card</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="ID Number" />
            </div>
          </div>

          <div className="d-flex justify-content-around mt-2">
            <div>
              <p>3. Child</p>
            </div>
            <div>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Age" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Indian</option>
                <option value="">Foreigner</option>
              </select>
            </div>
            <div>
              <select name="" id="">
                <option value="">Adhar Card</option>
                <option value="">Voter Id</option>
                <option value="">Passport</option>
                <option value="">Driving Licence</option>
                <option value="">OCI</option>
                <option value="">Any Other Id Card</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="ID Number" />
            </div>
          </div>

          <div className="d-flex justify-content-around mt-2">
            <div>
              <p>4. Child</p>
            </div>
            <div>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Age" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Indian</option>
                <option value="">Foreigner</option>
              </select>
            </div>
            <div>
              <select name="" id="">
                <option value="">Adhar Card</option>
                <option value="">Voter Id</option>
                <option value="">Passport</option>
                <option value="">Driving Licence</option>
                <option value="">OCI</option>
                <option value="">Any Other Id Card</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="ID Number" />
            </div>
          </div>

          <div className="d-flex justify-content-around mt-2">
            <div>
              <p>5. Child</p>
            </div>
            <div>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Age" />
            </div>
            <div>
              <select name="" id="">
                <option value="">Indian</option>
                <option value="">Foreigner</option>
              </select>
            </div>
            <div>
              <select name="" id="">
                <option value="">Adhar Card</option>
                <option value="">Voter Id</option>
                <option value="">Passport</option>
                <option value="">Driving Licence</option>
                <option value="">OCI</option>
                <option value="">Any Other Id Card</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="ID Number" />
            </div>
          </div>
          <div className="mx-2 mt-3">
            <p>
              {" "}
              <input type="checkbox" /> I have read and accept the{" "}
              <Link to="/termandcondition">terms and conditions</Link>
            </p>
          </div>
          <button className="payable mt-2">
            Payable Amount 6100
          </button>
          <div className="mt-4">
            <table className="table w-100 table table-bordered">
              <thead>
                <th className="bookingtable" colSpan={4}>
                  Booking
                </th>
              </thead>
              <tbody>
                <tr>
                  <td style={{ width: "25%" }}>
                    <b>Safari Date:</b>
                  </td>
                  <td style={{ width: "25%" }}>2025/2/7</td>
                  <td style={{ width: "25%" }}>
                    <b>Safari Type:</b>
                  </td>
                  <td style={{ width: "25%" }}>Jeep</td>
                </tr>
                <tr>
                  <td style={{ width: "25%" }}>
                    <b>Safari Timing:</b>
                  </td>
                  <td style={{ width: "25%" }}>06:00 AM to 10:00 AM</td>
                  <td style={{ width: "25%" }}>
                    <b>Safari Zone:</b>
                  </td>
                  <td style={{ width: "25%" }}>Moharli Zone</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p className="bookingtable">
              <b>Declaration</b>
            </p>
            <p><h6>
              I Authorize Safari ,for using Mobile Number, Identity Proof &
              Email mentioned in this permit for intimation and verification
              purposes.</h6>
            </p>
            <ul>
              <li>
                All reservations inside the Tadoba National Park are provisional
                and can be changed or cancelled without prior information.
              </li>
              <li>Carrying of firearms of any kind is not permitted.</li>
              <li>No pets can be taken inside the Tadoba National Park.</li>
              <li>Walking or trekking is strictly prohibited.</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default TravellerDetails;
