"use strict";
(function () {
  var d;
  const chrome_runtime_info = chrome.runtime && chrome.runtime.id,
    manger_full_url = chrome.runtime.getURL("manager.html"),
    now_date = Date.now(),
    date_check = 1631048340000 > now_date ? !0 : !1,
    date_check_function = function (a) {
      date_check || 1 == a;
    },
    log_last_error = function () {
      var a = chrome.runtime.lastError;
      a && console.info(a.message);
      return a;
    },
    create_tab = function () {
      chrome.tabs.create({ url: manger_full_url }, function (a) {
        log_last_error();
        d = a.id;
      });
    },
    update_or_create_tab = function () {
      if (d)
        try {
          chrome.tabs.update(d, { active: !0 }, function () {
            chrome.runtime.lastError && create_tab();
          });
        } catch (a) {
          create_tab();
        }
      else create_tab();
    },
    version_check_callback = function (a) {
      a = (a && a.previousVersion) || "2.1.0.0";
    },
    another_date_check_function = function () {
      date_check_function(1);
    },
    apply_function_to_cookies = function (function_to_apply) {
      chrome.cookies.getAll({}, function (e) {
        log_last_error() ? function_to_apply(null) : function_to_apply(e);
      });
    },
    remove_cookies_by_attribute = function (a) {
      a.forEach((a) => {
        chrome.cookies.remove(
          {
            url: a.url,
            name: a.name,
          },
          function () {
            log_last_error();
            chrome.cookies.set(a, log_last_error);
          }
        );
      });
    },
    remove_cookies = function (a) {
      a.forEach((a) => {
        chrome.cookies.remove(a, log_last_error);
      });
    };
  try {
    chrome.runtime.onInstalled.addListener(version_check_callback);
  } catch (a) {
    log_last_error();
  }
  try {
    chrome.runtime.onStartup.addListener(another_date_check_function);
  } catch (a) {
    log_last_error();
  }
  chrome.runtime.onMessage.addListener((json_message, chrome_runtime, function_callback) => {
    if (chrome_runtime && chrome_runtime.id === chrome_runtime_info) {
      try {
        json_message = JSON.parse(json_message);
      } catch (v) {
        json_message = {};
      }
      1 == json_message.id
        ? ((d = (chrome_runtime && chrome_runtime.tab && chrome_runtime.tab.id) || null), function_callback())
        : 3 === json_message.id
        ? apply_function_to_cookies(function_callback)
        : 5 === json_message.id
        ? (remove_cookies_by_attribute(json_message.v || []), function_callback())
        : 7 === json_message.id && (remove_cookies(json_message.v || []), function_callback());
      return !0;
    }
    return !1;
  });
  chrome.browserAction.onClicked.addListener(update_or_create_tab);
})();
