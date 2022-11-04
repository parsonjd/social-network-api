const { Thought, User } = require("../models");

module.exports = {
  // GET all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // GET single thought
  singleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({
            message: "Thought does not exist",
          });
        }
        res.json(thought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // POST a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ message: "Thought created but no user with this id!" });
        }

        res.json({ message: "Thought sucessfully created!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // UPDATE a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedThought) => {
        if (!updatedThought) {
          return res.status(404).json({ message: "No thought with this ID!" });
        } else {
          res.json(updatedThought);
        }
      })
      .catch((err) => res.json(err));
  },

  // DELETE a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({
            message: "Error: Thought can't be found.",
          });
        }
        res.status(200).json({
          message: "Thought deleted successfully.",
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // POST a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought found with this ID!" });
        }
        res.json({
          message: "Successfully added reaction",
          thought,
        });
      })
      .catch((err) => res.json(err));
  },

  // DELETE a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought found with this ID!" });
        }
        res.json({
          message: "Successfully deleted reaction",
          thought,
        });
      })
      .catch((err) => res.json(err));
  },
};
