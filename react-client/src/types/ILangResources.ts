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

export interface ResourceManager3 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface Car {
    ResourceManager: ResourceManager3;
    CarTypeId: string;
    CarType: string;
    AppUserId: string;
    AppUser: string;
}

export interface ResourceManager4 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface CarAccess {
    ResourceManager: ResourceManager4;
    AppUserId: string;
    AppUser: string;
    CarId: string;
    Car: string;
    AccessTypeId: string;
    AccessType: string;
}

export interface ResourceManager5 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface CarAccessType {
    ResourceManager: ResourceManager5;
    Name: string;
    AccessLevel: string;
}

export interface ResourceManager6 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface CarErrorCode {
    ResourceManager: ResourceManager6;
    CanId: string;
    CarId: string;
    Car: string;
    Data: string;
}

export interface ResourceManager7 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface CarMark {
    ResourceManager: ResourceManager7;
    Name: string;
    Models: string;
}

export interface ResourceManager8 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface CarModel {
    ResourceManager: ResourceManager8;
    Name: string;
    ReleaseDate: string;
    CarMarkId: string;
    CarMark: string;
    Types: string;
}

export interface ResourceManager9 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface CarType {
    ResourceManager: ResourceManager9;
    Name: string;
    ModelId: string;
    Model: string;
}

export interface ResourceManager10 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface GasRefill {
    ResourceManager: ResourceManager10;
    AmountRefilled: string;
    Timestamp: string;
    Cost: string;
    AppUserId: string;
    AppUser: string;
    CarId: string;
    Car: string;
}

export interface ResourceManager11 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface Track {
    ResourceManager: ResourceManager11;
    StartTimestamp: string;
    EndTimestamp: string;
    Distance: string;
    CarId: string;
    Car: string;
    AppUserId: string;
    AppUser: string;
}

export interface ResourceManager12 {
    BaseName: string;
    IgnoreCase: boolean;
    ResourceSetType: string;
}

export interface TrackLocation {
    ResourceManager: ResourceManager12;
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
    Views: Views;
    Dto: Dto;
}


