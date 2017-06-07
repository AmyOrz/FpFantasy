var AjaxUtil = (function () {
    function AjaxUtil() {
    }
    AjaxUtil.create = function () {
        var obj = new this();
        return obj;
    };
    AjaxUtil.prototype.ajax = function (params) {
        params = params || {};
        params.data = params.data || {};
        params.jsonp ? this._jsonp(params) : this._json(params);
    };
    AjaxUtil.prototype._jsonp = function (params) {
        var callbackName = params.jsonp;
        var head = document.getElementsByTagName('head')[0];
        params.data['jsoncallback'] = callbackName;
        var data = this._formatParams(params.data);
        var script = document.createElement('script');
        head.appendChild(script);
        window[callbackName] = function (json) {
            head.removeChild(script);
            window[callbackName] = null;
            params.success && params.success(json);
        };
        script.src = params.url;
    };
    AjaxUtil.prototype._json = function (params) {
        params.type = (params.type || 'GET').toUpperCase();
        params.data = this._formatParams(params.data);
        var xhr = null;
        try {
            xhr = new ActiveXObject("microsoft.xmlhttp");
        }
        catch (e1) {
            try {
                xhr = new XMLHttpRequest();
            }
            catch (e2) {
                console.log(xhr, { message: "您的浏览器不支持ajax，请更换！" });
                return null;
            }
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    var response = '';
                    var type = xhr.getResponseHeader('Content-type');
                    if (type.indexOf('xml') !== -1 && xhr.responseXML) {
                        response = xhr.responseXML;
                    }
                    else if (type === 'application/json') {
                        response = JSON.parse(xhr.responseText);
                    }
                    else {
                        response = xhr.responseText;
                    }
                    params.success && params.success(response);
                }
                else {
                    params.error && params.error(status);
                }
            }
        };
        if (params.type == 'GET') {
            xhr.open(params.type, params.url + '?' + params.data, true);
            xhr.send(null);
        }
        else {
            xhr.open(params.type, params.url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.send(params.data);
        }
    };
    AjaxUtil.prototype._formatParams = function (data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        arr.push('v=' + this._random());
        return arr.join('&');
    };
    AjaxUtil.prototype._random = function () {
        return Math.floor(Math.random() * 10000 + 500);
    };
    return AjaxUtil;
}());
export { AjaxUtil };
//# sourceMappingURL=AjaxUtil.js.map