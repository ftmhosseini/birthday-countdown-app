// import result from 'underscore';
import CarouselModel from '../models/carousel_model.js'

export const load_carousels = async (req, res) => {
    try {
        const result = await CarouselModel.getImages();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:'Database error: ' + error.message});
    }
}

export const load_birth_carousel = async (req, res) => {
    try {
        const result = await CarouselModel.getImageBirth();
        if (!result) {
            return res.status(404).json({ message: 'No birthday carousel found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send('Server error');
    }
}