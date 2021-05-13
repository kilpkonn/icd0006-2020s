import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import {CarTypeService} from "../../services/car-type-service";
import isAdmin from "../../utils/isAdmin";
import {ICarModel} from "../../types/ICarModel";
import {CarModelService} from "../../services/car-model-service";
import {ICarType} from "../../types/ICarType";
import {NavLink, useParams} from "react-router-dom";


const TypesDetails = () => {
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
            window.location.href = '/types'
        })
    }

    return (
        <div className="container">
            <h1>Car Type Details</h1>
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
                                Name
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
                                Model
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {type.carModel?.carMark.name || ''} - {type.carModel?.name || ''}
                                </div>
                                : <select value={type.carModelId}
                                          onChange={(e) => setType({...type, carModelId: e.target.value})}
                                          className="column is-8-desktop">
                                    {carModels.map((model) =>
                                        <option value={model.id} key={model.id}>
                                            {model.carMark.name} - {model.name}
                                        </option>
                                    )}
                                </select>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Created By
                            </div>
                            <div className="column is-8-desktop">
                                {type.createdBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Created At
                            </div>
                            <div className="column is-8-desktop">
                                {type.createdAt}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Updated By
                            </div>
                            <div className="column is-8-desktop">
                                {type.updatedBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Updated At
                            </div>
                            <div className="column is-8-desktop">
                                {type.updatedAt}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {(!isEditing && admin) &&
                    <button className="button m-2 is-primary" onClick={onClickEdit}>Edit</button>
                    }
                    {(isEditing && admin) &&
                    <button className="button m-2 is-success" onClick={onClickSave}>Save</button>
                    }
                    {(admin) &&
                    <button className="button m-2 is-danger" onClick={onClickDelete}>Delete</button>
                    }
                    <NavLink className="button m-2" to="/types">Back to List</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default TypesDetails;
