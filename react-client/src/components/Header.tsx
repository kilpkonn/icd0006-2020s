import {NavLink} from "react-router-dom";
import getCookie from "../utils/getCookie";
import isAdmin from "../utils/isAdmin";
import {LangService} from "../services/lang-service";
import {useEffect, useState} from "react";
import {ISupportedLanguage} from "../types/ISupportedLanguage";

const Header = () => {
    const [languages, setLanguages] = useState(null as ISupportedLanguage[] | null);
    const [dropDownActive, setDropDownActive] = useState(false);
    const [selectedLang, setSelectedLang] = useState("");
    const langService = new LangService();

    useEffect(() => {
        if (languages == null) {
            langService.getSupportedLanguages().then(res => {
                if (res.data) {
                    console.log(res.data)
                    setLanguages(res.data)
                    if (res.data.length > 0) {
                        const prev  =res.data.filter(e => e.name === localStorage.getItem('lang'))
                        setSelectedLang(prev.length > 0 ? prev[0].nativeName : res.data[res.data.length - 1].nativeName)
                    }
                }
            })
        }
    })

    const onLogOutClicked = () => {
        document.cookie.split(";").forEach(function (c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        window.location.href = '/'
    }

    const setLang = (lang: ISupportedLanguage) => {
        setDropDownActive(false);
        setSelectedLang(lang.nativeName)
        localStorage.setItem('lang', lang.name);
        window.location.reload()
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
                <div className={"navbar-item dropdown" + (dropDownActive ? " is-active" : "")}>
                    <div className="dropdown-trigger">
                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => setDropDownActive(true)}>
                            <span>{selectedLang}</span>
                            <span className="icon is-small"><i className="fas fa-angle-down" aria-hidden="true"></i></span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            {
                                languages?.map(lang =>
                                    <a key={lang.name} className="dropdown-item" onClick={() => setLang(lang)}>
                                        {lang.nativeName}
                                    </a>
                                )
                            }
                        </div>
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
