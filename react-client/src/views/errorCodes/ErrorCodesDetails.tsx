import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import isAdmin from "../../utils/isAdmin";
import {NavLink, useParams} from "react-router-dom";
import {ICarErrorCode} from "../../types/ICarErrorCode";
import {ICar} from "../../types/ICar";
import {CarErrorCodeService} from "../../services/car-error-code-service";
import {CarsService} from "../../services/cars-service";
import {useStore} from "react-context-hook";
import showDateTime from "../../utils/showDateTime";


const ErrorCodesDetails = () => {
    const [resources] = useStore('resources')
    const {id} = useParams() as IRouteId;

    const [errorCode, setErrorCode] = useState(null as ICarErrorCode | null);
    const [cars, setCars] = useState([] as ICar[]);
    const [isEditing, setIsEditing] = useState(false)
    const service = new CarErrorCodeService();
    const carsService = new CarsService();

    useEffect(() => {
        service.get(id).then(res => {
            if (res.data) {
                setErrorCode(res.data);
            }
        })
        carsService.getAll().then(res => {
            if (res.data) {
                setCars(res.data);
            }
        })
    }, [])

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        service.put(errorCode!).then((res) => {
            service.get(id).then(res => {
                if (res.data) {
                    setErrorCode(res.data);
                }
            })
            setIsEditing(false);
        })
    }

    const onClickDelete = () => {
        service.delete(errorCode!.id).then(() => {
            window.location.href = '/errors'
        })
    }

    return (
        <div className="container">
            <h1>{resources.Shared.CarErrorCode}</h1>
            {errorCode &&
            <>
                <div className="column">
                    <hr/>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Id
                            </div>
                            <div className="column is-8-desktop">
                                {errorCode.id}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.CarErrorCode.CanId}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {errorCode.canId}
                                </div>
                                :
                                <input type="number"
                                       value={errorCode.canId}
                                       onChange={(e) => setErrorCode({...errorCode, canId: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.CarErrorCode.Data}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {errorCode.canData}
                                </div>
                                :
                                <input type="number"
                                       value={errorCode.canData}
                                       onChange={(e) => setErrorCode({...errorCode, canData: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.CarErrorCode.Car}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {errorCode.carId}
                                </div>
                                : <select value={errorCode.carId}
                                          onChange={(e) => setErrorCode({...errorCode, carId: e.target.value})}
                                          className="column is-8-desktop">
                                    {cars.map((car) =>
                                        <option value={car.id} key={car.id}>
                                            {car.carType?.carModel?.carMark?.name} - {car.carType?.carModel?.name} - {car.carType?.name}
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
                                {errorCode.createdBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Shared.CreatedAt}
                            </div>
                            <div className="column is-8-desktop">
                                {showDateTime(errorCode.createdAt)}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Shared.UpdatedBy}
                            </div>
                            <div className="column is-8-desktop">
                                {errorCode.updatedBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Shared.UpdatedAt}
                            </div>
                            <div className="column is-8-desktop">
                                {showDateTime(errorCode.updatedAt)}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {(!isEditing) &&
                    <button className="button m-2 is-primary" onClick={onClickEdit}>{resources.Common.Edit}</button>
                    }
                    {(isEditing) &&
                    <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Save}</button>
                    }
                    {// (admin) &&
                        <button className="button m-2 is-danger" onClick={onClickDelete}>{resources.Common.Delete}</button>
                    }
                    <NavLink className="button m-2" to="/react/types">{resources.Common.Back}</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default ErrorCodesDetails;
