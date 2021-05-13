import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import isAdmin from "../../utils/isAdmin";
import {ICarModel} from "../../types/ICarModel";
import {CarModelService} from "../../services/car-model-service";
import {NavLink, useParams} from "react-router-dom";
import {ICarMark} from "../../types/ICarMark";
import {CarMarkService} from "../../services/car-mark-service";


const ModelsDetails = () => {
    const {id} = useParams() as IRouteId;

    const [model, setModel] = useState(null as ICarModel | null);
    const [carMarks, setCarMarks] = useState([] as ICarMark[]);
    const [isEditing, setIsEditing] = useState(false)
    const service = new CarModelService();
    const carMarkService = new CarMarkService();

    useEffect(() => {
        service.get(id).then(res => {
            if (res.data) {
                setModel(res.data);
            }
        })
        carMarkService.getAll().then(res => {
            if (res.data) {
                setCarMarks(res.data);
            }
        })
    }, [])

    const admin = isAdmin();

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        service.put(model!).then((res) => {
            service.get(id).then(res => {
                if (res.data) {
                    setModel(res.data);
                }
            })
            setIsEditing(false);
        })
    }

    const onClickDelete = () => {
        service.delete(model!.id).then(() => {
            window.location.href = '/models'
        })
    }

    return (
        <div className="container">
            <h1>Car Model Details</h1>
            {model &&
            <>
                <div className="column">
                    <hr/>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Id
                            </div>
                            <div className="column is-8-desktop">
                                {model.id}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Name
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {model.name}
                                </div>
                                :
                                <input value={model.name}
                                       onChange={(e) => setModel({...model, name: e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Mark
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {model?.carMark?.name || ''}
                                </div>
                                : <select value={model.carMarkId}
                                          onChange={(e) => setModel({...model, carMarkId: e.target.value})}
                                          className="column is-8-desktop">
                                    {carMarks.map((mark) =>
                                        <option value={mark.id} key={mark.id}>
                                            {mark.name}
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
                                {model.createdBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Created At
                            </div>
                            <div className="column is-8-desktop">
                                {model.createdAt}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Updated By
                            </div>
                            <div className="column is-8-desktop">
                                {model.updatedBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Updated At
                            </div>
                            <div className="column is-8-desktop">
                                {model.updatedAt}
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

export default ModelsDetails;
