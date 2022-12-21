import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../store/action/userAuth'

const NavBar = ()=> {


    const user = useSelector(state => state.user.userInfo)

    const dispatch = useDispatch()


    const submit = (e)=> {
        e.preventDefault(e)
        dispatch(logout())
    }
   

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                                     <i className='fas fa-code'> DevConnector </i> 

                </Link>
            </h1>
            <ul>
                {user && user.email? (
                    <React.Fragment>
                     <li> <Link to='#'>Developers</Link></li> 
                     <li> <a onClick={submit} > Log out  </a></li> 
                    </React.Fragment>
                     
                ):
                (
                <React.Fragment>
                     <li> <Link to='/register'>Register</Link></li> 
                <li> <Link to='/login'>Login</Link></li> 
                </React.Fragment>
               
                )
                }
            </ul>
        </nav>
    )
}

export default NavBar