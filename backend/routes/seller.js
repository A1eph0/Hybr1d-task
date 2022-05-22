// Initiation of router and making the user model
const router = require('express').Router();
const Catalog = require("../models/catalog.model")
const Order = require("../models/order.model")
const auth = require("../middleware/auth");

// POST new catalog 
router.post("/create-catalog", auth, async (req, res) => {
    const user = await User.findOne({ email: req.user.email })
    if (user.utype === "seller")
    {
        const newCatalog = new Catalog({
            seller_email: req.user.email,
            product_list: req.body.products
        });

        newCatalog
            .save()
            .then(() => res.json("Order created!"))
            .catch(err => res.status(400).json('Error: ' + err))
    }
});

// GET the orders of the seller
router.get("/orders", auth, async (req, res) => {
    const user = await User.findOne({ email: req.user.email })
    if (user.utype === "seller")
    {
        Order
            .find({seller_email: req.user.email})
            .then(orders => res.json(orders))
            .catch(err => res.status(404).json('Error: '+ err))
    }
});

module.exports = router;
