import {NavLink, useParams} from "react-router-dom";
import {ICarType} from "../../types/ICarType";
import {ICar} from "../../types/ICar";
import {useEffect, useState} from "react";
import {IRouteId} from "../../types/IRouteId";
import {CarsService} from "../../services/cars-service";
import {CarTypeService} from "../../services/car-type-service";
import isAdmin from "../../utils/isAdmin";

const CarDetails = () => {
    const {id} = useParams() as IRouteId;

    const [car, setCar] = useState(null as ICar | null);
    const [carTypes, setCarTypes] = useState([] as ICarType[]);
    const [isEditing, setIsEditing] = useState(false)
    const service = new CarsService();
    const carTypesService = new CarTypeService();

    useEffect(() => {
        service.get(id).then(res => {
            if (res.data) {
                setCar(res.data);
            }
        })
        carTypesService.getAll().then(res => {
            if (res.data) {
                setCarTypes(res.data);
            }
        })
    }, [])

    const admin = isAdmin();


    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        service.put(car!).then((res) => {
            service.get(id).then(res => {
                if (res.data) {
                    setCar(res.data);
                }
            })
            setIsEditing(false);
        })
    }

    const onClickDelete = () => {
        service.delete(car!.id).then(() => {
            window.location.href = '/cars'
        })
    }

    return (
        <div className="container">
            <h1>Car Details</h1>
            {
                car ?
                    <>
                        <div className="column">
                            <hr/>
                            <div className="column">
                                <div className="columns">
                                    <div className="column is-4-desktop">
                                        Id
                                    </div>
                                    <div className="column is-8-desktop">
                                        {car.id}
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-4-desktop">
                                        Type
                                    </div>
                                    {
                                        !isEditing ? <div className="column is-8-desktop">
                                                {car!.carType?.carModel?.carMark?.name || ''} - {
                                                car!.carType?.carModel?.name || ''
                                            } - {car!.carType?.name || ''}
                                            </div>
                                            : <select onChange={(e) => setCar({...car, carTypeId: e.target.value})}
                                                      className="column is-8-desktop">
                                                {carTypes.map((type) =>
                                                    <option value={type.id} key={type.id}>
                                                        {type.carModel?.carMark?.name} - {type.carModel?.name} - {type.name}
                                                    </option>
                                                )
                                                }
                                            </select>
                                    }
                                </div>
                                <div className="columns">
                                    <div className="column is-4-desktop">
                                        User
                                    </div>
                                    <div className="column is-8-desktop">
                                        {car.appUser?.displayName || ''}
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-4-desktop">
                                        Created By
                                    </div>
                                    <div className="column is-8-desktop">
                                        {car.createdBy}
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-4-desktop">
                                        Created At
                                    </div>
                                    <div className="column is-8-desktop">
                                        {car.createdAt}
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-4-desktop">
                                        Updated By
                                    </div>
                                    <div className="column is-8-desktop">
                                        {car.updatedBy}
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-4-desktop">
                                        Updated At
                                    </div>
                                    <div className="column is-8-desktop">
                                        {car.updatedAt}
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
                            <NavLink className="button m-2" to="/cars">Back to List</NavLink>
                        </div>
                    </>
                    : <span className="alert-primary">Loading</span>
            }
        </div>
    )
}

export default CarDetails;
