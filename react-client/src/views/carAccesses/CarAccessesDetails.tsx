import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {ICar} from "../../types/ICar";
import {CarsService} from "../../services/cars-service";
import {ICarAccess} from "../../types/ICarAccess";
import {CarAccessService} from "../../services/car-access-service";
import {CarAccessTypeService} from "../../services/car-access-type-service";
import {ICarAccessType} from "../../types/ICarAccessType";
import {IAppUser} from "../../types/IAppUser";
import {UserService} from "../../services/user-service";
import {useStore} from "react-context-hook";
import showDateTime from "../../utils/showDateTime";


const CarAccessesDetails = () => {
    const [resources] = useStore('resources')

    const {id} = useParams() as IRouteId;

    const [access, setAccess] = useState(null as ICarAccess | null);
    const [cars, setCars] = useState([] as ICar[]);
    const [accessTypes, setAccessTypes] = useState([] as ICarAccessType[]);
    const [users, setUsers] = useState([] as IAppUser[]);
    const [isEditing, setIsEditing] = useState(false)
    const service = new CarAccessService();
    const carsService = new CarsService();
    const carAccessTypesService = new CarAccessTypeService();
    const usersService = new UserService();

    useEffect(() => {
        service.get(id).then(res => {
            if (res.data) {
                setAccess(res.data);
            }
        })
        carsService.getAll().then(res => {
            if (res.data) {
                setCars(res.data);
            }
        })
        carAccessTypesService.getAll().then(res => {
            if (res.data) {
                setAccessTypes(res.data);
            }
        })
        usersService.getAll().then(res => {
            if (res.data) {
                setUsers(res.data)
            }
        })
    }, [])

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        service.put(access!).then((res) => {
            service.get(id).then(res => {
                if (res.data) {
                    setAccess(res.data);
                }
            })
            setIsEditing(false);
        })
    }

    const onClickDelete = () => {
        service.delete(access!.id).then(() => {
            window.location.href = '/accesses'
        })
    }

    return (
        <div className="container">
            <h1>{resources.Dto.CarAccess.AccessType}</h1>
            {access &&
            <>
                <div className="column">
                    <hr/>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Id
                            </div>
                            <div className="column is-8-desktop">
                                {access.id}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.CarAccess.AccessType}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {access.carAccessType?.name}
                                </div>
                                : <select value={access.carAccessTypeId}
                                          onChange={(e) => setAccess({...access, carAccessTypeId: e.target.value})}
                                          className="column is-8-desktop">
                                    {accessTypes.map((type) =>
                                        <option value={type.id} key={type.id}>
                                            {type.name}
                                        </option>
                                    )}
                                </select>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.CarAccess.Car}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {access.carId}
                                </div>
                                : <select value={access.carId}
                                          onChange={(e) => setAccess({...access, carId: e.target.value})}
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
                                {resources.Dto.CarAccess.AppUser}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {access.appUser?.displayName}
                                </div>
                                : <select value={access.appUserId}
                                          onChange={(e) => setAccess({...access, appUserId: e.target.value})}
                                          className="column is-8-desktop">
                                    {users.map((user) =>
                                        <option value={user.id} key={user.id}>
                                            {user.displayName}
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
                                {access.createdBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Shared.CreatedAt}
                            </div>
                            <div className="column is-8-desktop">
                                {showDateTime(access.createdAt)}
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
                    <NavLink className="button m-2" to="/types">{resources.Common.Back}</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default CarAccessesDetails;
