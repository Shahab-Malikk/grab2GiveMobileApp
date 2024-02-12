// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, Users, Hotel, Ngo, NgoHotel, Volunteer, VolunteerNgo, Food, Category, ReservationRequest, Notification } = initSchema(schema);

export {
  Todo,
  Users,
  Hotel,
  Ngo,
  NgoHotel,
  Volunteer,
  VolunteerNgo,
  Food,
  Category,
  ReservationRequest,
  Notification
};