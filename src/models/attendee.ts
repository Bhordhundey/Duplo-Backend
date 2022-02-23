import mongoose from "mongoose";
import { AttendeeAttrs } from "./attributes/attendee";

interface AttendeeModel extends mongoose.Model<AttendeeDoc> {
  build(attrs: AttendeeAttrs): AttendeeDoc;
}

interface AttendeeDoc extends mongoose.Document {
  fullname: string;
  date_of_birth: Date;
  bio: string;
}

const attendeeSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

attendeeSchema.statics.build = (attrs: AttendeeAttrs) => {
  return new Attendee(attrs);
};

const Attendee = mongoose.model<AttendeeDoc, AttendeeModel>(
  "Attendee",
  attendeeSchema
);

export { Attendee };
