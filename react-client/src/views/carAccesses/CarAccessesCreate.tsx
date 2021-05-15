import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import isAdmin from "../../utils/isAdmin";
import {NavLink, useParams} from "react-router-dom";
import {ICarErrorCode} from "../../types/ICarErrorCode";
import {ICar} from "../../types/ICar";
import {CarErrorCodeService} from "../../services/car-error-code-service";
import {CarsService} from "../../services/cars-service";
import {ICarAccess} from "../../types/ICarAccess";
import {CarAccessService} from "../../services/car-access-service";
import {CarAccessTypeService} from "../../services/car-access-type-service";
import {ICarAccessType} from "../../types/ICarAccessType";
import {IAppUser} from "../../types/IAppUser";
import {UserService} from "../../services/user-service";


const CarAccessesCreate = () => {
    const [access, setAccess] = useState({appUserId: '', carId: '', carAccessTypeId: ''} as ICarAccess);
    const [cars, setCars] = useState([] as ICar[]);
    const [accessTypes, setAccessTypes] = useState([] as ICarAccessType[]);
    const [users, setUsers] = useState([] as IAppUser[]);

    const service = new CarAccessService();
    const carsService = new CarsService();
    const carAccessTypesService = new CarAccessTypeService();
    const usersService = new UserService();

    useEffect(() => {
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
                setAccess({...access, appUserId: res.data[0].id || ''})
            }
        })
    }, [])


    const onClickSave = () => {
        console.log(access)
        service.post(access!).then((res) => {
            if (res.data) {
                window.location.href = `/accesses/${res.data.id}`
            }
        })
    }

    return (
        <div className="container">
            <h1>Car Access</h1>
            <div className="column">
                <hr/>
                <div className="column">
                    <div className="columns">
                        <div className="column is-4-desktop">
                            Access Type
                        </div>
                        <select value={access.carAccessTypeId}
                                onChange={(e) => setAccess({...access, carAccessTypeId: e.target.value})}
                                className="column is-8-desktop">
                            {accessTypes.map((type) =>
                                <option value={type.id} key={type.id}>
                                    {type.name}
                                </option>
                            )}
                        </select>

                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            Car
                        </div>
                        <select value={access.carId}
                                onChange={(e) => setAccess({...access, carId: e.target.value})}
                                className="column is-8-desktop">
                            {cars.map((car) =>
                                <option value={car.id} key={car.id}>
                                    {car.carType?.carModel?.carMark?.name} - {car.carType?.carModel?.name} - {car.carType?.name}
                                </option>
                            )}
                        </select>

                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            User
                        </div>
                        <select value={access.appUserId}
                                onChange={(e) => setAccess({...access, appUserId: e.target.value})}
                                className="column is-8-desktop">
                            {users.map((user) =>
                                <option value={user.id} key={user.id}>
                                    {user.displayName}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            Created By
                        </div>
                        <div className="column is-8-desktop">
                            {access.createdBy}
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            Created At
                        </div>
                        <div className="column is-8-desktop">
                            {access.createdAt}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button className="button m-2 is-success" onClick={onClickSave}>Save</button>
                <NavLink className="button m-2" to="/types">Back to List</NavLink>
            </div>
        </div>
    )
}

export default CarAccessesCreate;
