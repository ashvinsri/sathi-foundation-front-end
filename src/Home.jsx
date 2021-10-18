import { React, useState } from "react"
import "./index.css";
import $ from 'jquery';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Home = () => {
    let history=useHistory();
    const [user, changeUser] = useState({
        name: '',
        fname: '',
        gender: 'Male',
        address: '',
        pincode:'',
        postoffice:'',
        district:'',
        state:'',
        mno:'',
        adhar:'',
        email:''

    });


    const[res,changeRes]=useState("0")
    const[err,changeError]=useState("0")
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        changeUser({...user,[name]:value})
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user.fname)
        const users={
            name: user.name,
            fname: user.fname,
            gender: user.gender,
            address: user.address,
            pincode:user.pincode,
            postoffice:user.postoffice,
            district:user.district,
            state:user.state,
            mno:user.mno,
            adhar:user.adhar,
            email:user.email
        }
        console.log(users)
        
        axios.post('https://sathifoundation.pythonanywhere.com/member_create/',users)
        .then(response =>{
            history.push("\payment");
        }).catch(error=>{
            let s="";
            for (var key in error.response.data) {
                if (error.response.data.hasOwnProperty(key)) {
                  var val = error.response.data[key];
                  s=s+val[0]+"\n";
                }
                
              }
              alert(s);
        });
        console.log(res)
    };
    const pinCode = (event) =>{
        changeUser({...user,['pincode']:event.target.value});
        if(event.target.value.length==6)
        {
        let s= event.target.value;
        console.log(s);
        let url="https://api.postalpincode.in/pincode/"+s;
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then((jsonData) => {
          // jsonData is parsed json object received from url
          console.log(jsonData)
          let t="Choose from List"
          if(jsonData!=null)
        {
          let s='<option value="NaN">' + t + '</option>'+'<option value="'
          for(var i=0;i<jsonData[0].PostOffice.length;i++)
          {
            s += '<option value="' + jsonData[0].PostOffice[i].Name + '">' + jsonData[0].PostOffice[i].Name + '</option>';
          }
          $("#postoffice").html(s);
          let g= '<option value="NaN">' + t + '</option>'+'<option value="' + jsonData[0].PostOffice[0].District + '">' + jsonData[0].PostOffice[0].District + '</option>';
          $("#district").html(g);
          let d= '<option value="NaN">' + t + '</option>'+'<option value="' + jsonData[0].PostOffice[0].State + '">' + jsonData[0].PostOffice[0].State + '</option>';
          $("#state").html(d);
        
        }
        })
       }
    };

    return (
        <>
            <div>
                <section className="gate_pass">
                    <h1 className="title"> Application Form</h1>
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <div className="gatepass-form row">

                                <div className="form-field  col-lg-6">
                                    <input type="text" className="input-text" name="name" id="name" value={user.name} onChange={handleInput} required />
                                    <label htmlFor="name" class="label">Name</label>
                                </div>
                                <div className="form-field  col-lg-6">
                                    <input type="text" className="input-text" name="fname" id="fname" value={user.fname} onChange={handleInput} required />
                                    <label htmlFor="fname" class="label">Father Name</label>
                                </div>
                                <div className="form-field col-lg-6">
                                    <select id="gender" name="gender" className="input-text" value={user.gender} onChange={handleInput}>
                                        <option value="Male" selected="selected">Male</option>
                                        <option value="Female" selected="selected">Female</option>
                                    </select>
                                    <label htmlFor="gender" className="label">Gender</label>
                                </div>
                                <div className="form-field col-lg-6">
                                    <input type="text" className="input-text" name="address" id="address" value={user.address} onChange={handleInput} required />
                                    <label for="fname" className="label">Address</label>
                                </div>
                                <div className="form-field col-lg-6">
                                    <input className="input-text" type="text" name="pincode" id="pincode"  maxLength="6" pattern="[0-9]{6}" value={user.pincode}  onChange={pinCode} required />
                                </div>
                                <div className="form-field col-lg-6">    
                                <select className ="input-text" name='postoffice' id="postoffice" value={user.postoffice} onChange={handleInput}>

                                <option selected></option>
                                    </select>
                                    <label htmlFor="postoffice" class="label">Post Office</label>
                                </div>
                                <div className="form-field col-lg-6">
                                    <select className="input-text"  name='district' id="district" value={user.district} onChange={handleInput}>
                                    <option selected></option>
                                    </select>
                                    <label htmlFor="district" class="label">District</label>
                                </div>
                                <div className="form-field col-lg-6">
                                    <select className="input-text"  name='state' id="state" value={user.state} onChange={handleInput}>
                                    <option selected></option>
                                    </select>
                                    <label htmlFor="state" class="label">State</label>
                                </div>
                                <div className="form-field col-lg-6">
                                    <input type="text" class="input-text" name="mno" id="mno" maxLength="10" pattern="[0-9]{10}" value={user.mno} onChange={handleInput} required />
                                    <label htmlFor="mno" class ="label">Mobile No.</label>
                                </div>
                                <div className="form-field col-lg-6">
                                    <input type="text" class="input-text" name="adhar" id="adhar" maxLength="12" pattern="[0-9]{12}" value={user.adhar} onChange={handleInput} required />
                                    <label htmlFor="adhar" class ="label">Adhar No.</label>
                                </div>
                                <div className="form-field col-lg-6">
                                    <input type="text" className="input-text" name="email" id="email" value={user.email} onChange={handleInput} required />
                                    <label htmlFor="email" className="label">Email</label>
                                </div>
                                <div className="form-field col-lg-6">
                                <button type="submit" className="submit-btn">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
