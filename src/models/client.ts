import mongoose from "mongoose";
import { AttendeeAttrs } from "./attributes/attendee";
import { ClientAttrs } from "./attributes/client";

interface ClientModel extends mongoose.Model<ClientDoc> {
  build(attrs: ClientAttrs): ClientDoc;
}

interface ClientDoc extends mongoose.Document {
  name: string;
  api_key: string;
}

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    api_key: {
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

clientSchema.statics.build = (attrs: ClientAttrs) => {
  return new Client(attrs);
};

const Client = mongoose.model<ClientDoc, ClientModel>("Client", clientSchema);

export { Client };
