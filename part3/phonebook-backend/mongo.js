const mongoose = require("mongoose");
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

if (!password) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const url = `mongodb+srv://fullstack-open:${password}@cluster0.ezyhrth.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  Name: String,
  Number: Number,
});

const Entry = mongoose.model("Entry", phonebookSchema);

if (process.argv.length === 3) {
  Entry.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((entry) => {
      // console.log(`${entry.Name} ${entry.Number}`);
      console.log(entry);
    });

    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const entry = new Entry({
    Name: name,
    Number: number,
  });

  entry.save().then((result) => {
    console.log("Entry saved!");
    mongoose.connection.close();
  });
} else {
  console.log("Usage:");
  console.log("  To add: node mongo.js <password> <name> <number>");
  console.log("  To view: node mongo.js <password>");
  mongoose.connection.close();
}
