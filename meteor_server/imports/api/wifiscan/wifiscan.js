import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const WiFiScan = new Mongo.Collection('wifiscan');

if (Meteor.isServer) {
  Meteor.publish('wifiscan', function cubePublication() {
    return WiFiScan.find({});
  });
}
