module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id: String,
      title: String,
      description: String,
      priority: String,
      completed: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const ToDo = mongoose.model("todos", schema);
  return ToDo;
};
