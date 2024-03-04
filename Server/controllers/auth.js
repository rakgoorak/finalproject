const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        var user = await User.findOne({ username });
        if (user) {
            // User with the same username already exists
            return res.status(400).send("มีชื่อผู้ใช้นี้อยู่แล้ว");
        }
        const salt = await bcrypt.genSalt(10);
        // Hash the password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            username,
            password: hashedPassword,
        });
        console.log(user);
        // Create a new user with the hashed password
        // Save the user in the database
        await user.save();

        // Respond with a success message or the user data if needed
        res.send("User registered successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Register Error");
    }
};
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        var user = await User.findOneAndUpdate({ username }, { new: true });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send("รหัสผ่านไม่ถูกต้อง");
            }
            var payload = {
                user: {
                    username: user.username,
                    role: user.role,
                    user_id: user._id,
                },
            };
            jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
                if (err) throw err;
                res.json({ token, payload });
            });
        } else {
            return res.status(400).send("ไม่มีบัญชีผู้ใช้นี้!");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("login Error");
    }
};

exports.currentUser = async (req, res) => {
    try {
        console.log("currentUser", req.user);
        const user = await User.findOne({ username: req.user.username })
            .select("-password")
            .exec();
        res.send(user);
    } catch (error) {
        console.log(err);
        res.status(500).send("currentUser err");
    }
};