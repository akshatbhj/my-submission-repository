const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to database...");

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB 🎉");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
  },
  number: {
    type: String,
    required: [true, "Number is required"],
    validate: {
      validator: function (value) {
        // Example: Must be in format 12-345678 or 123-456789
        return /^\d{2,3}-\d+$/.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Format should be 12-345678`,
    },
  },
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Entry", phonebookSchema);
