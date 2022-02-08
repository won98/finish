const { Router, response } = require("express");

const router = Router();

router.use((req, res, next) => {
  if (req.session.user) next();
  else {
    res.send(401);
  }
});

const supermarket = [
  {
    id: 1,
    store: "Whole Foods",
    kilometer: 6,
  },
  {
    id: 2,
    store: "E-mart",
    kilometer: 4,
  },
  {
    id: 3,
    store: "Homeplus",
    kilometer: 8,
  },
  {
    id: 4,
    store: "Lottemart",
    kilometer: 1,
  },
  {
    id: 5,
    store: "E-mart",
    kilometer: 7,
  },
];
router.get("/markets", (req, res) => {
  const { kilometer } = req.query;
  const parsedKilometer = parseInt(kilometer);
  if (!isNaN(parsedKilometer)) {
    const filteredStores = supermarket.filter(
      (s) => s.kilometer <= parsedKilometer
    );
    res.send(filteredStores);
  } else res.send(supermarket);
});

module.exports = router;

//쿼리는 필터 기준 으로 정렬
