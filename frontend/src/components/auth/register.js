import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {UserRegis} from '../../store/action/userAuth'

const Register = ()=> {


  const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const onchange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const {name, email, password, password2} = formData;

    const onsubmit = async (e) => {
        e.preventDefault()
        if(password !== password2) {
            console.log('password do not match')
        }else {
          console.log('success')
          dispatch(UserRegis(name, email, password))
        }
    }

    return (
        <React.Fragment>

<h1 class="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onsubmit(e)} >
        <div className="form-group">
          <input type="text" placeholder="Name" value={name} onChange={e => onchange(e) }   name="name" required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={ e=> onchange(e) }   name="email" />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={e=> onchange(e)}
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
            onChange={e=> onchange(e)}
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Log in</Link>
      </p>

        </React.Fragment>
    )

}


export default Register