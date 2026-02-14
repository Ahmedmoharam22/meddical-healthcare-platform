import Service from '../models/serviceModel.js';
import asyncHandler from 'express-async-handler';
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
export const getServiceBySlug = asyncHandler(async (req, res) => {
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
});


// @desc    Create a service
// @route   POST /api/services
export const createService = asyncHandler(async (req, res) => {
    const { name, description, longDescription, icon, image } = req.body;

    // توليد الـ Slug تلقائياً من الاسم (شغل صايع للـ SEO)
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const service = new Service({
        name,
        description,
        longDescription,
        icon,
        image,
        slug
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
export const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (service) {
        await Service.deleteOne({ _id: service._id });
        res.json({ message: 'تم حذف الخدمة بنجاح' });
    } else {
        res.status(404);
        throw new Error('الخدمة غير موجودة');
    }
});

// @desc    Update a service
// @route   PUT /api/services/:id
export const updateService = asyncHandler(async (req, res) => {
    const { name, description, longDescription, icon, image } = req.body;
    const service = await Service.findById(req.params.id);

    if (service) {
        service.name = name || service.name;
        service.description = description || service.description;
        service.longDescription = longDescription || service.longDescription;
        service.icon = icon || service.icon;
        service.image = image || service.image;
        
        const updatedService = await service.save();
        res.json(updatedService);
    } else {
        res.status(404);
        throw new Error('الخدمة غير موجودة');
    }
});