import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {NavLink} from "react-router-dom";
import isAdmin from "../../utils/isAdmin";
import {ICarAccessType} from "../../types/ICarAccessType";
import {CarAccessTypeService} from "../../services/car-access-type-service";
import {useStore} from "react-context-hook";


const AccessTypesList = () => {
    const [resources] = useStore('resources')

    const [accessTypes, setAccessTypes] = useState([] as ICarAccessType[]);
    const [pageStatus, setPageStatus] = useState({pageStatus: EPageStatus.Loading, statusCode: -1});
    const service = new CarAccessTypeService();

    const loadData = async () => {
        let result = await service.getAll();

        if (result.data) {
            setPageStatus({pageStatus: EPageStatus.OK, statusCode: 0});
            setAccessTypes(result.data!);
        } else {
            setPageStatus({pageStatus: EPageStatus.Error, statusCode: result.statusCode});
        }
    }

    const admin = isAdmin();

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="columns m-6">
                {admin &&
                <NavLink to="/accesstypes/create">{resources.Common.Create}</NavLink>
                }
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.CarAccessType.Name}</th>
                        <th>{resources.Dto.CarAccessType.AccessLevel}</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.CarAccessType.Name}</th>
                        <th>{resources.Dto.CarAccessType.AccessLevel}</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        accessTypes.map((accessType) =>
                            <tr key={accessType.id}>
                                <th><NavLink to={'/accesstypes/' + accessType.id}>{accessType.id}</NavLink></th>
                                <td>{accessType.name}</td>
                                <td>{accessType.accessLevel}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AccessTypesList;
