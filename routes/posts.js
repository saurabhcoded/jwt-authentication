const { authVerify } = require("./verifyToken");
const router = require("express").Router();

router.get("/", authVerify, (req, res) => {
  res.json({
    user: req.user,
    posts: {
      title: "my first job",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam unde vel laborum, iure, quibusdam maxime ullam porro ex, voluptate fugiat dolorem numquam doloribus est vero reiciendis minus hic similique autem!",
    },
  });
});

module.exports = router;
