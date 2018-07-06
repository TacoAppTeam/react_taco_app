export const config = {
  api_hostname: 'http://' + process.env.API_HOSTNAME || 'http://localhost',
  api_port: process.env.API_PORT || 8000
};
