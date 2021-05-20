import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {NavLink} from "react-router-dom";
import isAdmin from "../../utils/isAdmin";
import {ICarMark} from "../../types/ICarMark";
import {CarMarkService} from "../../services/car-mark-service";
import {useStore} from "react-context-hook";
import showDateTime from "../../utils/showDateTime";


const MarksList = () => {
    const [resources] = useStore('resources')

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
                <NavLink to="/react/marks/create">{resources.Common.Create}</NavLink>
                }
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.CarMark.Name}</th>
                        <th>{resources.Shared.UpdatedBy}</th>
                        <th>{resources.Shared.UpdatedAt}</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.CarMark.Name}</th>
                        <th>{resources.Shared.UpdatedBy}</th>
                        <th>{resources.Shared.UpdatedAt}</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        marks.map((mark) =>
                            <tr key={mark.id}>
                                <th><NavLink to={'/marks/' + mark.id}>{mark.id}</NavLink></th>
                                <td>{mark.name}</td>
                                <td>{showDateTime(mark.createdAt)}</td>
                                <td>{showDateTime(mark.updatedAt)}</td>
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
