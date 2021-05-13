import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {CarErrorCodeService} from "../../services/car-error-code-service";
import {ICarErrorCode} from "../../types/ICarErrorCode";

const ErrorCodesList = () => {
    const [errorCodes, setErrorCodes] = useState([] as ICarErrorCode[]);
    const [pageStatus, setPageStatus] = useState({pageStatus: EPageStatus.Loading, statusCode: -1});
    const service = new CarErrorCodeService();

    const loadData = async () => {
        let result = await service.getAll();

        if (result.data) {
            setPageStatus({pageStatus: EPageStatus.OK, statusCode: 0});
            setErrorCodes(result.data!);
        } else {
            setPageStatus({pageStatus: EPageStatus.Error, statusCode: result.statusCode});
        }
    }
    useEffect(() => {
        loadData();
    }, []);
    return (
        <>
            <div className="columns m-6">
                <NavLink to="/errors/create">Create</NavLink>
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Car</th>
                        <th>Can Id</th>
                        <th>Can Data</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>Car</th>
                        <th>Can Id</th>
                        <th>Can Data</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        errorCodes.map((code) =>
                            <tr key={code.id}>
                                <th><NavLink to={'/errors/' + code.id}>{code.id}</NavLink></th>
                                <td>{code.canId}</td>
                                <td>{code.canData}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ErrorCodesList;
