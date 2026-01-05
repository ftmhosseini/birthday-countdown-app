// import result from 'underscore';
import LoginModel from '../models/login_model.js'

export const createAccount = async (req, res) => {
    const { name, email, password, dob } = req.body;
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
        const result = await LoginModel.insertUser(email, name, password, dob);
        res.status(201).json({result});
    } catch (error) {
        res.status(500).send('Database error: ' + error.message);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).send('Invalid email format!!');
    }
    if (!password) {
        res.status(400).send('password is required!!')
    }

    try {
        const result = await LoginModel.checkAuthentication(email, password);
        if (!result) return res.status(401).json({message: 'Invalid email or password'});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const getBirth = async (req, res) => {
    try {
        const result = await LoginModel.getInfo(email, password);
        if (!result) return res.status(401).json({message: 'Invalid email or password'});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


