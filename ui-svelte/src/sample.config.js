const dev = {
  apiGateway: {
    REGION: "us-east-1",
    URL: ""
  }
};

const prod = {
  apiGateway: {
    REGION: "us-east-1",
    URL: ""
  }
};

const config = process.env.APP_STATE === "production" ? prod : dev;

export default {
  // Add common config
  ...config
};
