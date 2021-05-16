import React from 'react';
import './assets/App.css';
import {Route, Switch} from 'react-router-dom';
import Header from "./components/Header";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import CarsList from "./views/cars/CarsList";
import CarDetails from "./views/cars/CarDetails";
import CarCreate from "./views/cars/CarCreate";
import TypesCreate from "./views/types/TypesCreate";
import TypesDetails from "./views/types/TypesDetails";
import TypesList from "./views/types/TypesList";
import ModelsList from "./views/models/ModelsList";
import ModelsDetails from "./views/models/ModelsDetails";
import ModelsCreate from "./views/models/ModelsCreate";
import MarksList from "./views/marks/MarksList";
import MarksCreate from "./views/marks/MarksCreate";
import MarksDetails from "./views/marks/MarksDetails";
import ErrorCodesCreate from "./views/errorCodes/ErrorCodesCreate";
import ErrorCodesDetails from "./views/errorCodes/ErrorCodesDetails";
import ErrorCodesList from "./views/errorCodes/ErrorCodesList";
import CarAccessesCreate from "./views/carAccesses/CarAccessesCreate";
import CarAccessesDetails from "./views/carAccesses/CarAccessesDetails";
import CarAccessesList from "./views/carAccesses/CarAccessesList";
import AccessTypesList from "./views/carAccessTypes/AccessTypesList";
import AccessTypesDetails from "./views/carAccessTypes/AccessTypesDetails";
import AccessTypesCreate from "./views/carAccessTypes/AccessTypesCreate";
import GasRefillsCreate from "./views/gasRefills/GasRefillsCreate";
import GasRefillsDetails from "./views/gasRefills/GasRefillsDetails";
import GasRefillsList from "./views/gasRefills/GasRefillsList";
import TracksCreate from "./views/tracks/TracksCreate";
import TracksDetails from "./views/tracks/TracksDetails";
import TracksList from "./views/tracks/TracksList";
import TrackLocationsCreate from "./views/trackLocations/TrackLocationsCreate";
import TrackLocationsDetails from "./views/trackLocations/TrackLocationsDetails";
import TrackLocationsList from "./views/trackLocations/TrackLocationsList";
import {withStore} from 'react-context-hook';
import {RootObject} from "./types/ILangResources";

function App() {
    return (
        <>
            <Header/>
            <div className="container">
                <main role="main" className="pb-3">
                    <Switch>
                        {/*<Route exact path="/" component={HomeIndex}/>*/}

                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>

                        <Route path="/cars/create" component={CarCreate}/>
                        <Route path="/cars/:id" component={CarDetails}/>
                        <Route path="/cars" component={CarsList}/>

                        <Route path="/types/create" component={TypesCreate}/>
                        <Route path="/types/:id" component={TypesDetails}/>
                        <Route path="/types" component={TypesList}/>

                        <Route path="/models/create" component={ModelsCreate}/>
                        <Route path="/models/:id" component={ModelsDetails}/>
                        <Route path="/models" component={ModelsList}/>

                        <Route path="/marks/create" component={MarksCreate}/>
                        <Route path="/marks/:id" component={MarksDetails}/>
                        <Route path="/marks" component={MarksList}/>

                        <Route path="/errors/create" component={ErrorCodesCreate}/>
                        <Route path="/errors/:id" component={ErrorCodesDetails}/>
                        <Route path="/errors" component={ErrorCodesList}/>

                        <Route path="/accesstypes/create" component={AccessTypesCreate}/>
                        <Route path="/accesstypes/:id" component={AccessTypesDetails}/>
                        <Route path="/accesstypes" component={AccessTypesList}/>

                        <Route path="/accesses/create" component={CarAccessesCreate}/>
                        <Route path="/accesses/:id" component={CarAccessesDetails}/>
                        <Route path="/accesses" component={CarAccessesList}/>

                        <Route path="/refills/create" component={GasRefillsCreate}/>
                        <Route path="/refills/:id" component={GasRefillsDetails}/>
                        <Route path="/refills" component={GasRefillsList}/>

                        <Route path="/tracks/create" component={TracksCreate}/>
                        <Route path="/tracks/:id" component={TracksDetails}/>
                        <Route path="/tracks" component={TracksList}/>

                        <Route path="/locations/create" component={TrackLocationsCreate}/>
                        <Route path="/locations/:id" component={TrackLocationsDetails}/>
                        <Route path="/locations" component={TrackLocationsList}/>

                        {/*<Route component={Page404}/>*/}
                    </Switch>
                </main>
            </div>
        </>
    );
}

