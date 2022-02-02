const Users = require('../database/Users');
const {ADMIN} = require('../configs/user_roles');

module.exports = async () => {
    const user = await Users.findOne({role: ADMIN});

    if (!user) {
        await Users.createHashPassword({
            name: 'User',
            nickName:'FirstAdmin',
            age:20,
            email: 'user.admin@site.com',
            phoneNumber:'+380000000000',
            password: 'Admin_password1',
            role: ADMIN
        });
    }
};
