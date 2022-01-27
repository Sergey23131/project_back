module.exports = {

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URR || 'mongodb://localhost:27017/proj_back',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_access',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'secret_refresh',
    JWT_FORGOT_PASSWORD: process.env.JWT_FORGOT_PASSWORD || 'secret_forgot',
}