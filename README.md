# PiePay Backend Assignment – Offer Service

This repository contains the backend solution for PiePay's take-home assignment. It allows detecting, storing, and querying Flipkart payment offers using a clean and scalable Express.js + MongoDB API.

---

## Features

-  `POST /offer`: Store Flipkart offers from raw API response
-  `GET /highest-discount`: Calculate the highest applicable discount based on bank and payment instrument
-   Deduplication: Avoids storing duplicate offers by `offerId`
-   Support for `CREDIT`, `EMI_OPTIONS`, and more payment instruments

---

## Tech Stack

- **Node.js + Express**
- **MongoDB** (via Mongoose)
- **Nodemon** for development


## Setup Instructions

1. Clone the Repository
2. Install Dependencies via npm i
3. Start the server using - npm run dev

## Assumption

1. I tried to get the Flpikart's offer API and i was successfully able to get the URL but it was private so i was unable to get the payload and server response.
So,I used the below JSON structure to mock the API and complete the assignment.

{
  "flipkartOfferApiResponse": {
    "data": {
      "PAYMENT_OFFERS": [
        {
          "offerId": "OFFER123",
          "title": "10% off with AXIS Bank Credit Cards",
          "description": "Get 10% instant discount up to ₹500 on orders above ₹3000",
          "bankName": "AXIS",
          "minAmount": 3000,
          "maxDiscount": 500,
          "discountType": "PERCENTAGE",
          "discountValue": 10,
          "paymentInstruments": ["CREDIT", "EMI_OPTIONS"]
        },
        {
          "offerId": "OFFER456",
          "title": "₹200 off on IDFC Bank Credit Cards",
          "description": "Flat ₹200 off on orders above ₹2000",
          "bankName": "IDFC",
          "minAmount": 2000,
          "maxDiscount": 200,
          "discountType": "FLAT",
          "discountValue": 200,
          "paymentInstruments": ["CREDIT"]
        }
      ]
    }
  }
}
=

2. offerId is unique for each offer and can be used for deduplication.
3. Only bankName and paymentInstrument are used to determine applicability of an offer.
4. Flat and percentage-based discounts are the only types handled.


## Design Choices
1. MongoDB: Chosen for its flexibility with unstructured and nested offer data.
2. Express: Lightweight and fast setup for REST APIs.
3. Modular Code: Routes, controllers, models, and DB config are kept separate for maintainability.
4. Deduplication: Skips inserting offers that already exist based on offerId.

## Scaling GET /highest-discount
To handle 1,000 requests per second:
1. Indexing: Add compound indexes on bankName + paymentInstruments in MongoDB.
2. Caching: Use Redis to cache best offers per bank/instrument combo.
3. Connection Pooling: Tune MongoDB max pool size and Express concurrency limits.
4. Horizontal Scaling: Run multiple Node.js instances behind a load balancer (e.g., Nginx or AWS ALB).
5. Asynchronous Optimization: Ensure non-blocking, async I/O is used across the board.

## Improvements (if more time)
1. Add authentication using API keys or OAuth
2. Add pagination & filtering to offers list
3. Add expiry date handling for offers
4. Add automated tests with Jest or Mocha
5. Add Swagger UI for API documentation
6. Add Docker & Docker Compose setup
