const mongoose = require("mongoose");
require("dotenv").config();

const password = process.env.MONGO_DB_KEY;

const url = `mongodb+srv://phonebook:${password}@cluster0.eqeqj.mongodb.net/?retryWrites=true&w=majority`;

mongoose
    .connect(url)
    .then(() => console.log("connected to MongoDB"))
    .catch((error) => {
        console.log("error connecting to MongoDB", error.message);
    });

const personSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3 },
    number: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: (v) => {
                return /(\d{2,3})(-)(\d{5,})/.test(v);
            },
            // message: "phone number is invalid",
        },
    },
});

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Person", personSchema);
