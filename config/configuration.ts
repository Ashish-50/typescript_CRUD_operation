
export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  mongodburl: process.env.MONGODBURL,
  jwtsecret:process.env.JWTSECRET
}); 
