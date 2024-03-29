// Initiation of router and making the user model
const router = require('express').Router();
const User = require("../models/user.model")
const Catalog = require("../models/catalog.model")
const Order = require("../models/order.model")
const auth = require("../middleware/auth");

// GET the list of sellers
router.get("/list-of-sellers", auth, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email })
        if (user.utype === "buyer")
        {
            const sellers = await User.find({utype: "seller"})
            
            res.json(sellers)
        }

        else return res.status(401).json('Error: Unauthorized')
    }catch (err) {
        res.status(500).json('Error :'+ err.message)
    }
});

// GET the catalogs of a seller
router.get("/seller-catalog/:seller_id", auth, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email })
        if (user.utype === "buyer")
        {
            const seller = await User.findById(req.params.seller_id)
            if (!seller) res.status(404).json('Error: User not found')

            Catalog
                .findOne({seller_email: seller.email})
                .then(catalog => res.json(catalog))
                .catch(err => res.status(404).json('Error: '+ err))
        }
        
        else return res.status(401).json('Error: Unauthorized')
    }catch (err) {
        res.status(500).json('Error :'+ err.message)
    }   
});

// POST new order
router.post("/create-order/:seller_id/", auth, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email })
        if (user.utype === "buyer")
        {
            const seller = await User.findById(req.params.seller_id)
            if (!seller) res.status(404).json('Error: User not found')

            const newOrder = new Order({
                seller_email: seller.email,
                buyer_email: req.user.email,
                product_list: req.body.products
            });

            newOrder
                .save()
                .then(() => res.json("Order created!"))
                .catch(err => res.status(400).json('Error: ' + err))
        }
        
        else return res.status(401).json('Error: Unauthorized')
    }catch (err) {
        res.status(500).json('Error :'+ err.message)
    }
});

module.exports = router;

// HII!!
