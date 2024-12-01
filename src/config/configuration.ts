export default () => ({
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN
});