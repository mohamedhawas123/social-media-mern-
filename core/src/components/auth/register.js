import e from 'express';
import React, {useState} from 'react'


const Register = ()=> {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData;

    const onsubmit = (e) => {
        e.preventDefault()
        if(password !== password2) {
            console.log('password do not match')
        }else {
            console.log(formData)
        }
    }

    return (
        <React.Fragment>

<h1 class="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onsubmit(e)} >
        <div className="form-group">
          <input type="text" placeholder="Name" value={name} onChange={e => setFormData(e.target.value) }   name="name" required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={ e=> setFormData(e.target.value) }   name="email" />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={e=> setFormData(e.target.value)}
            placeholder="Password"
            name="password"
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={e=> e.target.value}
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>

        </React.Fragment>
    )

}


export default Register