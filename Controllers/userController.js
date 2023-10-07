const User = require('../Models/user');
const bcrypt = require('bcrypt');
const logger = require('../logger'); // Sesuaikan dengan lokasi file logger


// Controller untuk mendaftar pengguna
const registerUser = async (req, res) => {
    try {
        const { email, gender, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            gender,
            password: hashedPassword,
            role
        });

        logger.info('register sukses', registerUser); // Log aktivitas info
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid, "isi nya ini")

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ username: user.username }, 'secretkey', { expiresIn: '1h' });
        logger.info('login sukses', isPasswordValid); // Log aktivitas info
        return res.json({ message: 'Login successful', token });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Login failed' });
    }
};

const getUsersWithPagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Ambil nilai halaman dari query parameter, default ke halaman 1 jika tidak ada
    const limit = parseInt(req.query.limit) || 10; // Ambil nilai batasan dari query parameter, default ke 10 jika tidak ada
    const offset = (page - 1) * limit; // Hitung offset berdasarkan halaman dan batasan

    try {
        const users = await User.findAll({
            limit,
            offset,
        });

        logger.info('login sukses', getUsersWithPagination); // Log aktivitas info
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching users' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsersWithPagination
};
