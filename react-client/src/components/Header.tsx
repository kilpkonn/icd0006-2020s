import {NavLink} from "react-router-dom";

const Header = () => {
    const onLogOutClicked = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    const token = localStorage.getItem('token')

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
                        <NavLink v-if="token" to="/cars" className="navbar-item">Cars</NavLink>
                        <NavLink to="/marks" className="navbar-item">Marks</NavLink>
                        <NavLink to="/models" className="navbar-item">Models</NavLink>
                        <NavLink to="/types" className="navbar-item">Types</NavLink>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {token === null
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
