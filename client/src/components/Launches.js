import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LauncItem from "./LaunchItem";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export class Launches extends Component {
  render() {
    return (
      <div>
        <h3 className="my-3">Launches</h3>
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return <h3>Test</h3>;
          }}
        </Query>
      </div>
    );
  }
}

export default Launches;
