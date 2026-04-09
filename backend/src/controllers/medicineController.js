import Medicine from '../models/Medicine.js';
// 1. إضافة دواء جديد
export const addMedicine = async (req, res) => {
  try {
    if (!req.body.name || !req.body.price) {
      return res.status(400).json({ message: "برجاء كمال البيانات الأساسية" });
    }

    const newMedicine = await Medicine.create(req.body);
    res.status(201).json({ success: true, data: newMedicine });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. الحصول على كل الأدوية (مع فلترة ذكية)
export const getMedicines = async (req, res) => {
  try {
    // شغل سينيور: لو بعت في الـ query كلمة "lowStock"، يرجع النواقص بس
    let query = {};
    if (req.query.lowStock === 'true') {
      query = { $expr: { $lte: ["$stock", "$minThreshold"] } };
    }
    
    const medicines = await Medicine.find(query).sort({ expiryDate: 1 }); // ترتيب حسب الأقرب انتهاءً
    res.status(200).json({ success: true, count: medicines.length, data: medicines });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في السيرفر' });
  }
};

// 3. تحديث كمية الدواء (مثلاً عند البيع أو التوريد)
export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantityChange } = req.body; // رقم موجب للتوريد، سالب للبيع

    const medicine = await Medicine.findById(id);
    if (!medicine) return res.status(404).json({ message: 'الدواء غير موجود' });

    medicine.stock += quantityChange;
    await medicine.save();

    res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findByIdAndDelete(id);
    if (!medicine) return res.status(404).json({ message: 'الدواء غير موجود' });
    res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};