import { Link } from 'react-router-dom'
import './NavBar.css'
import profilePlaceholder from '../../assets/Project_4-User_Profile-i.png'
import reactLogo from '../../assets/react.svg'

const NavBar = ({ user, setUser }) => {

  const signout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const profileImage = user?.profileImage || profilePlaceholder

  return (
    <nav>
      <div className="brand-logo">
        <img src={reactLogo} alt="Brand Logo" />
      </div>
      <ul>
        { user ?
          <>
            <li><Link to="/">Home</Link></li>
            <li><span onClick={signout}>Sign Out</span></li>
            <li>
              <div className='profile-image' style={{ backgroundImage: `url(${profileImage})` }}></div>
            </li>
          </>
        :
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        }
      </ul>
    </nav>
  )
}

export default NavBar