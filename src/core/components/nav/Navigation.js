import styles from "../../css/nav/navigation.module.css";
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import {logout} from '../../context/User'


function Navigation() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData)

  return (
    <header>
        <div className={styles.logo_container}>
            <Link to="/welcome">Фармасвят</Link>
            <div className={styles.divider}></div>
            <i className="fa-solid fa-staff-aesculapius"></i>
        </div>
        <nav className={styles.navbar_container}>
            <ul className={styles.nav_buttons}>
                {user.email === undefined 
                ? <>
                    <li>
                        <Link to="/pharmacies">Аптеки</Link>
                    </li>
                    <li>
                        <Link to="/register">Регистрация</Link>
                    </li>
                    <li>
                        <Link to="/login">Вход</Link>
                    </li>
                    </>
                :   <>
                        <li className={styles.curr_pharmacy}>
                            <span id="pharmacyName">избрана Аптека: няма</span>
                        </li>
                        <li>
                            <Link to="/pharmacies">Аптеки</Link>
                        </li>
                        <li>
                            <Link to="/my-profile">Моят Профил</Link>
                        </li>
                        <li>
                            <Link to="/cart">Е-кошница</Link>
                        </li>
                        <li>
                            <Link onClick={() => dispatch(logout())} to="/logout">Изход</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    </header>
  )
}

export default Navigation