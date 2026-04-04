import Schedule from '../models/Schedule.js';

// @desc    Get all schedules filtered by day
// @route   GET /api/schedules
export const getSchedules = async (req, res) => {
  try {
    const { day } = req.query; // لو باعت يوم معين في الـ URL
    const query = (day && day !== "") ? { day } : {};
    const schedules = await Schedule.find(query)
      .populate('doctor', 'name specialization slug image') // بنجيب بيانات الدكتور اللي محتاجينها بس
      .sort({ day: 1 });

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب الجدول", error: error.message });
  }
};

// @desc    Add new schedule entry
// @route   POST /api/schedules
export const addSchedule = async (req, res) => {
  try {
    const newEntry = await Schedule.create(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: "بيانات الجدول غير صحيحة" });
  }
};

// @desc    Update schedule entry
// @route   PUT /api/schedules/:id
export const updateSchedule = async (req, res) => {
  try {
    const updatedEntry = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: "بيانات الجدول غير صحيحة" });
  }
};

// @desc    Delete schedule entry
// @route   DELETE /api/schedules/:id
export const deleteSchedule = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "تم حذف الموعد" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في حذف الموعد" });
  }
};