const router = require("express").Router();

const {
  getThoughts,
  singleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// api/thoughts
router.route("/").get(getThoughts).post(createThought);

// api/thoughts/:id
router
  .route("/:id")
  .get(singleThought)
  .put(updateThought)
  .delete(deleteThought);

// api/thoughts/:id/reactions
router.route("/:thoughtId/reactions").post(createReaction);

module.exports = router;
