export interface ResourceManager {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface Common {
    ResourceManager: ResourceManager;
    ErrorMessage_MaxLength: string;
    ErrorMessage_MinLength: string;
    ErrorMessage_Required: string;
    ErrorMessage_StringLengthMax: string;
    ErrorMessage_StringLengthMinMax: string;
    ErrorMessage_Range: string;
    ErrorMessage_ValueIsInvalid: string;
    ErrorMessage_AttemptedValueIsInvalid: string;
    ErrorMessage_MissingBindRequiredValue: string;
    ErrorMessage_MissingKeyOrValue: string;
    ErrorMessage_MissingRequestBodyRequiredValue: string;
    ErrorMessage_NonPropertyAttemptedValueIsInvalid: string;
    ErrorMessage_NonPropertyUnknownValueIsInvalid: string;
    ErrorMessage_NonPropertyValueMustBeANumber: string;
    ErrorMessage_UnknownValueIsInvalid: string;
    ErrorMessage_ValueMustBeANumber: string;
    ErrorMessage_ValueMustNotBeNull: string;
    ErrorMessage_NotValidPhone: string;
    ErrorMessage_Email: string;
    ErrorMessage_DisplayNameLength: string;
    Index: string;
    Create: string;
    Edit: string;
    Delete: string;
    DeleteConfirmation: string;
    Back: string;
    Details: string;
    Login: string;
    Logout: string;
    Register: string;
    Hello: string;
    Save: string;
}

export interface ResourceManager2 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface Shared {
    ResourceManager: ResourceManager2;
    Car: string;
    CarAccess: string;
    CarAccessType: string;
    CarErrorCode: string;
    CarMark: string;
    CarModel: string;
    CarType: string;
    GasRefill: string;
    Track: string;
    TrackLocation: string;
    HomePage: string;
    Welcome: string;
    PrivacyPolicy: string;
    Error: string;
    ErrorHeader: string;
    RequestId: string;
    WebApplication: string;
    Users: string;
    Roles: string;
    CreatedAt: string;
    CreatedBy: string;
    UpdatedAt: string;
    UpdatedBy: string;
}

export interface ResourceManager3 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface Login {
    ResourceManager: ResourceManager3;
    UseLocalAccount: string;
    ForgotPassword: string;
    RgeisterNewUser: string;
    ResendEmail: string;
    LoginThirdParty: string;
    NoThirdParty: string;
    LogIn: string;
    RememberMe: string;
    InvalidLoginAttempt: string;
    Password: string;
    Email: string;
}

export interface ResourceManager4 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface Register {
    ResourceManager: ResourceManager4;
    Email: string;
    FirstName: string;
    LastName: string;
    Password: string;
    ConfirmPassword: string;
    CreateNewAccount: string;
    PageTitle: string;
    ButtonRegister: string;
    Register3rdParty: string;
    DateOfBirth: string;
    Gender: string;
    Mandatory: string;
    PasswordsDontMatch: string;
    Register3rdPartyNotConfigured: string;
    DisplayName: string;
}

export interface ResourceManager5 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface Logout {
    ResourceManager: ResourceManager5;
    LogOut: string;
    ClickHereToLogOut: string;
    SuccessfullyLoggedOut: string;
}

export interface Layout {
    Languages: string;
}

export interface Shared2 {
    Layout: Layout;
}

export interface Views {
    Shared: Shared2;
}

export interface ResourceManager6 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface Car {
    ResourceManager: ResourceManager6;
    CarTypeId: string;
    CarType: string;
    AppUserId: string;
    AppUser: string;
}

export interface ResourceManager7 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface CarAccess {
    ResourceManager: ResourceManager7;
    AppUserId: string;
    AppUser: string;
    CarId: string;
    Car: string;
    AccessTypeId: string;
    AccessType: string;
}

export interface ResourceManager8 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface CarAccessType {
    ResourceManager: ResourceManager8;
    Name: string;
    AccessLevel: string;
}

export interface ResourceManager9 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface CarErrorCode {
    ResourceManager: ResourceManager9;
    CanId: string;
    CarId: string;
    Car: string;
    Data: string;
}

export interface ResourceManager10 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface CarMark {
    ResourceManager: ResourceManager10;
    Name: string;
    Models: string;
}

export interface ResourceManager11 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface CarModel {
    ResourceManager: ResourceManager11;
    Name: string;
    ReleaseDate: string;
    CarMarkId: string;
    CarMark: string;
    Types: string;
}

export interface ResourceManager12 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface CarType {
    ResourceManager: ResourceManager12;
    Name: string;
    ModelId: string;
    Model: string;
}

export interface ResourceManager13 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface GasRefill {
    ResourceManager: ResourceManager13;
    AmountRefilled: string;
    Timestamp: string;
    Cost: string;
    AppUserId: string;
    AppUser: string;
    CarId: string;
    Car: string;
}

export interface ResourceManager14 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface Track {
    ResourceManager: ResourceManager14;
    StartTimestamp: string;
    EndTimestamp: string;
    Distance: string;
    CarId: string;
    Car: string;
    AppUserId: string;
    AppUser: string;
}

export interface ResourceManager15 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface TrackLocation {
    ResourceManager: ResourceManager15;
    Lat: string;
    Lng: string;
    Elevation: string;
    Accuracy: string;
    ElevationAccuracy: string;
    Speed: string;
    Rpm: string;
    TrackId: string;
    Track: string;
}

export interface Dto {
    Car: Car;
    CarAccess: CarAccess;
    CarAccessType: CarAccessType;
    CarErrorCode: CarErrorCode;
    CarMark: CarMark;
    CarModel: CarModel;
    CarType: CarType;
    GasRefill: GasRefill;
    Track: Track;
    TrackLocation: TrackLocation;
}

export interface RootObject {
    Common: Common;
    Shared: Shared;
    Login: Login;
    Register: Register;
    Logout: Logout;
    Views: Views;
    Dto: Dto;
}


