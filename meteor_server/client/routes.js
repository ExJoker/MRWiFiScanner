import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

FlowRouter.route('/', {
    action: function(params, queryParams) {
      import '/imports/ui/pages/overview';
      BlazeLayout.render('overview', queryParams);
    }
});

FlowRouter.route('/show_scan/:uuid', {
    action: function(params, queryParams) {
      import '/imports/ui/pages/visualization';
      BlazeLayout.render('visualization', params);
    }
});
