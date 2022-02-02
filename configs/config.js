module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URR || 'mongodb://localhost:27017/proj_back',
    PORT: process.env.PORT || 5000,

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL|| 'sstecenko03@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD||'okten231',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_access',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'secret_refresh',
    JWT_FORGOT_PASSWORD: process.env.JWT_FORGOT_PASSWORD || 'secret_forgot',


}