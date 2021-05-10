import {useState} from "react";
import {AccountService} from "../../services/account-service";
import setSessionToken from "../../utils/setSessionToken";
import Alert, {EAlertClass} from "../../components/Alert";

const Login = () => {
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const [alertMessage, setAlertMessage] = useState('');

    const onLoginClicked = async (e: Event) => {
        e.preventDefault();
        if (loginData.email === '' || loginData.password === '') {
            setAlertMessage('Empty email or pawwsord!');
        }
        setAlertMessage('');
        let response = await AccountService.login(loginData);
        if (response) {
            setSessionToken(response.token);
            window.location.href = "/cars"
        }
    }


    return (
        <div className="columns right has-text-centered mt-6 is-centered">
            <div className="column is-4-desktop mt-6 is-centered">
                <h1 className="title is-4">Login</h1>
                <p className="description">Log in to already existing account</p>
                <form onSubmit={(e) => onLoginClicked(e.nativeEvent)}>
                    <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                    <div className="field">
                        <div className="control">
                            <input value={loginData.email}
                                   onChange={e => setLoginData({...loginData, email: e.target.value})}
                                   className="input is-medium" type="email" placeholder="Email"/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input value={loginData.password}
                                   onChange={e => setLoginData({...loginData, password: e.target.value})}
                                   className="input is-medium" type="password"
                                   placeholder="Password"/>
                        </div>
                    </div>
                    <button onClick={(e) => onLoginClicked(e.nativeEvent)} type="button"
                            className="button is-block is-primary is-fullwidth is-medium">
                        Submit
                    </button>
                    <br/>
                    <small><em>Or you can register <a href="/register">here</a></em></small>
                </form>
            </div>
        </div>
    )
}

export default Login;
