import Service from '../models/serviceModel.js';

// @desc    Get all services
// @route   GET /api/services
export const getServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get service by slug
// @route   GET /api/services/:slug
export const getServiceBySlug = async (req, res) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug });
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};