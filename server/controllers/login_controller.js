import LoginModel from '../models/login_model.js'

export const createAccount = async (req, res) => {
    const { db, name, email, password, dob } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
        res.status(400).send('name is required!!')
    }
    if (!emailRegex.test(email)) {
        return res.status(400).send('Invalid email format!!');
    }
    if (!password) {
        res.status(400).send('password is required!!')
    }
    if (!dob) {
        res.status(400).send('bith date is required!!')
    }
    try {
        const result = await LoginModel.insertUser(db, email, name, password, dob);
        if (result.ok)
            res.status(201).json({result });
        return res.status(409).json({ result });
    } catch (error) {

        return res.status(500).json({ message: `Database error: ${error.message}`, error: error.message });
    }
}

export const login = async (req, res) => {
    const { db, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).send('Invalid email format!!');
    }
    if (!password) {
        res.status(400).send('password is required!!')
    }

    try {
        const result = await LoginModel.checkAuthentication(db, email, password);
        if (!result || result.length === 0) { return res.status(401).json({ message: 'Invalid email or password' }); }
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error}` });
    }
}



