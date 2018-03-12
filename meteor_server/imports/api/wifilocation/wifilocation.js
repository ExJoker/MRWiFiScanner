import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const WiFiLocation = new Mongo.Collection('wifilocation');

if (Meteor.isServer) {
  Meteor.publish('wifilocation', function cubePublication(uuid) {
    return WiFiLocation.find({uuid: uuid});
  });
}
