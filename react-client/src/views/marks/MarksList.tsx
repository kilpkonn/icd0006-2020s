import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {NavLink} from "react-router-dom";
import isAdmin from "../../utils/isAdmin";
import {ICarMark} from "../../types/ICarMark";
import {CarMarkService} from "../../services/car-mark-service";


const MarksList = () => {
    const [marks, setMarks] = useState([] as ICarMark[]);
    const [pageStatus, setPageStatus] = useState({pageStatus: EPageStatus.Loading, statusCode: -1});
    const service = new CarMarkService();

    const loadData = async () => {
        let result = await service.getAll();

        if (result.data) {
            setPageStatus({pageStatus: EPageStatus.OK, statusCode: 0});
            setMarks(result.data!);
        } else {
            setPageStatus({pageStatus: EPageStatus.Error, statusCode: result.statusCode});
        }
    }

    const admin = isAdmin();

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="columns m-6">
                {admin &&
                <NavLink to="/marks/create">Create</NavLink>
                }
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        marks.map((mark) =>
                            <tr key={mark.id}>
                                <th><NavLink to={'/marks/' + mark.id}>{mark.id}</NavLink></th>
                                <td>{mark.name}</td>
                                <td>{mark.createdAt}</td>
                                <td>{mark.updatedAt}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MarksList;
