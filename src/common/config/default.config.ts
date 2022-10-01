export default () => ({
  port: +process.env.PORT || 3000,
  environment: process.env.NODE_ENV,
  enableGraphqlPlayground: process.env.ENABLE_GRAPHQL_PLAYGROUND,
  slackToken: process.env.SLACK_TOKEN,
});
