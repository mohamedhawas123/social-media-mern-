import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {UserLogin} from '../../store/action/userAuth'

const Login = ()=> {

  const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        
        email: '',
        password: '',
       
    });

    const onchange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const {email, password} = formData;

    const onsubmit = async (e) => {
        e.preventDefault()
          console.log('success')
        
          dispatch(UserLogin(email, password))

    }

    return (
        <React.Fragment>

<h1 class="large text-primary">Log in</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onsubmit(e)} >
      
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
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/register">Sign Up</Link>
      </p>

        </React.Fragment>
    )

}


export default Login