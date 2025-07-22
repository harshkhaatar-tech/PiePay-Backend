// controllers/discountController.js
const Offer = require('../models/offer');

exports.getHighestDiscount = async (req, res) => {
    try {
        const { amountToPay, bankName, paymentInstrument } = req.query;

        if (!amountToPay || !bankName || !paymentInstrument) {
            return res.status(400).json({ error: 'amountToPay, bankName and paymentInstrument are required' });
        }

        const offers = await Offer.find({
            bankName: bankName.toUpperCase(),
            paymentInstruments: paymentInstrument.toUpperCase()
        });

        let highestDiscount = 0;

        for (const offer of offers) {
            if (amountToPay < offer.minAmount) continue;

            let discount = 0;

            if (offer.discountType === 'PERCENTAGE') {
                discount = Math.min((offer.discountValue / 100) * amountToPay, offer.maxDiscount);
            } else if (offer.discountType === 'FLAT') {
                discount = offer.discountValue;
            }

            highestDiscount = Math.max(highestDiscount, discount);
        }

        res.json({ highestDiscountAmount: Math.round(highestDiscount) });
    } catch (err) {
        console.error('Error in /highest-discount:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};
