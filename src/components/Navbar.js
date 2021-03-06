import { Link, useLocation } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import styles from '../components/Navbar.module.css';

export default function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>
                    {location.pathname === '/' ? 'myMoney' : <Link to="/">myMoney</Link>}
                </li>

                {!user && (
                    <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    </>
                )}

                {user && (
                    <>
                        <li>hello, {user.displayName}</li>
                        <li>
                            <button className="btn" onClick={logout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}
