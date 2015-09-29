'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerNavigate extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'navigate';
  }

  getUrlByPathname(pathname) {
    var targets = {
      'email_campaigns/list': [
        'campaignmanager.php?session_id={session_id}',
        'action=list'
      ].join('&'),

      'email_campaigns/edit': [
        'campaignmanager.php?session_id={session_id}',
        'action=content',
        'camp_id={campaign_id}'
      ].join('&'),

      'email_analysis/list': [
        'repmanager.php?session_id={session_id}',
        'action=overview'
      ].join('&'),

      'email_analysis/details': [
        'repmanager.php?session_id={session_id}',
        'changed=0',
        'action=analysis',
        'camp_id={campaign_id}',
        'launch_id={launch_id}',
        'page=1',
        'search=',
        'step=1',
        'save_pref=on',
        'tabdetails_length=10',
        'tabfull_length=10',
        'campaign_category=',
        'admin=n',
        'status=current',
        'type=all'
      ].join('&')
    };

    if (pathname in targets) {
      return targets[pathname];
    }

    throw new Error('Error 404: Unknown pathname');
  }

  replaceUrlParams(url, params) {
    params.session_id = this.window.SUITE.config.session_id;

    for (var key in params) {
      if (params.hasOwnProperty(key) && key !== 'pathname') {
        url = url.replace('{' + key + '}', params[key]);
      }
    }

    return url;
  }

  handleMessage(message) {
    var url = this.getUrlByPathname(message.target.pathname);
    url = this.replaceUrlParams(url, message.target);

    if (this.window.SUITE.integration.unload.initialized) {
      return this.window.SUITE.integration.dialog.confirmNavigation(
        url,
        this.getNavigationConfirmOptions(message));
    } else {
      this.window.location.href = url;
    }
  }

  static create(global) {
    return new MessageHandlerNavigate(global);
  }

}

module.exports = MessageHandlerNavigate;
