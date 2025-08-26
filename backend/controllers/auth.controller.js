const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { env } = require('../configs/eviroment');
const AccountRepository = require('../repositories/account.repository');


class AuthController {
    // [POST] /login
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await AccountRepository.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email
                },
                env.JWT_SECRET,
                { expiresIn: env.EXPIRES_IN }
            );

            res.status(200).json({
                message: "Đăng nhập thành công",
                token
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Lỗi server" });
        }
    }
}

module.exports = AuthController;