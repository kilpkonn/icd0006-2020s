import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import {CarTypeService} from "../../services/car-type-service";
import isAdmin from "../../utils/isAdmin";
import {ICarModel} from "../../types/ICarModel";
import {CarModelService} from "../../services/car-model-service";
import {ICarType} from "../../types/ICarType";
import {NavLink, useParams} from "react-router-dom";
import {useStore} from "react-context-hook";
import showDateTime from "../../utils/showDateTime";


const TypesDetails = () => {
    const [resources] = useStore('resources')

    const {id} = useParams() as IRouteId;

    const [type, setType] = useState(null as ICarType | null);
    const [carModels, setCarModels] = useState([] as ICarModel[]);
    const [isEditing, setIsEditing] = useState(false)
    const service = new CarTypeService();
    const carModelService = new CarModelService();

    useEffect(() => {
        service.get(id).then(res => {
            if (res.data) {
                setType(res.data);
            }
        })
        carModelService.getAll().then(res => {
            if (res.data) {
                setCarModels(res.data);
            }
        })
    }, [])

    const admin = isAdmin();


    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        service.put(type!).then((res) => {
            service.get(id).then(res => {
                if (res.data) {
                    setType(res.data);
                }
            })
            setIsEditing(false);
        })
    }

    const onClickDelete = () => {
        service.delete(type!.id).then(() => {
            window.location.href = '/react//types'
        })
    }

    return (
        <div className="container">
            <h1>{resources.Shared.CarType}</h1>
            {type &&
            <>
                <div className="column">
                    <hr/>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Id
                            </div>
                            <div className="column is-8-desktop">
                                {type.id}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.CarType.Name}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {type.name}
                                </div>
                                :
                                <input value={type.name}
                                       onChange={(e) => setType({...type, name: e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.CarType.Model}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {type.carModel?.carMark?.name || ''} - {type.carModel?.name || ''}
                                </div>
                                : <select value={type.carModelId}
                                          onChange={(e) => setType({...type, carModelId: e.target.value})}
                                          className="column is-8-desktop">
                                    {carModels.map((model) =>
                                        <option value={model.id} key={model.id}>
                                            {model.carMark?.name} - {model.name}
                                        </option>
                                    )}
                                </select>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Shared.CreatedBy}
                            </div>
                            <div className="column is-8-desktop">
                                {type.createdBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Shared.CreatedAt}
                            </div>
                            <div className="column is-8-desktop">
                                {showDateTime(type.createdAt)}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Shared.UpdatedBy}
                            </div>
                            <div className="column is-8-desktop">
                                {type.updatedBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Shared.UpdatedAt}
                            </div>
                            <div className="column is-8-desktop">
                                {showDateTime(type.updatedAt)}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {(!isEditing && admin) &&
                    <button className="button m-2 is-primary" onClick={onClickEdit}>{resources.Common.Edit}</button>
                    }
                    {(isEditing && admin) &&
                    <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Save}</button>
                    }
                    {(admin) &&
                    <button className="button m-2 is-danger" onClick={onClickDelete}>{resources.Common.Delete}</button>
                    }
                    <NavLink className="button m-2" to="/types">{resources.Common.Back}</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default TypesDetails;
