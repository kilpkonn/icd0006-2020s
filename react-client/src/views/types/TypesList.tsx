import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {CarTypeService} from "../../services/car-type-service";
import {ICarType} from "../../types/ICarType";
import {NavLink} from "react-router-dom";
import isAdmin from "../../utils/isAdmin";


const TypesList = () => {
    const [types, setTypes] = useState([] as ICarType[]);
    const [pageStatus, setPageStatus] = useState({pageStatus: EPageStatus.Loading, statusCode: -1});
    const service = new CarTypeService();

    const loadData = async () => {
        let result = await service.getAll();

        if (result.data) {
            setPageStatus({pageStatus: EPageStatus.OK, statusCode: 0});
            setTypes(result.data!);
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
                    <NavLink to="/types/create">Create</NavLink>
                }
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        types.map((type) =>
                            <tr key={type.id}>
                                <th><NavLink to={'/types/' + type.id}>{type.id}</NavLink></th>
                                <td>{type.name}</td>
                                <td>{type.carModel?.name}</td>
                                <td>{type.createdAt}</td>
                                <td>{type.updatedAt}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TypesList;
