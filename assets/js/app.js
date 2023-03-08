var _this4 = this;
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }
/* inspired by axios */
var AjaxRequest = /*#__PURE__*/function () {
  function AjaxRequest() {}
  var _proto = AjaxRequest.prototype;
  _proto.createError = function createError(message, code, request, response) {
    var error = new Error(message);
    error.error = true;
    if (code) {
      error.code = code;
    }
    error.request = request;
    error.response = response;
    return error;
  };
  _proto.settle = function settle(resolve, reject, response) {
    var _this = this;
    var validateStatus = function validateStatus(status) {
      _newArrowCheck(this, _this);
      return status >= 200 && status < 300;
    }.bind(this);
    // Note: status is not exposed by XDomainRequest
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(this.createError('Request failed with status code ' + response.status, null, response.request, response));
    }
  };
  _proto.request = function request(method, url, formData, configureFn) {
    var _this2 = this;
    if (formData === void 0) {
      formData = null;
    }
    return new Promise(function (resolve, reject) {
      var _this3 = this;
      _newArrowCheck(this, _this2);
      // tslint:disable-next-line
      var request = new XMLHttpRequest();
      var loadEvent = 'onreadystatechange';
      request.open(method, url, true);
      // Listen for ready state
      request[loadEvent] = function () {
        _newArrowCheck(this, _this3);
        if (!request || request.readyState !== 4) {
          return;
        }
        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // Prepare the response
        var responseHeaders = request.getAllResponseHeaders();
        var responseData = request.responseText;
        var contentType = request.getResponseHeader('Content-Type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          responseData = JSON.parse(responseData);
        } else {
          try {
            responseData = JSON.parse(responseData);
          } catch (e) {
            /* ignore, possibly non json response */
          }
        }
        var response = {
          data: responseData,
          // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
          status: request.status === 1223 ? 204 : request.status,
          statusText: request.status === 1223 ? 'No Content' : request.statusText,
          headers: responseHeaders,
          request: request
        };
        this.settle(resolve, reject, response);
        // Clean up request
        request = null;
      }.bind(this);
      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function () {
        _newArrowCheck(this, _this3);
        if (!request) {
          return;
        }
        reject(this.createError('Request aborted', 'ECONNABORTED', request));
        // Clean up request
        request = null;
      }.bind(this);
      // Handle low level network errors
      request.onerror = function () {
        _newArrowCheck(this, _this3);
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(this.createError('Network Error', null, request));
        // Clean up request
        request = null;
      }.bind(this);
      // Handle timeout
      request.ontimeout = function () {
        _newArrowCheck(this, _this3);
        reject(this.createError('timeout exceeded', 'ECONNABORTED', request));
        // Clean up request
        request = null;
      }.bind(this);
      // // Handle progress if needed
      // if (typeof config.onDownloadProgress === 'function') {
      //   request.addEventListener('progress', config.onDownloadProgress);
      // }
      // Not all browsers support upload events
      // if (typeof progressCallback === 'function' && request.upload) {
      //   request.upload.addEventListener('progress', progressCallback);
      // }
      if (typeof configureFn === 'function') {
        configureFn(request);
      }
      request.send(formData);
    }.bind(this));
  };
  _proto.get = function get(url, formData, configureFn) {
    return this.request('GET', url, formData, configureFn);
  };
  _proto.post = function post(url, formData, configureFn) {
    return this.request('POST', url, formData, configureFn);
  };
  _proto["delete"] = function _delete(url, formData, configureFn) {
    return this.request('DELETE', url, formData, configureFn);
  };
  _proto.put = function put(url, formData, configureFn) {
    return this.request('PUT', url, formData, configureFn);
  };
  return AjaxRequest;
}();
var ajax = new AjaxRequest();
var padZero = function padZero(number) {
  _newArrowCheck(this, _this4);
  number = parseInt(number);
  if (number < 10) {
    return '0' + number;
  }
  return '' + number;
}.bind(this);
var Toast = function Toast(message) {
  this.message = message;
};
var Prayer = function Prayer(name, time, iqamahTime, lang) {
  this.name = name;
  this.nameDisplay = translations[lang][this.name];
  this.time = time;
  // this.iqamah = iqamahTime;
  // this.iqamah = 100;
  this.iqamahTime = iqamahTime; //new Date(this.time.getTime() + this.iqamah * 60 * 1000);
  var d = moment(this.time);
  this.timeDisplay = d.format('hh:mm');
  this.timeAmPm = d.format('A');
  this.timeHours = d.format('hh');
  this.timeMinutes = d.format('mm');
  var id = moment(this.iqamahTime);
  this.iqamahTimeDisplay = id.format('hh:mm');
  this.iqamahTimeHours = id.format('hh');
  this.iqamahTimeMinutes = id.format('mm');
  this.iqamahTimeAmPm = id.format('A');
};
var IqamahTime = /*#__PURE__*/function () {
  function IqamahTime(minutes, hours, absolute) {
    this.minutes = padZero(minutes || 0);
    hours = parseInt(hours);
    this.hours = hours ? padZero(hours) : '';
    this.absolute = !!absolute;
    return;
    // const parts = (time + '').split(':');
    // this.isAbsolute = false;
    // if(parts.length === 2) {
    //   this.isAbsolute = true;
    // } else {
    //   parts[1] =
    // }

    // this.hours = parts[1] || '00';
    // this.time = parts[0];
  }
  var _proto2 = IqamahTime.prototype;
  _proto2.toTime = function toTime() {
    return this.hours + ':' + this.minutes;
  };
  _proto2.toRaw = function toRaw() {
    return {
      hours: this.hours,
      minutes: this.minutes,
      absolute: this.absolute
    };
  };
  return IqamahTime;
}();
IqamahTime.fromRaw = function (raw) {
  return new IqamahTime(raw.minutes, raw.hours, raw.absolute);
};