const initialState = {
    resources: JSON.parse(
"{\"Common\":{\"ResourceManager\":{\"BaseName\":\"Resource.Base.Common\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"ErrorMessage_MaxLength\":\"Väli {0} ei saa olla pikem kui '{1}'.\",\"ErrorMessage_MinLength\":\"Väli {0} ei saa olla lühem kui '{1}'.\",\"ErrorMessage_Required\":\"Väli {0} on kohustuslik.\",\"ErrorMessage_StringLengthMax\":\"Väli {0} peab olema sõne maksimum pikkusega {1}.\",\"ErrorMessage_StringLengthMinMax\":\"Väli {0} peab olema sõne miinimum pikkusega {2} ja maksimum pikkusega {1}.\",\"ErrorMessage_Range\":\"Väli {0} peab olema vahemikus {1} kuni {2}.\",\"ErrorMessage_ValueIsInvalid\":\"Väärtus '{0}' ei ole sobilik.\",\"ErrorMessage_AttemptedValueIsInvalid\":\"Väärtus '{0}' ei ole sobilik väljale {1}.\",\"ErrorMessage_MissingBindRequiredValue\":\"Väli '{0}' ei saanud väärtust.\",\"ErrorMessage_MissingKeyOrValue\":\"Väärtus on vajalik.\",\"ErrorMessage_MissingRequestBodyRequiredValue\":\"Päringul puudub sisu.\",\"ErrorMessage_NonPropertyAttemptedValueIsInvalid\":\"Väärtus '{0}' ei ole korrektne.\",\"ErrorMessage_NonPropertyUnknownValueIsInvalid\":\"Väärtus ei ole korrektne.\",\"ErrorMessage_NonPropertyValueMustBeANumber\":\"Väli peab olema number.\",\"ErrorMessage_UnknownValueIsInvalid\":\"Väärtus ei sobi väljale '{0}'\",\"ErrorMessage_ValueMustBeANumber\":\"Väli '{0}' peab olema number.\",\"ErrorMessage_ValueMustNotBeNull\":\"Väärtus '{0}' ei ole valiidne.\",\"ErrorMessage_NotValidPhone\":\"Väli {0} ei ole valiidne telefoninumber.\",\"ErrorMessage_Email\":\"Väli {0} ei ole legaalne e-posti aadress.\",\"ErrorMessage_DisplayNameLength\":\"Nimi {0} peab olema vähemalt {2} ja maksimaalselt {1}tähemärki pikk.\",\"Index\":\"Algvaade\",\"Create\":\"Lisa uus\",\"Edit\":\"Muuda\",\"Delete\":\"Kustuta\",\"DeleteConfirmation\":\"Kas sa oled kustutamises kindel?\",\"Back\":\"Tagasi\",\"Details\":\"Deital vaade\",\"Login\":\"Sisene\",\"Logout\":\"Välju\",\"Register\":\"Registreeru\",\"Hello\":\"Tere\"},\"Shared\":{\"ResourceManager\":{\"BaseName\":\"Resources.Shared\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Car\":\"Auto\",\"CarAccess\":\"Auto ligipääs\",\"CarAccessType\":\"Ligipääsu tüüp\",\"CarErrorCode\":\"Auto vea kood\",\"CarMark\":\"Auto mark\",\"CarModel\":\"Auto mudel\",\"CarType\":\"Auto tüüp\",\"GasRefill\":\"Tankimine\",\"Track\":\"Teekond\",\"TrackLocation\":\"Teekonna punkt\",\"HomePage\":\"Avalehekülg\",\"Welcome\":\"Tere tulemast!\",\"PrivacyPolicy\":\"Andmekaitse\",\"Error\":\"Viga\",\"ErrorHeader\":\"Teie päringu töötlemisel tekkis viga.\",\"RequestId\":\"Päringu id\",\"WebApplication\":\"Auto rakendus\",\"Users\":\"Kasutajad\",\"Roles\":\"Rollid\"},\"Login\":{\"ResourceManager\":{\"BaseName\":\"Resource.Base.Areas.Identity.Pages.Account.Login\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"UseLocalAccount\":\"Sisene lokaalse kontoga.\",\"ForgotPassword\":\"Parool ununes?\",\"RgeisterNewUser\":\"Uus kasutaja\",\"ResendEmail\":\"Saada kinnitus\",\"LoginThirdParty\":\"Logi sisse kasutades\",\"NoThirdParty\":\"Väliseid autentijaid pole lisatud.\",\"LogIn\":\"Sisene\",\"RememberMe\":\"Jäta mind meelde?\",\"InvalidLoginAttempt\":\"Kasutajanimi/parool ei ole korrektsed.\",\"Password\":\"Parool\",\"Email\":\"E-post\"},\"Register\":{\"ResourceManager\":{\"BaseName\":\"Resource.Base.Areas.Identity.Pages.Account.Register\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Email\":\"E-post\",\"FirstName\":\"Eesnimi\",\"LastName\":\"Perenimi\",\"Password\":\"Parool\",\"ConfirmPassword\":\"Parooli kordus\",\"CreateNewAccount\":\"Loo uus kasutajakonto\",\"PageTitle\":\"Registreerumine\",\"ButtonRegister\":\"Loo konto\",\"Register3rdParty\":\"Registreeru kasutades:\",\"DateOfBirth\":\"Sünniaeg\",\"Gender\":\"Sugu\",\"Mandatory\":\"Kohustuslikud\",\"PasswordsDontMatch\":\"Parool ja parooli kordus ei ühti.\",\"Register3rdPartyNotConfigured\":\"Välised autentimisteenused pole seadistatud.\",\"DisplayName\":\"Nähtav nimi\"},\"Logout\":{\"ResourceManager\":{\"BaseName\":\"Resource.Base.Areas.Identity.Pages.Account.Logout\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"LogOut\":\"Logi välja\",\"ClickHereToLogOut\":\"Kliki siia, et välja logida\",\"SuccessfullyLoggedOut\":\"Sa oled edukalt välja loginud rakendusest.\"},\"Views\":{\"Shared\":{\"Layout\":{\"Languages\":\"Keele valik\"}}},\"Dto\":{\"Car\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.Car\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"CarTypeId\":\"Auto tüübi ID\",\"CarType\":\"Auto tüüp\",\"AppUserId\":\"Kasutaja ID\",\"AppUser\":\"Kasutaja\"},\"CarAccess\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.CarAccess\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"AppUserId\":\"Kasutaja ID\",\"AppUser\":\"Kasutaja\",\"CarId\":\"Auto ID\",\"Car\":\"Auto\",\"AccessTypeId\":\"Ligipääsu tüübi ID\",\"AccessType\":\"Ligipääsu tüüp\"},\"CarAccessType\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.CarAccessType\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Name\":\"Nimetus\",\"AccessLevel\":\"Ligipääsu aste\"},\"CarErrorCode\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.CarErrorCode\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"CanId\":\"CAN ID\",\"CarId\":\"Auto id\",\"Car\":\"Auto\",\"Data\":\"Andmed\"},\"CarMark\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.CarMark\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Name\":\"Nimi\",\"Models\":\"Mudelid\"},\"CarModel\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.CarModel\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Name\":\"Nimi\",\"ReleaseDate\":\"Väljalaske kuupäev\",\"CarMarkId\":\"Auto margi id\",\"CarMark\":\"Auto mark\",\"Types\":\"Tüübid\"},\"CarType\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.CarType\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Name\":\"Nimi\",\"ModelId\":\"Mudeli id\",\"Model\":\"Mudel\"},\"GasRefill\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.GasRefill\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"AmountRefilled\":\"Kogus\",\"Timestamp\":\"Kellaaeg\",\"Cost\":\"Hind\",\"AppUserId\":\"Kasutaja id\",\"AppUser\":\"Kasutaja\",\"CarId\":\"Auto id\",\"Car\":\"Auto\"},\"Track\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.Track\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"StartTimestamp\":\"Alguse aeg\",\"EndTimestamp\":\"Lõpu aeg\",\"Distance\":\"Pikkus\",\"CarId\":\"Auto id\",\"Car\":\"Auto\",\"AppUserId\":\"Kasutaja id\",\"AppUser\":\"Kasutaja\"},\"TrackLocation\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.TrackLocation\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Lat\":\"Pikkuskraad\",\"Lng\":\"Laiuskraad\",\"Elevation\":\"Kõrgus\",\"Accuracy\":\"Täpsus\",\"ElevationAccuracy\":\"Kõrguse täpsus\",\"Speed\":\"Kiirus\",\"Rpm\":\"Rpm\",\"TrackId\":\"Teekonna id\",\"Track\":\"Teekond\"}}}"
    ) as RootObject
}
export default withStore(App, initialState)
