const Contact = require("../models/contact");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/jwt");

exports.createContact = (req, res) => {
  const { token, name, phone, email, linkedin, twitter } = req.body;

  try {
    // Verify the token with proper error handling
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);// For debugging

    const newContact = new Contact({
      name,
      phone,
      email,
      linkedin,
      twitter,
    });

    newContact.save()
    .then(newContact => {
      res.json({ message: "Contact created successfully", newContact });
      })
      .catch(err=>{console.log(err)})
  } catch (err) {
    console.error("Token verification error:", err); // Log the error details
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.editContact = async(req, res) => {
  const { token, name, field, value } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    const update = {};
    update[field] = value;
    console.log("harshit")
    const contact=await Contact.findOneAndUpdate(
      { name },
      { $set: update },
      { new: true },
    );
        if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact updated", contact });
  } catch (err) {
    console.error("Error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.searchContact = async (req, res) => {
  const { token, search_token } = req.body;

  try {
    jwt.verify(token, JWT_SECRET);

    const contacts = await Contact.find({
      name: new RegExp(search_token, "i"),
    });

    if (!contacts.length) {
      return res.status(404).json({ message: "No contacts found" });
    }

    const result = contacts.map((contact) => ({
      id: contact._id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      linkedin: contact.linkedin,
      twitter: contact.twitter,
    }));

    return res.status(200).json({ contacts: result });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
