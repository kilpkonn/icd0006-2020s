import {NavLink} from "react-router-dom";
import {ICar} from "../../types/ICar";
import {useEffect, useState} from "react";
import Loader from "../../components/Loader";
import {EPageStatus} from "../../types/EPageStatus";
import {CarsService} from "../../services/cars-service";
import {useStore} from "react-context-hook";
import showDateTime from "../../utils/showDateTime";

const CarsList = () => {
    const [resources] = useStore('resources')

    const [cars, setCars] = useState([] as ICar[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const service = new CarsService();

    const loadData = async () => {
        let result = await service.getAll();

        if (result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCars(result.data!);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);


    return (
        <>
            <div className="columns m-6">
                <NavLink to="/cars/create">{resources.Common.Create}</NavLink>
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.Car.CarType}</th>
                        <th>{resources.Dto.Car.AppUser}</th>
                        <th>{resources.Shared.CreatedBy}</th>
                        <th>{resources.Shared.CreatedAt}</th>
                        <th>{resources.Shared.UpdatedBy}</th>
                        <th>{resources.Shared.UpdatedAt}</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.Car.CarType}</th>
                        <th>{resources.Dto.Car.AppUser}</th>
                        <th>{resources.Shared.CreatedBy}</th>
                        <th>{resources.Shared.CreatedAt}</th>
                        <th>{resources.Shared.UpdatedBy}</th>
                        <th>{resources.Shared.UpdatedAt}</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        cars.map((car) =>
                            <tr key={car.id}>
                                <th><NavLink to={'/cars/' + car.id}>{car.id}</NavLink></th>
                                <td>{car.carType?.name}</td>
                                <td>{car.appUser?.displayName}</td>
                                <td>{car.createdBy}</td>
                                <td>{showDateTime(car.createdAt)}</td>
                                <td>{car.updatedBy}</td>
                                <td>{showDateTime(car.updatedAt)}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <Loader {...pageStatus} />
        </>
    )
}

export default CarsList;
