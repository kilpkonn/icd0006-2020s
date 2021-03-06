import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {ICarAccess} from "../../types/ICarAccess";
import {CarAccessService} from "../../services/car-access-service";
import {useStore} from "react-context-hook";
import showDateTime from "../../utils/showDateTime";

const CarAccessesList = () => {
    const [resources] = useStore('resources')

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
                <NavLink to="/accesses/create">{resources.Common.Create}</NavLink>
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.CarAccess.AppUser}</th>
                        <th>{resources.Dto.CarAccess.Car}</th>
                        <th>{resources.Dto.CarAccess.AccessType}</th>
                        <th>{resources.Shared.CreatedAt}</th>
                        <th>{resources.Shared.CreatedBy}</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.CarAccess.AppUser}</th>
                        <th>{resources.Dto.CarAccess.Car}</th>
                        <th>{resources.Dto.CarAccess.AccessType}</th>
                        <th>{resources.Shared.CreatedAt}</th>
                        <th>{resources.Shared.CreatedBy}</th>
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
                                <td>{showDateTime(access.createdAt)}</td>
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
