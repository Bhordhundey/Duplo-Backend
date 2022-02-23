import { AttendeeAttrs } from "./attendee";

export interface TalkAttrs {
  id?: string;
  code: string;
  name: string;
  description: string;
  attendees?: AttendeeAttrs[];
}
