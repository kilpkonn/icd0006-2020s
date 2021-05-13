import {NavLink} from "react-router-dom";
import {ICar} from "../../types/ICar";
import {useEffect, useState} from "react";
import Loader from "../../components/Loader";
import {EPageStatus} from "../../types/EPageStatus";
import {CarsService} from "../../services/cars-service";

const CarsList = () => {
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
                <NavLink to="/cars/create">Create</NavLink>
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Type</th>
                        <th>User</th>
                        <th>Created By</th>
                        <th>Created At</th>
                        <th>Updated By</th>
                        <th>Updated At</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>Type</th>
                        <th>User</th>
                        <th>Created By</th>
                        <th>Created At</th>
                        <th>Updated By</th>
                        <th>Updated At</th>
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
                                <td>{car.createdAt}</td>
                                <td>{car.updatedBy}</td>
                                <td>{car.updatedAt}</td>
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
