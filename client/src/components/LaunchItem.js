import React from "react";
import classNames from "classnames";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function LaunchItem({
  launch: { flight_number, mission_name, launch_date_local, launch_success },
}) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h5>
            Mission:{" "}
            <span
              className={classNames({
                "text-success": launch_success,
                "text-danger": !launch_success,
              })}
            >
              {mission_name}
            </span>
          </h5>
          <p>
            Date: <Moment format="YYYY-MM-DD HH:MM">{launch_date_local}</Moment>
          </p>
        </div>
        <div className="col-md-3">
          <Link className="btn btn-secondary" to={`/launch/${flight_number}`}>
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LaunchItem;
