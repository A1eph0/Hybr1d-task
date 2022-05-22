// Initiation of router and making the user model
const router = require('express').Router();
const User = require("../models/user.model")
const Catalog = require("../models/catalog.model")
const Order = require("../models/order.model")
const auth = require("../middleware/auth");

// GET the list of sellers
router.get("/list-of-sellers", auth, async (req, res) => {
    const sellers = await User.find({utype: "seller"})
    res.json(sellers)
})

// GET the catalogs of a seller
router.get("/seller-catalog/:seller_id", auth, async (req, res) => {
    const seller = await User.findById(req.params.seller_id)
    if (!seller) res.status(404).json('Error: User not found')

    Catalog
        .findOne({seller_email: seller.email})
        .then(catalog => res.json(catalog))
        .catch(err => res.status(404).json('Error: '+ err))
})

// POST new order
router.post("/create-order/:seller_id/", auth, async (req, res) => {
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
});

module.exports = router;