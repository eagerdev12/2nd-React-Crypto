/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import "../css/Header.css";
import Login from '../component/Login';
import {useHistory} from 'react-router-dom'


const Header: React.FC = () =>  {

  const [openLogin, setOpenLogin] = useState(false);
  const auth = JSON.parse(localStorage.getItem("Auth")!);  
  const history = useHistory()
 
  return (
    <div>
      <header>
        <div className='nav_menu'>
          <ul>
            <li>
              {" "}
               <a onClick={()=>history.push('/home')}><i className='fa fa-home' /> Home</a>
            </li>
            {auth !== null &&
            <li>
              {" "}
             <a onClick={()=>history.push('/trade')}> <i className='fa fa-line-chart' /> Trade </a>{" "}
            </li>
          }
          </ul>
          { auth === null ? 
          <ul id='nav_menu_data'>
            <li>
              {" "}
              <a onClick={() => setOpenLogin(true)}><i className='fa fa-user-circle'/> LogIn</a>{" "}
            </li>
          </ul>
          :
          <ul id='nav_menu_data'>
          <li>
            {" "}
            <i className='fas fa-sign-out-alt'></i>{" "}
            <div className="userImg">
              <img className="usrHeadImg" alt="profile" src="images/3125199.jpg" />
              <div className="userEmail">{auth.email}</div>
            </div>
          </li>
        </ul>
        }
          </div>
         </header>
        {openLogin && <Login open={openLogin} setOpenLogin={setOpenLogin}  /> }
        
         </div> 
  );
}
export default Header;
