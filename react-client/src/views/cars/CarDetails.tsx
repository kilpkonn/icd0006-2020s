import {NavLink, useParams} from "react-router-dom";
import {ICarType} from "../../types/ICarType";
import {ICar} from "../../types/ICar";
import {useEffect, useState} from "react";
import {IRouteId} from "../../types/IRouteId";
import {CarsService} from "../../services/cars-service";
import {CarTypeService} from "../../services/car-type-service";
import isAdmin from "../../utils/isAdmin";
import {useStore} from "react-context-hook";

const CarDetails = () => {
    const [resources] = useStore('resources')

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
            <h1>{resources.Common.Car}</h1>
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
                                        {resources.Dto.Car.CarType}
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
                                        {resources.Dto.Car.AppUser}
                                    </div>
                                    <div className="column is-8-desktop">
                                        {car.appUser?.displayName || ''}
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-4-desktop">
                                        {resources.Common.CreatedBy}
                                    </div>
                                    <div className="column is-8-desktop">
                                        {car.createdBy}
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-4-desktop">
                                        {resources.Common.CreatedAt}
                                    </div>
                                    <div className="column is-8-desktop">
                                        {car.createdAt}
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-4-desktop">
                                        {resources.Common.UpdatedBy}
                                    </div>
                                    <div className="column is-8-desktop">
                                        {car.updatedBy}
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-4-desktop">
                                        {resources.Common.UpdatedAt}
                                    </div>
                                    <div className="column is-8-desktop">
                                        {car.updatedAt}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-10-desktop m-6">
                            <h3>{resources.Common.CarErrorCode}</h3> <NavLink to={"/errors/create?carId=" + car.id}>{resources.Common.Create}</NavLink>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>{resources.Dto.CarErrorCode.CanId}</th>
                                    <th>{resources.Dto.CarErrorCode.Data}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    car.carErrorCodes?.map((code) =>
                                        <tr key={code.id}>
                                            <th><NavLink to={'/errors/' + code.id}>{code.id}</NavLink></th>
                                            <td>0x{code.canId.toString(16)}</td>
                                            <td>0x{code.canData.toString(16)}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="column is-10-desktop m-6">
                            <h3>{resources.Common.CarAccess}</h3> <NavLink to="/accesses/create">{resources.Common.Create}</NavLink>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>{resources.Dto.CarAccess.AppUser}</th>
                                    <th>{resources.Dto.CarAccess.CarAccessType}</th>
                                    <th>{resources.Common.CreatedAt}</th>
                                    <th>{resources.Common.CreatedBy}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    car.carAccesses?.map((access) =>
                                        <tr key={access.id}>
                                            <td><NavLink to={'/accesses/' + access.id}>{access.appUser?.displayName || ''}</NavLink></td>
                                            <td>{access.carAccessType?.name || ''}</td>
                                            <td>{access.createdAt}</td>
                                            <td>{access.createdBy}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
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
                            <NavLink className="button m-2" to="/cars">{resources.Common.Back}</NavLink>
                        </div>
                    </>
                    : <span className="alert-primary">...</span>
            }
        </div>
    )
}

export default CarDetails;
