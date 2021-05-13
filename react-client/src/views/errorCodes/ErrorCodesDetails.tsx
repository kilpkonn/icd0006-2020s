import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import isAdmin from "../../utils/isAdmin";
import {NavLink, useParams} from "react-router-dom";
import {ICarErrorCode} from "../../types/ICarErrorCode";
import {ICar} from "../../types/ICar";
import {CarErrorCodeService} from "../../services/car-error-code-service";
import {CarsService} from "../../services/cars-service";


const ErrorCodesDetails = () => {
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
            <h1>Car Error Codes</h1>
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
                                CAN id
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
                                CAN data
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
                                Car id
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
                                Created By
                            </div>
                            <div className="column is-8-desktop">
                                {errorCode.createdBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Created At
                            </div>
                            <div className="column is-8-desktop">
                                {errorCode.createdAt}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Updated By
                            </div>
                            <div className="column is-8-desktop">
                                {errorCode.updatedBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Updated At
                            </div>
                            <div className="column is-8-desktop">
                                {errorCode.updatedAt}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {(!isEditing) &&
                    <button className="button m-2 is-primary" onClick={onClickEdit}>Edit</button>
                    }
                    {(isEditing) &&
                    <button className="button m-2 is-success" onClick={onClickSave}>Save</button>
                    }
                    {// (admin) &&
                        <button className="button m-2 is-danger" onClick={onClickDelete}>Delete</button>
                    }
                    <NavLink className="button m-2" to="/types">Back to List</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default ErrorCodesDetails;
