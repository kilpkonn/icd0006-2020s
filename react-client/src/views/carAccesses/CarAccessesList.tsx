import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {CarErrorCodeService} from "../../services/car-error-code-service";
import {ICarErrorCode} from "../../types/ICarErrorCode";
import {ICarAccess} from "../../types/ICarAccess";
import {CarAccessService} from "../../services/car-access-service";

const CarAccessesList = () => {
    const [accesses, setAccesses] = useState([] as ICarAccess[]);
    const [pageStatus, setPageStatus] = useState({pageStatus: EPageStatus.Loading, statusCode: -1});
    const service = new CarAccessService();

    const loadData = async () => {
        let result = await service.getAll();

        if (result.data) {
            setPageStatus({pageStatus: EPageStatus.OK, statusCode: 0});
            setAccesses(result.data!);
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
                <NavLink to="/accesses/create">Create</NavLink>
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Car</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Created By</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Car</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Created By</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        accesses.map((access) =>
                            <tr key={access.id}>
                                <th><NavLink to={'/accesses/' + access.id}>{access.id}</NavLink></th>
                                <td>{access.appUser?.displayName}</td>
                                <td>{access.carId}</td>
                                <td>{access.carAccessType?.name}</td>
                                <td>{access.createdAt}</td>
                                <td>{access.createdBy}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CarAccessesList;
