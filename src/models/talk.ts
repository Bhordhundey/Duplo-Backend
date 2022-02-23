import mongoose from "mongoose";
import { Attendee } from "./attendee";
import { AttendeeAttrs } from "./attributes/attendee";
import { TalkAttrs } from "./attributes/talk";

interface TalkModel extends mongoose.Model<TalkDoc> {
  build(attrs: TalkAttrs): TalkDoc;
}

interface TalkDoc extends mongoose.Document {
  code: string;
  name: string;
  description: string;
  attendees: AttendeeAttrs[];
}

const talkSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendee" }],
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

talkSchema.statics.build = (attrs: TalkAttrs) => {
  return new Talk(attrs);
};

const Talk = mongoose.model<TalkDoc, TalkModel>("Talk", talkSchema);

export { Talk };
