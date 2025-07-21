const Offer = require('../models/offer');

exports.createOffers = async(req, res) => {
    try {
        const payload = req.body.flipkartOfferApiResponse;
        if(!payload?.data?.PAYMENT_OFFERS){
            return res.status(400).json({error: 'Invalid payload format'});
        }

        const offers = payload.data.PAYMENT_OFFERS;
        let noOfNewOffersCreated = 0;

        for(const offer of offers){
            const exists = await Offer.findOne({offerId: offer.offerId});

            if(!exists) {
                const newOffer = new Offer({
                    title: offer.title,
                    description: offer.description,
                    offerID: offer.offerId,
                    bankName: offer.bankName,
                    minAmount: offer.minAmount,
                    maxDiscount: offer.maxDiscount,
                    discountType: offer.discountType,
                    discountValue: offer.discountValue,
                    paymentInstruments: offer.paymentInstruments || []
                });

                await newOffer.save();
                noOfNewOffersCreated++;
            }
        }

        res.json({
            message: `${noOfNewOffersCreated} new offers created successfully.`,
            totalOffers: offers.length,
            createdOffers: noOfNewOffersCreated
        })
    } catch (error) {
        console.error('Error creating offers:', error);
        res.status(500).json({error: 'Internal server error while creating offers.'});
    }
}