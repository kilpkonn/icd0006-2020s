import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import isAdmin from "../../utils/isAdmin";
import {ICarModel} from "../../types/ICarModel";
import {CarModelService} from "../../services/car-model-service";
import {NavLink, useParams} from "react-router-dom";
import {ICarMark} from "../../types/ICarMark";
import {CarMarkService} from "../../services/car-mark-service";
import {useStore} from "react-context-hook";
import showDateTime from "../../utils/showDateTime";


const ModelsDetails = () => {
    const [resources] = useStore('resources')

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
            <h1>{resources.Shared.CarModel}</h1>
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
                                {resources.Dto.CarModel.Name}
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
                                {resources.Dto.CarModel.CarMark}
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
                                {resources.Shared.CreatedBy}
                            </div>
                            <div className="column is-8-desktop">
                                {model.createdBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Shared.CreatedAt}
                            </div>
                            <div className="column is-8-desktop">
                                {showDateTime(model.createdAt)}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Shared.UpdatedBy}
                            </div>
                            <div className="column is-8-desktop">
                                {model.updatedBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Shared.UpdatedAt}
                            </div>
                            <div className="column is-8-desktop">
                                {showDateTime(model.updatedAt)}
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
                    <NavLink className="button m-2" to="/react/models">{resources.Common.Back}</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default ModelsDetails;
