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
"{\"Common\":{\"ResourceManager\":{\"BaseName\":\"Resource.Base.Common\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"ErrorMessage_MaxLength\":\"V??li {0} ei saa olla pikem kui '{1}'.\",\"ErrorMessage_MinLength\":\"V??li {0} ei saa olla l??hem kui '{1}'.\",\"ErrorMessage_Required\":\"V??li {0} on kohustuslik.\",\"ErrorMessage_StringLengthMax\":\"V??li {0} peab olema s??ne maksimum pikkusega {1}.\",\"ErrorMessage_StringLengthMinMax\":\"V??li {0} peab olema s??ne miinimum pikkusega {2} ja maksimum pikkusega {1}.\",\"ErrorMessage_Range\":\"V??li {0} peab olema vahemikus {1} kuni {2}.\",\"ErrorMessage_ValueIsInvalid\":\"V????rtus '{0}' ei ole sobilik.\",\"ErrorMessage_AttemptedValueIsInvalid\":\"V????rtus '{0}' ei ole sobilik v??ljale {1}.\",\"ErrorMessage_MissingBindRequiredValue\":\"V??li '{0}' ei saanud v????rtust.\",\"ErrorMessage_MissingKeyOrValue\":\"V????rtus on vajalik.\",\"ErrorMessage_MissingRequestBodyRequiredValue\":\"P??ringul puudub sisu.\",\"ErrorMessage_NonPropertyAttemptedValueIsInvalid\":\"V????rtus '{0}' ei ole korrektne.\",\"ErrorMessage_NonPropertyUnknownValueIsInvalid\":\"V????rtus ei ole korrektne.\",\"ErrorMessage_NonPropertyValueMustBeANumber\":\"V??li peab olema number.\",\"ErrorMessage_UnknownValueIsInvalid\":\"V????rtus ei sobi v??ljale '{0}'\",\"ErrorMessage_ValueMustBeANumber\":\"V??li '{0}' peab olema number.\",\"ErrorMessage_ValueMustNotBeNull\":\"V????rtus '{0}' ei ole valiidne.\",\"ErrorMessage_NotValidPhone\":\"V??li {0} ei ole valiidne telefoninumber.\",\"ErrorMessage_Email\":\"V??li {0} ei ole legaalne e-posti aadress.\",\"ErrorMessage_DisplayNameLength\":\"Nimi {0} peab olema v??hemalt {2} ja maksimaalselt {1}t??hem??rki pikk.\",\"Index\":\"Algvaade\",\"Create\":\"Lisa uus\",\"Edit\":\"Muuda\",\"Delete\":\"Kustuta\",\"DeleteConfirmation\":\"Kas sa oled kustutamises kindel?\",\"Back\":\"Tagasi\",\"Details\":\"Deital vaade\",\"Login\":\"Sisene\",\"Logout\":\"V??lju\",\"Register\":\"Registreeru\",\"Hello\":\"Tere\"},\"Shared\":{\"ResourceManager\":{\"BaseName\":\"Resources.Shared\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Car\":\"Auto\",\"CarAccess\":\"Auto ligip????s\",\"CarAccessType\":\"Ligip????su t????p\",\"CarErrorCode\":\"Auto vea kood\",\"CarMark\":\"Auto mark\",\"CarModel\":\"Auto mudel\",\"CarType\":\"Auto t????p\",\"GasRefill\":\"Tankimine\",\"Track\":\"Teekond\",\"TrackLocation\":\"Teekonna punkt\",\"HomePage\":\"Avalehek??lg\",\"Welcome\":\"Tere tulemast!\",\"PrivacyPolicy\":\"Andmekaitse\",\"Error\":\"Viga\",\"ErrorHeader\":\"Teie p??ringu t????tlemisel tekkis viga.\",\"RequestId\":\"P??ringu id\",\"WebApplication\":\"Auto rakendus\",\"Users\":\"Kasutajad\",\"Roles\":\"Rollid\"},\"Login\":{\"ResourceManager\":{\"BaseName\":\"Resource.Base.Areas.Identity.Pages.Account.Login\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"UseLocalAccount\":\"Sisene lokaalse kontoga.\",\"ForgotPassword\":\"Parool ununes?\",\"RgeisterNewUser\":\"Uus kasutaja\",\"ResendEmail\":\"Saada kinnitus\",\"LoginThirdParty\":\"Logi sisse kasutades\",\"NoThirdParty\":\"V??liseid autentijaid pole lisatud.\",\"LogIn\":\"Sisene\",\"RememberMe\":\"J??ta mind meelde?\",\"InvalidLoginAttempt\":\"Kasutajanimi/parool ei ole korrektsed.\",\"Password\":\"Parool\",\"Email\":\"E-post\"},\"Register\":{\"ResourceManager\":{\"BaseName\":\"Resource.Base.Areas.Identity.Pages.Account.Register\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Email\":\"E-post\",\"FirstName\":\"Eesnimi\",\"LastName\":\"Perenimi\",\"Password\":\"Parool\",\"ConfirmPassword\":\"Parooli kordus\",\"CreateNewAccount\":\"Loo uus kasutajakonto\",\"PageTitle\":\"Registreerumine\",\"ButtonRegister\":\"Loo konto\",\"Register3rdParty\":\"Registreeru kasutades:\",\"DateOfBirth\":\"S??nniaeg\",\"Gender\":\"Sugu\",\"Mandatory\":\"Kohustuslikud\",\"PasswordsDontMatch\":\"Parool ja parooli kordus ei ??hti.\",\"Register3rdPartyNotConfigured\":\"V??lised autentimisteenused pole seadistatud.\",\"DisplayName\":\"N??htav nimi\"},\"Logout\":{\"ResourceManager\":{\"BaseName\":\"Resource.Base.Areas.Identity.Pages.Account.Logout\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"LogOut\":\"Logi v??lja\",\"ClickHereToLogOut\":\"Kliki siia, et v??lja logida\",\"SuccessfullyLoggedOut\":\"Sa oled edukalt v??lja loginud rakendusest.\"},\"Views\":{\"Shared\":{\"Layout\":{\"Languages\":\"Keele valik\"}}},\"Dto\":{\"Car\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.Car\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"CarTypeId\":\"Auto t????bi ID\",\"CarType\":\"Auto t????p\",\"AppUserId\":\"Kasutaja ID\",\"AppUser\":\"Kasutaja\"},\"CarAccess\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.CarAccess\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"AppUserId\":\"Kasutaja ID\",\"AppUser\":\"Kasutaja\",\"CarId\":\"Auto ID\",\"Car\":\"Auto\",\"AccessTypeId\":\"Ligip????su t????bi ID\",\"AccessType\":\"Ligip????su t????p\"},\"CarAccessType\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.CarAccessType\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Name\":\"Nimetus\",\"AccessLevel\":\"Ligip????su aste\"},\"CarErrorCode\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.CarErrorCode\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"CanId\":\"CAN ID\",\"CarId\":\"Auto id\",\"Car\":\"Auto\",\"Data\":\"Andmed\"},\"CarMark\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.CarMark\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Name\":\"Nimi\",\"Models\":\"Mudelid\"},\"CarModel\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.CarModel\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Name\":\"Nimi\",\"ReleaseDate\":\"V??ljalaske kuup??ev\",\"CarMarkId\":\"Auto margi id\",\"CarMark\":\"Auto mark\",\"Types\":\"T????bid\"},\"CarType\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.CarType\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Name\":\"Nimi\",\"ModelId\":\"Mudeli id\",\"Model\":\"Mudel\"},\"GasRefill\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.GasRefill\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"AmountRefilled\":\"Kogus\",\"Timestamp\":\"Kellaaeg\",\"Cost\":\"Hind\",\"AppUserId\":\"Kasutaja id\",\"AppUser\":\"Kasutaja\",\"CarId\":\"Auto id\",\"Car\":\"Auto\"},\"Track\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.Track\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"StartTimestamp\":\"Alguse aeg\",\"EndTimestamp\":\"L??pu aeg\",\"Distance\":\"Pikkus\",\"CarId\":\"Auto id\",\"Car\":\"Auto\",\"AppUserId\":\"Kasutaja id\",\"AppUser\":\"Kasutaja\"},\"TrackLocation\":{\"ResourceManager\":{\"BaseName\":\"Resources.BLL.App.DTO.TrackLocation\",\"IgnoreCase\":false,\"ResourceSetType\":\"System.Resources.RuntimeResourceSet, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\"},\"Lat\":\"Pikkuskraad\",\"Lng\":\"Laiuskraad\",\"Elevation\":\"K??rgus\",\"Accuracy\":\"T??psus\",\"ElevationAccuracy\":\"K??rguse t??psus\",\"Speed\":\"Kiirus\",\"Rpm\":\"Rpm\",\"TrackId\":\"Teekonna id\",\"Track\":\"Teekond\"}}}"
    ) as RootObject
}
export default withStore(App, initialState)
