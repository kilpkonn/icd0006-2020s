import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {NavLink} from "react-router-dom";
import isAdmin from "../../utils/isAdmin";
import {ICarModel} from "../../types/ICarModel";
import {CarModelService} from "../../services/car-model-service";
import {useStore} from "react-context-hook";
import showDateTime from "../../utils/showDateTime";


const ModelsList = () => {
    const [resources] = useStore('resources')

    const [models, setModels] = useState([] as ICarModel[]);
    const [pageStatus, setPageStatus] = useState({pageStatus: EPageStatus.Loading, statusCode: -1});
    const service = new CarModelService();

    const loadData = async () => {
        let result = await service.getAll();

        if (result.data) {
            setPageStatus({pageStatus: EPageStatus.OK, statusCode: 0});
            setModels(result.data!);
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
                <NavLink to="/models/create">{resources.Common.Create}</NavLink>
                }
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.CarModel.Name}</th>
                        <th>{resources.Dto.CarModel.CarMark}</th>
                        <th>{resources.Shared.CreatedAt}</th>
                        <th>{resources.Shared.UpdatedAt}</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.CarModel.Name}</th>
                        <th>{resources.Dto.CarModel.CarMark}</th>
                        <th>{resources.Shared.CreatedAt}</th>
                        <th>{resources.Shared.UpdatedAt}</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        models.map((model) =>
                            <tr key={model.id}>
                                <th><NavLink to={'/models/' + model.id}>{model.id}</NavLink></th>
                                <td>{model.name}</td>
                                <td>{model.carMark?.name}</td>
                                <td>{showDateTime(model.createdAt)}</td>
                                <td>{showDateTime(model.updatedAt)}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ModelsList;
