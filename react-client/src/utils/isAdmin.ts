import {getParsedJwt} from "./jwt";
import {IJwt} from "../types/IJwt";
import getCookie from "./getCookie";

export default () => {
    const jwt = getCookie('jwt');
        return jwt && jwt !== '' && getParsedJwt<IJwt>(jwt)?.
            ['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.includes('Admin') || false
}
