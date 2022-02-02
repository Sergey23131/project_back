const {Schema, model} = require('mongoose');

const userRoles = require('../configs/user_roles');
const {passwordService} = require('../services');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    nickName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: 'user',
        enum: Object.values(userRoles)
    },
    password: {
        type: String,
        required: true,
        trim: true
    }

}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.statics = {
    async createHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});
    },

    async updateHashPassword(user, newPassword) {
        const password = await passwordService.hash(newPassword);

        await this.updateOne({_id: user.user_id.id}, {$set: {password}});
    }
};

module.exports = model('users', userSchema);