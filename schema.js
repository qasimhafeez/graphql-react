const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

// Launch Type and add fields with graphql types
const LauchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType },
  }),
});

// Rocket Type and add fields with graphql types
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LauchType),
      async resolve(parent, args) {
        const res = await axios.get("https://api.spacexdata.com/v3/launches");
        return res.data;
      },
    },
    launch: {
      type: LauchType,
      args: {
        flight_number: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const res = await axios.get(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        );
        return res.data;
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      async resolve(parent, args) {
        const res = await axios.get("https://api.spacexdata.com/v3/rockets");
        return res.data;
      },
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const res = await axios.get(
          `https://api.spacexdata.com/v3/rockets/${args.id}`
        );
        return res.data;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
