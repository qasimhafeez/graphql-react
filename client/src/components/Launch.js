import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Moment from "react-moment";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <Fragment>
        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            const {
              mission_name,
              flight_number,
              launch_year,
              launch_date_local,
              launch_success,
              rocket: { rocket_id, rocket_name, rocket_type },
            } = data.launch;

            return (
              <Fragment>
                <h4 className="my-3">
                  <span className="text-dark">Mission:</span> {mission_name}
                </h4>
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="mb-3">Launch Details</h5>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <strong>Flight Number:</strong> {flight_number}
                      </li>
                      <li className="list-group-item">
                        <strong>Launch Year:</strong> {launch_year}
                      </li>
                      <li className="list-group-item">
                        <strong>Launch Local Date:</strong>{" "}
                        <Moment format="YYYY-MM-DD HH-MM">
                          {launch_date_local}
                        </Moment>
                      </li>
                      <li className="list-group-item">
                        <strong>Launch Successful:</strong>{" "}
                        <span
                          className={classNames({
                            "text-success": launch_success,
                            "text-danger": !launch_success,
                          })}
                        >
                          {launch_success ? "Yes" : "No"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <h5 className="mb-3">Rocket details</h5>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <strong>Rocket ID:</strong> {rocket_id}
                      </li>
                      <li className="list-group-item">
                        <strong>Rocket Name:</strong> {rocket_name}
                      </li>
                      <li className="list-group-item">
                        <strong>Rocket Type:</strong> {rocket_type}
                      </li>
                    </ul>
                  </div>
                </div>
                <hr />

                <Link to="/" className="btn btn-secondary">
                  Back
                </Link>
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launch;
