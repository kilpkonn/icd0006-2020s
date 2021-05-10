import {AccountService} from "../../services/account-service";
import setSessionToken from "../../utils/setSessionToken";
import {useState} from "react";
import Alert, {EAlertClass} from "../../components/Alert";
import isAlphaNumeric from "../../utils/validation";

const Register = () => {
    const [registerData, setRegisterData] = useState({email: '', displayName: '', password: ''});
    const [alertMessage, setAlertMessage] = useState('');

    const onRegisterClicked = async (e: Event) => {
        e.preventDefault();
        if (registerData.email === '' || registerData.password === '') {
            setAlertMessage('Empty email or password!');
            return
        }

        if (isAlphaNumeric(registerData.password)) {
            setAlertMessage('Password must contain non alphanumeric characters!')
            return
        }

        setAlertMessage('');
        let response = await AccountService.register(registerData);
        if (response) {
            setSessionToken(response.token);
            window.location.href = "/cars"
        }
    }

    return (
        <div className="columns right has-text-centered mt-6 is-centered">
            <div className="column is-4-desktop mt-6 is-centered">
                <h1 className="title is-4">Register</h1>
                <p className="description">Register an account</p>
                <form onSubmit={(e) => onRegisterClicked(e.nativeEvent)}>
                    <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger}/>
                    <div className="field">
                        <div className="control">
                            <input value={registerData.email}
                                   onChange={e => setRegisterData({...registerData, email: e.target.value})}
                                   className="input is-medium" type="email" placeholder="Email"/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input value={registerData.displayName}
                                   onChange={e => setRegisterData({...registerData, displayName: e.target.value})}
                                   className="input is-medium" type="text"
                                   placeholder="Display Name"/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input value={registerData.password}
                                   onChange={e => setRegisterData({...registerData, password: e.target.value})}
                                   className="input is-medium" type="password"
                                   placeholder="Password"/>
                        </div>
                    </div>
                    <button onClick={e => onRegisterClicked(e.nativeEvent)} type="button"
                            className="button is-block is-primary is-fullwidth is-medium">Submit
                    </button>
                    <br/>
                    <small><em>Or you can login <a href="/login">here</a></em></small>
                </form>
            </div>
        </div>
    )
}

export default Register;
