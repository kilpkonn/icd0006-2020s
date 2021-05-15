import {NavLink} from "react-router-dom";
import getCookie from "../utils/getCookie";
import isAdmin from "../utils/isAdmin";

const Header = () => {
    const onLogOutClicked = () => {
        localStorage.removeItem('token')
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        window.location.href = '/'
    }

    const jwt = getCookie('jwt');

    return (
        <header>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/> </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                       data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        {jwt && <NavLink to="/cars" className="navbar-item">Cars</NavLink>}
                        {jwt && <NavLink to="/errors" className="navbar-item">Errors</NavLink>}
                        {jwt && isAdmin() && <NavLink to="/accesstypes" className="navbar-item">Access Types</NavLink>}
                        {jwt && <NavLink to="/accesses" className="navbar-item">Accesses</NavLink>}
                        {jwt && <NavLink to="/refills" className="navbar-item">Refills</NavLink>}
                        {jwt && <NavLink to="/tracks" className="navbar-item">Tracks</NavLink>}
                        {jwt && <NavLink to="/locations" className="navbar-item">Track Locations</NavLink>}
                        <NavLink to="/marks" className="navbar-item">Marks</NavLink>
                        <NavLink to="/models" className="navbar-item">Models</NavLink>
                        <NavLink to="/types" className="navbar-item">Types</NavLink>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {(jwt || '') === ''
                                ? <>
                                    <a className="button is-primary" href="/register">
                                        <strong>Sign up</strong>
                                    </a>
                                    <a className="button is-light" href="/login">
                                        Log in
                                    </a>
                                </>
                                :
                                <button className="button is-light" onClick={onLogOutClicked}>
                                    Log out
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
