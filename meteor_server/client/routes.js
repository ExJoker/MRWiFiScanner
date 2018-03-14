import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

FlowRouter.route('/', {
    action: function(params, queryParams) {
      import '/imports/ui/pages/wifi_overview';
      BlazeLayout.render('wifi_overview', queryParams);
    }
});

FlowRouter.route('/wifi_scan/:uuid', {
    action: function(params, queryParams) {
      import '/imports/ui/pages/wifi_scan';
      BlazeLayout.render('wifi_scan', params);
    }
});
