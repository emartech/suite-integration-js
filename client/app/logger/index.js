'use strict';

class Logger {
  static sendLog(action) {
    if (!window.e || !window.e.utils || !window.e.utils.sendLog || !window.e.utils.getCurrentConfig) {
      return;
    };

    window.e.utils.getTopUrl().then(url => {
      const list = {};
      const topFrameUrl = new URL(url);
      const searchParams = new URLSearchParams(topFrameUrl.search);

      ['action', 'r', 'service', 'service_product', 'show', 'step', 'from_action'].forEach(key => {
        const value = searchParams.get(key);

        if (value) {
          list[key] = JSON.stringify(value);
        }
      });

      window.e.utils.sendLog({
        action,
        level: 30,
        'service-name': 'suite-integration-js',
        name: 'suite-integration-js',
        user: Logger._getUserData(),
        time: (new Date()).toISOString(),
        referrer: Logger._getReferrer(),
        page_load_id: String(Math.random()),
        debug_data: JSON.stringify(list)
      });
    });


  }
  static _getReferrer() {
    return [window.document.referrer, window.document.location.href]
      .map(url => url.split('?')[0])
      .filter(url => url.length > 0);
  };

  static _getUserData() {
    const userConfig = window.e.utils.getCurrentConfig();
    return {
      customer_id: userConfig.customerId,
      admin_id: userConfig.adminId,
      date_format: userConfig.dateFormat,
      time_format: userConfig.timeFormat,
      language: userConfig.language,
      timezone: userConfig.timezone
    };
  };
}


module.exports = Logger;
