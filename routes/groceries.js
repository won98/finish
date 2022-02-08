const { Router, request } = require("express");

const router = Router();

const groceriesList = [
  {
    item: "milk",
    quantity: "2",
  },
  {
    item: "cereal",
    quantity: "2",
  },
  {
    item: "choco",
    quantity: "2",
  },
];

router.use((req, res, next) => {
  if (req.session.user) next();
  else {
    res.send(401);
  }
});

router.get("/groceries", (req, res, next) => {
  res.cookie("visited", true, {
    maxAge: 60000,
  });
  res.send(groceriesList);
  next();
});

router.get("/groceries/:item", (req, res) => {
  console.log(req.cookies);
  const { item } = req.params;
  const groceriesItem = groceriesList.find((g) => g.item === item);
  res.send(groceriesItem);
});

router.post("/groceries", (req, res, next) => {
  console.log(req.body);
  groceriesList.push(req.body);
  res.send(201);
});

router.get("/groceries/shopping/cart", (req, res) => {
  const { cart } = req.session;
  if (!cart) {
    res.send("no items in cart");
  } else {
    res.send(cart);
  }
});
router.post("/groceries/shopping/cart/item", (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  const { cart } = req.session;
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.send(201);
});

module.exports = router;
//cookies 는 정보저장