// class AppUpdater {
//   constructor() {

//   }
// }
var App = /*#__PURE__*/function () {
  function App() {
    var _this5 = this;
    this.lang = localStorage.getItem('mdisplay.lang') || 'ta';
    this.prayerData = [];
    for (var month in window.PRAYER_DATA) {
      if (window.PRAYER_DATA.hasOwnProperty(month)) {
        this.prayerData.push(window.PRAYER_DATA[month]);
      }
    }
    this.checkInternetJsonp = {
      jsonpCallback: 'checkInternet',
      url: 'https://mdisplay.github.io/live/check-internet.js'
      // url: 'http://192.168.1.11/mdisplay/live/check-internet.js',
    };

    var timeServerIp = '192.168.1.1';
    var timeServerApi = 'http://' + timeServerIp + '/api';
    this.timeServerApi = timeServerApi;
    this.data = {
      showSplash: true,
      // currentPrayerWaiting: false,
      // time: new Date(),
      // timeDisplay:
      // prayers: [],
      settingsMode: false,
      iqamahTimesConfigured: false,
      iqamahTimes: {
        Subah: new IqamahTime(20),
        Luhar: new IqamahTime(15),
        Asr: new IqamahTime(15),
        Magrib: new IqamahTime(10),
        Isha: new IqamahTime(15),
        Jummah: new IqamahTime(45)
      },
      appUdate: {
        enabled: false,
        checking: false,
        updated: false,
        updating: false,
        error: false
      },
      kioskMode: {
        available: false,
        enabled: false,
        isHome: false,
        switchLauncher: function switchLauncher() {
          _newArrowCheck(this, _this5);
          alert('Kiosk not available');
        }.bind(this)
      },
      toasts: [],
      timeOriginMode: 'device',
      // or 'network'
      networkMode: 'network',
      // or 'timeserver',
      networkTimeApiUrl: timeServerApi,
      isFriday: false,
      selectedLanguage: this.lang,
      languages: [{
        id: 'si',
        label: 'Sinhala'
      }, {
        id: 'ta',
        label: 'Tamil'
      }, {
        id: 'en',
        label: 'English'
      }],
      analogClockActive: false,
      analogClockTheme: 'default',
      networkTimeInitialized: false,
      timeIsValid: false,
      timeFetchingMessage: undefined,
      timeAdjustmentMinutes: 0,
      timeServerSSID: localStorage.getItem('mdisplay.ssid') || 'NodeMCU TimeServer',
      timeServerSSIDs: ['NodeMCU TimeServer', 'MDisplay TimeServer'],
      network: {
        status: 'Unknown',
        connecting: undefined,
        internetStatus: 'Unknown',
        internetAvailable: undefined,
        showInternetAvailability: false
      }
    };
    this.isDeviceReady = false;
    this.isInitial = true;
    this.beforeSeconds = 5 * 60;
    // this.beforeSeconds = 1*60;
    this.afterSeconds = 5 * 60;
    // this.afterSeconds = 1;
    // this.afterSeconds = 1*60;
    this.afterSeconds = 2 * 60;
    this.data.bgVersion = '7';
  }
  var _proto3 = App.prototype;
  _proto3.languageChanged = function languageChanged() {
    localStorage.setItem('mdisplay.lang', this.data.selectedLanguage);
    this.closeSettings();
  };
  _proto3.ssidChanged = function ssidChanged() {
    localStorage.setItem('mdisplay.ssid', this.data.timeServerSSID);
    this.closeSettings();
  };
  _proto3.checkNetworkStatus = function checkNetworkStatus() {
    var _this6 = this;
    if (!this.isDeviceReady || typeof Connection === 'undefined') {
      return;
    }
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown Connection';
    states[Connection.ETHERNET] = 'Ethernet Connection';
    states[Connection.WIFI] = 'WiFi Connection';
    states[Connection.CELL_2G] = 'Cell 2G Connection';
    states[Connection.CELL_3G] = 'Cell 3G Connection';
    states[Connection.CELL_4G] = 'Cell 4G Connection';
    states[Connection.CELL] = 'Cell Generic Connection';
    states[Connection.NONE] = 'No Network Connection';
    this.data.network.status = states[networkState];
    if (networkState == Connection.WIFI && typeof WifiWizard2 !== 'undefined') {
      this.data.network.status = 'Checking WiFi SSID...';
      WifiWizard2.getConnectedSSID().then(function (ssid) {
        _newArrowCheck(this, _this6);
        this.data.network.status = states[Connection.WIFI] + ' (' + ssid + ')';
      }.bind(this), function (err) {
        _newArrowCheck(this, _this6);
        this.data.network.status = states[Connection.WIFI] + ' (SSID err: ' + err + ')';
      }.bind(this));
    }

    // alert('Connection type: ' + states[networkState]);
  };
  _proto3.checkNetworkStatusUntilTimeIsValid = function checkNetworkStatusUntilTimeIsValid() {
    var _this7 = this;
    console.log('checkNetworkStatusUntilTimeIsValid');
    this.checkNetworkStatus();
    if (this.data.timeIsValid) {
      return;
    }
    setTimeout(function () {
      _newArrowCheck(this, _this7);
      this.checkNetworkStatusUntilTimeIsValid();
    }.bind(this), 3000);
  };
  _proto3.checkInternetAvailability = function checkInternetAvailability(okCallback, retryCount, failCallback) {
    var _this8 = this;
    retryCount = retryCount || 0;
    this.setFetchingStatus('Checking Internet Connection...', 'init', true);
    var retry = function retry(okCallback) {
      var _this9 = this;
      _newArrowCheck(this, _this8);
      if (retryCount <= 0) {
        failCallback();
        return;
      }
      setTimeout(function () {
        _newArrowCheck(this, _this9);
        this.checkInternetAvailability(okCallback, retryCount - 1, failCallback);
      }.bind(this), 3000);
    }.bind(this);
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: this.checkInternetJsonp.url,
      jsonpCallback: this.checkInternetJsonp.jsonpCallback,
      contentType: 'application/json; charset=utf-8',
      success: function success(response) {
        var _this10 = this;
        _newArrowCheck(this, _this8);
        // console.log('Result received', response);
        if (response && response.result == 'ok') {
          this.setFetchingStatus('Internet Connection OK ', 'success', false, 999);
          setTimeout(function () {
            _newArrowCheck(this, _this10);
            this.data.network.internetAvailable = true;
            okCallback();
            // this.data.network.checking = false;
          }.bind(this), 2000);
          return;
        }
        this.data.network.internetAvailable = false;
        this.setFetchingStatus('INVALID response', 'error', false, 999);
        retry(okCallback);
      }.bind(this),
      error: function error(err) {
        _newArrowCheck(this, _this8);
        // console.log('err: ', err);
        // // alert('err: ' + err);
        this.data.network.internetAvailable = false;
        this.setFetchingStatus('Internet Connection FAILED', 'error', false, 999);
        retry(okCallback);
      }.bind(this)
    });
  };
  _proto3.checkForUpdates = function checkForUpdates() {
    var _this11 = this;
    if (window.codePush === undefined) {
      console.log('codePush not available');
      alert('AUTO UPDATE not available!');
      return;
    }
    this.data.appUdate.enabled = true;
    // if(this.data.appUdate.updated) {
    //   return;
    // }
    this.data.appUdate.error = false;
    this.data.appUdate.checking = true;
    this.data.appUdate.updated = false;
    this.data.appUdate.updating = false;
    window.codePush.checkForUpdate(function (update) {
      _newArrowCheck(this, _this11);
      this.data.appUdate.error = false;
      this.data.appUdate.checking = false;
      this.data.appUdate.updating = false;
      this.data.appUdate.updated = false;
      if (!update) {
        // alert("The app is up to date.");
        this.data.appUdate.updated = true;
      } else {
        this.data.appUdate.updating = true;
        window.askAndAutoUpdate();
        // alert("An update is available! Should we download it?");
        // window.codePush.restartApplication();
      }
    }.bind(this), function (error) {
      _newArrowCheck(this, _this11);
      this.data.appUdate.checking = false;
      this.data.appUdate.updating = false;
      this.data.appUdate.updated = false;
      this.data.appUdate.error = error;
    }.bind(this));
  };
  _proto3.checkForKioskMode = function checkForKioskMode() {
    var _this12 = this;
    if (window.Kiosk === undefined) {
      this.data.kioskMode.available = false;
      this.data.kioskMode.enabled = false;
      this.data.kioskMode.isHome = false;
      console.log('Kiosk not available');
      return;
    }
    this.data.kioskMode.available = true;
    Kiosk.isInKiosk(function (isInKiosk) {
      _newArrowCheck(this, _this12);
      this.data.kioskMode.enabled = isInKiosk;
    }.bind(this));
    Kiosk.isSetAsLauncher(function (isSetAsLauncher) {
      _newArrowCheck(this, _this12);
      this.data.kioskMode.isHome = isSetAsLauncher;
    }.bind(this));
    this.data.kioskMode.switchLauncher = function () {
      _newArrowCheck(this, _this12);
      Kiosk.switchLauncher();
    }.bind(this);
    // this.data.kioskMode.enabled = true;
    // kioskMode;
  };
  _proto3.getRandomNumber = function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  };
  _proto3.updateTime = function updateTime() {
    if (!this.data.time) {
      this.data.time = this.initialTestTime ? this.initialTestTime : new Date();
      this.data.time.setTime(this.data.time.getTime() - 1000);
      // if (this.data.timeOriginMode == 'network') {
      //   this.data.time.setFullYear(1970);
      // }
    }

    if (this.initialTestTime || this.data.timeOriginMode == 'network') {
      this.data.time = new Date(this.data.time.getTime() + 1000);
    } else {
      this.data.time = new Date();
    }
    var lastKnownYear = 2021;
    this.data.timeIsValid = this.data.time.getFullYear() >= lastKnownYear;
    if (!this.initialTestTime && !this.data.timeIsValid) {
      var d = new Date();
      if (d.getFullYear() >= lastKnownYear /* && d.getSeconds() > 30 */) {
        // fallback mode
        // this.data.time = d;
      }
      // this.checkNetworkStatusUntilTimeIsValid();
    }

    if (!this.data.timeIsValid) {
      // if (this.data.timeOriginMode != 'network' && this.data.network.internetAvailable === undefined) {
      //   this.checkInternetAvailability(
      //     () => {},
      //     0,
      //     () => {}
      //   );
      // }
      if (!(this.data.timeOriginMode == 'network' && this.data.networkTimeApiUrl == this.timeServerApi)) {
        this.checkNetworkStatus();
      } else {
        if (this.data.network.connecting === false) {
          this.checkNetworkStatus();
        }
      }
    }
    this.data.timeFormatted = moment(this.data.time).format('DD MMM YYYY, h:mm:ss A');
    this.data.timeDisplay = moment(this.data.time).format('hh:mm');
    this.data.timeDisplayHours = moment(this.data.time).format('hh');
    this.data.timeDisplayMinutes = moment(this.data.time).format('mm');
    this.data.timeDisplaySeconds = moment(this.data.time).format('ss');
    this.data.timeDisplayColon = this.data.timeDisplayColon == ':' ? '' : ':';
    this.data.timeDisplayAmPm = moment(this.data.time).format('A');
    this.updateInternetTime();
  };
  _proto3.getDateParams = function getDateParams(date) {
    return [date.getFullYear(), date.getMonth(), date.getDate()];
  };
  _proto3.getTime = function getTime(yearParam, monthParam, dayParam, time) {
    var timeParts = time.split(':');
    var hoursAdd = 0;
    if (timeParts[1].indexOf('p') != -1) {
      hoursAdd = 12;
    }
    var hours = hoursAdd + parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1].replace('a', '').replace('p', ''));
    var m = moment(yearParam + ' ' + (monthParam + 1) + ' ' + dayParam + ' ' + time + 'm', 'YYYY M D hh:mma');
    if (!isNaN(this.data.timeAdjustmentMinutes) && this.data.timeAdjustmentMinutes != 0) {
      var timeAdjustmentMinutes = parseInt(this.data.timeAdjustmentMinutes);
      m.add(timeAdjustmentMinutes, 'minutes'); // when timeAdjustmentMinutes is < 0, it's substracted automatically
    }
    return m.toDate();
  };
  _proto3.getTimes = function getTimes(yearParam, monthParam, dayParam) {
    var times = [];
    for (var _iterator = _createForOfIteratorHelperLoose(this.prayerData[monthParam]), _step; !(_step = _iterator()).done;) {
      var segment = _step.value;
      if (segment.range[0] <= dayParam && segment.range[1] >= dayParam) {
        // this.currentSegment = segment;
        for (var _iterator2 = _createForOfIteratorHelperLoose(segment.times), _step2; !(_step2 = _iterator2()).done;) {
          var time = _step2.value;
          times.push(this.getTime(yearParam, monthParam, dayParam, time));
        }
        break;
      }
    }
    if (!times.length) {
      return false;
    }
    return {
      Subah: times[0],
      Luhar: times[2],
      Asr: times[3],
      Magrib: times[4],
      Isha: times[5]
    };
  };
  _proto3.getIqamahTimes = function getIqamahTimes(prayerTimes, monthParam, dayParam) {
    var iqamahTimes = {};
    for (var name in this.data.iqamahTimes) {
      var prayerName = name == 'Jummah' ? 'Luhar' : name;
      var iqamahTime = this.data.iqamahTimes[name];
      if (iqamahTime.absolute) {
        iqamahTimes[name] = this.getTime(monthParam, dayParam, iqamahTime.toTime() + (name == 'Subah' ? 'a' : 'p'));
      } else {
        iqamahTimes[name] = new Date(prayerTimes[prayerName].getTime() + parseInt(iqamahTime.minutes) * 60 * 1000);
      }
    }
    return iqamahTimes;
  };
  _proto3.showNextDayPrayers = function showNextDayPrayers() {
    this.data.prayers = this.nextDayPrayers;
  };
  _proto3.onDayUpdate = function onDayUpdate() {
    var dateParams = this.getDateParams(this.data.time);
    this.currentDateParams = dateParams;
    // console.log();
    var times;
    var fallbackToNextDayOnFail = false;
    for (var i = 0; i < 100; i++) {
      // try few more times!; - why? - fallback if data is not available for a particular day
      times = this.getTimes(dateParams[0], dateParams[1], dateParams[2]);
      if (times || !fallbackToNextDayOnFail) {
        break;
      }
      var _d = new Date(this.data.time.getTime());
      _d.setDate(_d.getDate() + 1);
      dateParams = this.getDateParams(_d);
    }
    var d = moment(this.data.time);
    var dayOfWeek = parseInt(d.format('d'));
    var day = translations[this.lang].days[dayOfWeek];
    this.data.isFriday = dayOfWeek === 5;
    var month = translations[this.lang].months[this.data.time.getMonth()];
    console.log('all the times', times);
    var iqamahTimes = this.getIqamahTimes(times, dateParams[1], dateParams[2]);
    this.todayPrayers = [new Prayer('Subah', times.Subah, iqamahTimes.Subah, this.lang),
    // new Prayer('Sunrise', times[1], 10, this.lang),
    // new Prayer('Luhar', times.Luhar, iqamahTimes.Luhar, this.lang),
    new Prayer(this.data.isFriday ? 'Jummah' : 'Luhar', times.Luhar, this.data.isFriday ? iqamahTimes.Jummah : iqamahTimes.Luhar, this.lang), new Prayer('Asr', times.Asr, iqamahTimes.Asr, this.lang), new Prayer('Magrib', times.Magrib, iqamahTimes.Magrib, this.lang), new Prayer('Isha', times.Isha, iqamahTimes.Isha, this.lang)];
    this.data.prayers = this.todayPrayers;
    var tomorrowParams = this.getDateParams(new Date(this.data.time.getTime() + 24 * 60 * 60 * 1000));
    var tomorrowTimes = this.getTimes(tomorrowParams[0], tomorrowParams[1], tomorrowParams[2]);
    if (!tomorrowTimes) {
      tomorrowTimes = times;
    }
    var tomorrowIqamahTimes = this.getIqamahTimes(tomorrowTimes, tomorrowParams[1], tomorrowParams[2]);
    this.nextDayPrayers = [new Prayer('Subah', tomorrowTimes.Subah, tomorrowIqamahTimes.Subah, this.lang), new Prayer('Luhar', tomorrowTimes.Luhar, tomorrowIqamahTimes.Luhar, this.lang), new Prayer('Asr', tomorrowTimes.Asr, tomorrowIqamahTimes.Asr, this.lang), new Prayer('Magrib', tomorrowTimes.Magrib, tomorrowIqamahTimes.Magrib, this.lang), new Prayer('Isha', tomorrowTimes.Isha, tomorrowIqamahTimes.Isha, this.lang)];
    // this.data.nextPrayer = this.data.prayers[0];
    this.data.currentPrayer = undefined;
    this.data.currentPrayerBefore = false;
    this.data.currentPrayerAfter = false;
    this.data.currentPrayerWaiting = false;
    this.data.currentPrayerDescription = '';
    // this.data.nextPrayerNear = false;
    // this.data.currentIqamah = undefined;
    // this.data.currentIqamah
    // this.data.dateDisplay = d.format('ddd, DD MMM YYYY');
    this.data.weekDayDisplay = day;
    this.data.dateDisplay = padZero(this.data.time.getDate()) + ' ' + month + ' ' + this.data.time.getFullYear(); //day + ', ' +
    var hijriMonth = parseInt(d.format('iM'));
    // this.data.hijriDateDisplay = d.format('iDD, ___ (iMM) iYYYY').replace('___', translations.ta.months[hijriMonth - 1]);
    // const hijriDate = new HijriDate(this.data.time.getTime());
    var hijriDate = HijriJS.gregorianToHijri(this.data.time.getFullYear(), this.data.time.getMonth() + 1, this.data.time.getDate());
    // this.data.hijriDateDisplay = d.format('iDD ___ iYYYY').replace('___', translations.ta.months[hijriMonth - 1]);
    // this.data.hijriDateDisplay = padZero(hijriDate.getDate()) + ' ' + translations.ta.months[hijriDate.getMonth()] + ' ' + hijriDate.getFullYear();
    this.data.hijriDateDisplay = padZero(hijriDate.day) + ' ' + translations[this.lang].hijriMonths[hijriDate.month - 1] + ' ' + hijriDate.year;
    // this.data.hijriDateDisplay = hijriDate.toFormat('dd mm YYYY');

    this.data.hijriDate = hijriDate;
    this.data.prayerInfo = 'athan';
    this.updateBackground(true);
  };
  _proto3.updateBackground = function updateBackground(isInit) {
    if (!isInit) {
      // return;
    }
    // const backgroundImages = [
    //   'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    // ];
    // return (this.data.backgroundImage = backgroundImages[0]);
    var maxAvailableBackgrounds = 11;
    this.data.backgroundImage = 'backgrounds/' + this.getRandomNumber(1, maxAvailableBackgrounds) + '.jpg?v=' + this.data.bgVersion;
  };
  _proto3.commitCurrentPrayer = function commitCurrentPrayer() {
    if (!this.data.currentPrayer) {
      this.data.currentPrayerDescription = '';
      return;
    }
    if (this.data.currentPrayerWaiting) {
      this.data.currentPrayerDescription = translations[this.lang].currentPrayerWaiting;
    } else if (this.data.currentPrayerBefore) {
      this.data.currentPrayerDescription = translations[this.lang].currentPrayerBefore;
    } else if (this.data.currentPrayerAfter) {
      this.data.currentPrayerDescription = translations[this.lang].currentPrayerAfter;
    }
  };
  _proto3.checkCurrentPrayer = function checkCurrentPrayer(currentPrayer) {
    var nowTime = this.data.time.getTime();
    var iqamahTime = currentPrayer.iqamahTime.getTime();
    if (nowTime >= iqamahTime) {
      if (nowTime - iqamahTime < this.afterSeconds * 1000) {
        this.data.currentPrayer = currentPrayer;
        this.data.currentPrayerBefore = false;
        // this.data.currentPrayerAfter = true;
        var duration = moment.duration(nowTime - iqamahTime, 'milliseconds');
        // this.data.currentPrayerAfter = padZero(duration.minutes()) + ':' + padZero(duration.seconds());
        var pause = nowTime - iqamahTime < 15 * 1000;
        pause = true;
        this.data.currentPrayerAfter = {
          minutes: pause ? '00' : padZero(duration.minutes()),
          colon: this.data.currentPrayerAfter && this.data.currentPrayerAfter.colon == ':' ? ':' : ':',
          seconds: pause ? '00' : padZero(duration.seconds())
        };
        this.data.currentPrayerWaiting = false;
      } else {
        this.data.currentPrayer = undefined;
        this.data.currentPrayerBefore = false;
        this.data.currentPrayerAfter = false;
        this.data.currentPrayerWaiting = false;
      }
    } else {
      this.data.currentPrayer = currentPrayer;
      this.data.currentPrayerBefore = false;
      this.data.currentPrayerAfter = false;
      if (nowTime - currentPrayer.time.getTime() < 15 * 1000) {
        this.data.currentPrayerWaiting = false;
        this.data.currentPrayerBefore = {
          minutes: '00',
          // padZero(duration.minutes()),
          colon: this.data.currentPrayerBefore && this.data.currentPrayerBefore.colon == ':' ? ':' : ':',
          seconds: '00' // padZero(duration.seconds()),
        };

        return;
      }
      var _duration = moment.duration(iqamahTime - nowTime, 'milliseconds');
      this.data.currentPrayerWaiting = {
        minutes: padZero(_duration.minutes()),
        colon: this.data.currentPrayerWaiting && this.data.currentPrayerWaiting.colon == ':' ? '' : ':',
        seconds: padZero(_duration.seconds())
      };
    }
  };
  _proto3.nextTick = function nextTick() {
    var _this13 = this;
    this.updateTime();
    var dateParams = this.getDateParams(this.data.time);
    if (!(this.currentDateParams && dateParams[0] === this.currentDateParams[0] && dateParams[1] === this.currentDateParams[1] && dateParams[2] === this.currentDateParams[2])) {
      this.onDayUpdate();
    }
    var changeBackgroundInMinutes = 1;
    if (this.data.time.getMinutes() % changeBackgroundInMinutes === 0 && this.data.time.getSeconds() === 0) {
      this.updateBackground();
    }
    var checkInternetInMinutes = 1;
    var checkInternetNow = false;
    if (this.data.time.getMinutes() % checkInternetInMinutes === 0 && this.data.time.getSeconds() === 0) {
      checkInternetNow = true;
    }
    // this.data.network.showInternetAvailability = this.data.time.getSeconds() % 10 < 5;

    // if (this.data.time.getSeconds() % 2 === 1) {
    this.data.network.showInternetAvailability = !this.data.network.showInternetAvailability;
    // }
    if (this.data.timeOriginMode == 'network' && this.data.networkTimeApiUrl == this.timeServerApi) {
      this.tryConnectingToTimeServer();
    } else {
      if (checkInternetNow) {
        this.checkInternetAvailability(function () {
          _newArrowCheck(this, _this13);
        }.bind(this), 10, function () {
          _newArrowCheck(this, _this13);
          this.setFetchingStatus('No Internet', 'error', false, 999);
        }.bind(this));
      } else if (this.data.network.internetAvailable === undefined) {
        this.checkInternetAvailability(function () {
          _newArrowCheck(this, _this13);
        }.bind(this), 0, function () {
          _newArrowCheck(this, _this13);
        }.bind(this));
      }
    }
    if (this.data.time.getSeconds() % 2 === 0) {
      this.data.prayerInfo = this.data.prayerInfo === 'athan' ? 'iqamah' : 'athan';
    }
    var nowTime = this.data.time.getTime();
    var nextTime = this.data.nextPrayer ? this.data.nextPrayer.time.getTime() : 0;
    // console.log('nextTick');
    if (nowTime >= nextTime + 1000) {
      console.log('coming next');
      var nextPrayer;
      for (var _iterator3 = _createForOfIteratorHelperLoose(this.todayPrayers), _step3; !(_step3 = _iterator3()).done;) {
        var prayer = _step3.value;
        if (nowTime < prayer.time.getTime()) {
          nextPrayer = prayer;
          break;
        }
      }
      if (!nextPrayer) {
        if (!(this.nextDayPrayers[0] && nowTime < this.nextDayPrayers[0].time.getTime())) {
          // this.onDayUpdate();
          // return this.nextTick();
        }
        nextPrayer = this.nextDayPrayers[0];
        this.showNextDayPrayers();
      }
      console.log('recalculate next prayer!', nextPrayer);
      this.data.nextPrayer = nextPrayer;
      nextTime = this.data.nextPrayer.time.getTime();

      // this.data.currentPrayer = this.data.nextPrayer;
      this.data.currentPrayerBefore = false;
      this.data.currentPrayerAfter = false;
      this.data.currentPrayerWaiting = false;
      this.data.currentPrayerBefore = {
        minutes: '00',
        // padZero(duration.minutes()),
        colon: this.data.currentPrayerBefore && this.data.currentPrayerBefore.colon == ':' ? ':' : ':',
        seconds: '00' // padZero(duration.seconds()),
      };
    } else if (nextTime - nowTime < this.beforeSeconds * 1000) {
      this.data.currentPrayer = this.data.nextPrayer;
      var duration = moment.duration(nextTime - nowTime, 'milliseconds');
      this.data.currentPrayerBefore = {
        minutes: padZero(duration.minutes()),
        colon: this.data.currentPrayerBefore && this.data.currentPrayerBefore.colon == ':' ? '' : ':',
        seconds: padZero(duration.seconds())
      };
      this.data.currentPrayerAfter = false;
      this.data.currentPrayerWaiting = false;
    } else {
      if (this.data.currentPrayer) {
        this.checkCurrentPrayer(this.data.currentPrayer);
      } else {
        if (this.isInitial) {
          console.log('is isInitial');
          // if (nowTime < ) {}
          var prevPrayer;
          if (this.data.nextPrayer === this.nextDayPrayers[0]) {
            prevPrayer = this.todayPrayers[this.todayPrayers.length - 1];
          } else {
            var idx = this.todayPrayers.indexOf(this.data.nextPrayer);
            if (idx > 0) {
              // not subah
              prevPrayer = this.todayPrayers[idx - 1];
            }
          }
          if (prevPrayer) {
            this.checkCurrentPrayer(prevPrayer);
          }
          this.isInitial = false;
        } else {
          this.data.currentPrayer = undefined;
          this.data.currentPrayerBefore = false;
          this.data.currentPrayerAfter = false;
          this.data.currentPrayerWaiting = false;
        }
      }
    }
    if (this.analogClock && this.data.analogClockActive) {
      this.analogClock.nextTick();
    }
    this.commitCurrentPrayer();
  };
  _proto3.forceTimeUpdate = function forceTimeUpdate(newDate) {
    this.data.time = newDate;
    // this.onDayUpdate();
  };
  _proto3.translate = function translate(text) {
    return translations[this.lang][text] || text;
  };
  _proto3.openSettings = function openSettings() {
    this.data.settingsMode = true;
    this.checkForKioskMode();
  };
  _proto3.closeSettings = function closeSettings() {
    this.data.settingsMode = false;
    var reloadOnSettings = true;
    if (reloadOnSettings || this.shouldReload) {
      window.location.reload();
    }
  };
  _proto3.showToast = function showToast(message, duration) {
    var _this14 = this;
    duration = duration || 3000;
    var toast = new Toast(message);
    this.data.toasts.push(toast);
    setTimeout(function () {
      _newArrowCheck(this, _this14);
      var i = this.data.toasts.indexOf(toast);
      if (i !== -1) {
        this.data.toasts.splice(i, 1);
      }
    }.bind(this), duration);
  };
  _proto3.mounted = function mounted() {
    var _this15 = this;
    this.showToast('Application loaded.', 3000);
    // this.simulateTime = 50;
    this.updateTime();
    if (this.analogClock && this.data.analogClockActive) {
      this.analogClock.init(document.getElementById('analog-clock-container'), this.initialTestTime);
    }
    if (this.data.timeOriginMode == 'network' && this.simulateTime) {
      alert('Warning: simulateTime feature is not compatible with network time');
    }
    window._theInterval = window.setInterval(function () {
      _newArrowCheck(this, _this15);
      this.nextTick();
    }.bind(this), this.simulateTime ? this.simulateTime : 1000);
    setTimeout(function () {
      _newArrowCheck(this, _this15);
      this.data.showSplash = false;
    }.bind(this), 1000);
  };
  _proto3.created = function created() {
    if (window._theInterval) {
      window.clearInterval(window._theInterval);
    }
  };
  _proto3.initStorage = function initStorage(callback) {
    var iqamahTimes;
    var settings;
    try {
      settings = JSON.parse(localStorage.getItem('mdisplay.settings'));
    } catch (e) {}
    try {
      iqamahTimes = JSON.parse(localStorage.getItem('mdisplay.iqamahTimes'));
    } catch (e) {}
    if (!iqamahTimes) {
      return callback();
    }
    var iqamahTimesConfigured = localStorage.getItem('mdisplay.iqamahTimesConfigured');
    for (var name in iqamahTimes) {
      this.data.iqamahTimes[name] = IqamahTime.fromRaw(iqamahTimes[name]);
    }
    this.data.iqamahTimesConfigured = !!iqamahTimesConfigured;
    if (settings) {
      if (settings.timeOriginMode == 'device' || settings.timeOriginMode == 'network') {
        this.data.timeOriginMode = settings.timeOriginMode;
      }
      var timeAdjustmentMinutes = parseInt(settings.timeAdjustmentMinutes);
      if (!isNaN(timeAdjustmentMinutes)) {
        this.data.timeAdjustmentMinutes = timeAdjustmentMinutes;
      }
      if (settings.analogClockActive) {
        this.data.analogClockActive = true;
      }
      // ...
    }

    callback();
  };
  _proto3.writeStorage = function writeStorage(callback) {
    var iqamahTimes = {};
    for (var name in this.data.iqamahTimes) {
      iqamahTimes[name] = this.data.iqamahTimes[name].toRaw();
    }
    this.data.iqamahTimesConfigured = true;
    var settings = {
      timeOriginMode: this.data.timeOriginMode,
      timeAdjustmentMinutes: this.data.timeAdjustmentMinutes,
      analogClockActive: this.data.analogClockActive
    };
    localStorage.setItem('mdisplay.iqamahTimes', JSON.stringify(iqamahTimes));
    localStorage.setItem('mdisplay.iqamahTimesConfigured', 1);
    localStorage.setItem('mdisplay.settings', JSON.stringify(settings));
    if (callback) {
      callback();
    }
  };
  _proto3.updateSettings = function updateSettings() {
    this.writeStorage();
    this.shouldReload = true;
  };
  _proto3.initShortcuts = function initShortcuts() {
    var _this16 = this;
    var KEY_CODES = {
      ENTER: 13,
      ARROW_LEFT: 37,
      ARROW_UP: 38,
      ARROW_RIGHT: 39,
      ARROW_DOWN: 40
    };
    var body = document.querySelector('body');
    body.onkeydown = function (event) {
      _newArrowCheck(this, _this16);
      if (!event.metaKey) {
        // e.preventDefault();
      }
      var keyCode = event.keyCode;
      // alert('keyCode: ' + keyCode);
      if (keyCode == KEY_CODES.ENTER) {
        event.preventDefault();
        if (this.data.settingsMode) {
          this.closeSettings();
        } else {
          this.openSettings();
        }
        return;
      }
      if (!this.data.settingsMode) {
        return;
      }
      var rows = document.querySelectorAll('.times-config .time-config');
      if (keyCode == KEY_CODES.ARROW_DOWN || keyCode == KEY_CODES.ARROW_UP) {
        event.preventDefault();
        var lastSelectedRow = this.lastSelectedRow || 0;
        var lastSelectedCol = this.lastSelectedCol || 1;
        lastSelectedRow += keyCode == KEY_CODES.ARROW_UP ? -1 : 1;
        if (lastSelectedRow < 1) {
          lastSelectedRow = rows.length;
        }
        if (lastSelectedRow > rows.length) {
          lastSelectedRow = 1;
        }
        var row = rows[lastSelectedRow - 1];
        var cols = row.querySelectorAll('input');
        if (lastSelectedCol < 1) {
          lastSelectedCol = cols.length;
        }
        if (lastSelectedCol > cols.length) {
          lastSelectedCol = 1;
        }
        var col = cols[lastSelectedCol - 1];
        console.log('SHOULD FOCUS: ', col.value, col);
        col.focus();
        this.lastSelectedRow = lastSelectedRow;
        this.lastSelectedCol = lastSelectedCol;
      }
      if (keyCode == KEY_CODES.ARROW_LEFT || keyCode == KEY_CODES.ARROW_RIGHT) {
        event.preventDefault();
        var _lastSelectedRow = this.lastSelectedRow || 1;
        var _lastSelectedCol = this.lastSelectedCol || 0;
        if (_lastSelectedRow < 1) {
          _lastSelectedRow = rows.length;
        }
        if (_lastSelectedRow > rows.length) {
          _lastSelectedRow = 1;
        }
        var _row = rows[_lastSelectedRow - 1];
        var _cols = _row.querySelectorAll('input');
        _lastSelectedCol += keyCode == KEY_CODES.ARROW_LEFT ? -1 : 1;
        if (_lastSelectedCol < 1) {
          _lastSelectedCol = _cols.length;
        }
        if (_lastSelectedCol > _cols.length) {
          _lastSelectedCol = 1;
        }
        var _col = _cols[_lastSelectedCol - 1];
        console.log('SHOULD FOCUS: ', _col.value, _col);
        _col.focus();
        this.lastSelectedRow = _lastSelectedRow;
        this.lastSelectedCol = _lastSelectedCol;
      }
    }.bind(this);
  };
  _proto3.setFetchingStatus = function setFetchingStatus(message, mode, status, timeout) {
    var _this17 = this;
    var colors = {
      init: '#ffff20',
      error: '#ff1919',
      success: '#49ff50'
    };
    setTimeout(function () {
      _newArrowCheck(this, _this17);
      this.data.timeFetchingMessage = {
        color: colors[mode],
        text: message
      };
    }.bind(this), timeout ? 500 : 0);
    setTimeout(function () {
      _newArrowCheck(this, _this17);
      this.fetchingInternetTime = status;
    }.bind(this), timeout || 0);
  };
  _proto3.updateInternetTime = function updateInternetTime() {
    var _this18 = this;
    if (this.fetchingInternetTime) {
      return;
    }
    if (this.data.timeOriginMode != 'network') {
      // console.log('Internet time mode disabled');
      return;
    }
    if (this.data.networkTimeInitialized) {
      // console.log('Internet time mode already active');
      return;
    }
    console.log('Internet time mode fetching from...', this.data.networkTimeApiUrl);
    this.setFetchingStatus('Requesting time from network...', 'init', true);
    function parseDateTime(datetime) {
      var parts = datetime.split(' ');
      var dateParts = parts[0].split('-');
      var timeParts = parts[1].split(':');
      return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]), parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]));
    }
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: this.data.networkTimeApiUrl + '',
      jsonp: 'callback',
      contentType: 'application/json; charset=utf-8',
      success: function success(response) {
        var _this19 = this;
        _newArrowCheck(this, _this18);
        // console.log('Result received', response);
        if (!response /* && response.timestamp */) {
          console.log('Invalid response', response);
          this.setFetchingStatus('INVALID response', 'error', false, 999);
          return;
        }
        var timestamp = response.timestamp;
        var time = response.time;
        if (!timestamp && !time) {
          this.setFetchingStatus('MISSING timestamp or time from response', 'error', false, 999);
          console.log('Invalid timestamp/time response', response);
          return;
        }
        if (timestamp) {
          var timestampMillis = timestamp * 1000;
          // alert('timestampMillis: ' + timestampMillis);
          setTimeout(function () {
            _newArrowCheck(this, _this19);
            // show waiting feedback at least 1 second
            this.forceTimeUpdate(new Date(timestampMillis + 1000));
          }.bind(this), 1000);
        } else {
          setTimeout(function () {
            _newArrowCheck(this, _this19);
            var newDate = parseDateTime(time);
            newDate.setTime(newDate.getTime() + 1000);
            this.forceTimeUpdate(newDate);
          }.bind(this), 1000);
        }
        this.data.networkTimeInitialized = true;
        setTimeout(function () {
          _newArrowCheck(this, _this19);
          // possibility for time inaccuracy. Hence recheck in 10 seconds.
          this.data.networkTimeInitialized = false;
        }.bind(this), 10 * 1000);
        console.log('network data: ', response);
        this.setFetchingStatus('OK. Updated time from network', 'success', false, 1);
      }.bind(this),
      error: function error(err) {
        _newArrowCheck(this, _this18);
        console.log('err: ', err);
        // alert('err: ' + err);
        this.setFetchingStatus('FAILED to update time from network', 'error', false, 999);
      }.bind(this)
    });
  };
  _proto3.tryConnectingToTimeServer = function tryConnectingToTimeServer(retryCount) {
    var _this20 = this;
    var timeServerSSID = this.data.timeServerSSID;
    retryCount = retryCount || 0;
    if (!(this.data.timeOriginMode == 'network' && this.data.networkTimeApiUrl == this.timeServerApi)) {
      return;
    }
    if (!this.isDeviceReady || this.data.timeIsValid || typeof WifiWizard2 === 'undefined') {
      return;
    }
    if (!retryCount && this.data.network.connecting !== undefined) {
      return;
    }
    if (this.data.network.status == 'WiFi Connection (' + timeServerSSID + ')') {
      this.data.network.connecting = false;
      return;
    }
    var bindAll = true;
    var isHiddenSSID = false;
    this.data.network.connecting = true;
    this.data.network.status = 'Connecting to ' + timeServerSSID + ' (' + retryCount + ')...';
    WifiWizard2.connect(timeServerSSID, bindAll, '1234567890', 'WPA', isHiddenSSID).then(function (res) {
      _newArrowCheck(this, _this20);
      this.data.network.connecting = false;
      this.data.network.status = 'Connected to ' + timeServerSSID;
      this.checkNetworkStatus();
    }.bind(this), function (err) {
      var _this21 = this;
      _newArrowCheck(this, _this20);
      this.data.network.status = 'ERR ' + timeServerSSID + ' - ' + err;
      setTimeout(function () {
        _newArrowCheck(this, _this21);
        this.tryConnectingToTimeServer(retryCount + 1);
      }.bind(this), 1000);
    }.bind(this));
  };
  _proto3.deviceReady = function deviceReady() {
    this.isDeviceReady = true;
    this.checkNetworkStatus();
  };
  _proto3.init = function init(initialTestTime, callback, analogClock) {
    var _this22 = this;
    this.initialTestTime = initialTestTime;
    this.analogClock = analogClock;
    this.initStorage(function () {
      _newArrowCheck(this, _this22);
      this.nextTick();
      if (callback) {
        callback();
      }
      this.initShortcuts();
    }.bind(this));
  };
  return App;
}();
window.mdApp = new App();