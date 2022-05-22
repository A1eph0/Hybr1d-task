// Initiation of router and making the user model
const router = require('express').Router();
const User = require("../models/user.model")
const Catalog = require("../models/catalog.model")
const Order = require("../models/order.model")
const auth = require("../middleware/auth");

// POST new catalog 
router.post("/create-catalog", auth, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email })
        if (user.utype === "seller")
        {

            Catalog
                .updateOne({seller_email: req.user.email}, 
                            {seller_email: req.user.email, product_list: req.body.products}, 
                            {upsert: true})
                .then(() => res.json("Catolog created!"))
                .catch(err => res.status(400).json('Error: ' + err))
        }

        else return res.status(401).json('Error: Unauthorized')
    }catch (err) {
        res.status(500).json('Error :'+ err.message)
    }
});

// GET the orders of the seller
router.get("/orders", auth, async (req, res) => {
    try {
    const user = await User.findOne({ email: req.user.email })
    if (user.utype === "seller")
    {
        Order
            .find({seller_email: req.user.email})
            .then(orders => res.json(orders))
            .catch(err => res.status(404).json('Error: '+ err))
    }

    else return res.status(401).json('Error: Unauthorized')
    }catch (err) {
        res.status(500).json('Error :'+ err.message)
    }
});

module.exports = router;
