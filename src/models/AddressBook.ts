import mongoose, { Document, model, Schema } from "mongoose";

interface IAddressBook {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postCode: string;
  user: string;
  createdAt: Number;
}

export interface TAddressBook extends IAddressBook, Document {}

const AddressBookSchema: Schema<TAddressBook> = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Plesae Enter first name"],
  },
  lastName: {
    type: String,
    required: [true, "Plesae Enter Last name"],
  },

  phone: {
    type: String,
    required: [true, "Please add an Phone"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  city: {
    type: String,
    required: [true, "Please add an city"],
  },
  postCode: {
    type: String,
    required: [true, "Please add an post code"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please Add user ID"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AddressBook = model<TAddressBook>("AddressBook", AddressBookSchema);

export default AddressBook;
