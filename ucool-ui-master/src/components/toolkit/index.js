export function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

export function addClass(obj, cls) {
    if (! hasClass(obj, cls)) 
        obj.className += " " + cls;
    


}

export function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}
export function toggleClass(obj, cls, cls2) {
    if (typeof cls2 === "undefined") {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        } else {
            addClass(obj, cls)
        }
    } else {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
            addClass(obj, cls2)
        } else {
            addClass(obj, cls)
            var reg = new RegExp('(\\s|^)' + cls2 + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    }
}
/**
 * 获取dom元素对应的css属性
 **/
export function getStyle(element, property) {
    var proValue = null;
    if (!document.defaultView) {
        proValue = element.currentStyle[property];
    } else {
        proValue = document.defaultView.getComputedStyle(element)[property];
    }
    return proValue;
}
/**
 * 获取dom对象的坐标（x,y）
 * @param {*} obj 
 */
export function getXY(obj) {
    var x = 0,
        y = 0
    if (obj.getBoundingClientRect) {
        var box = obj.getBoundingClientRect()
        var D = document.documentElement
        x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft
        y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop
    } else {
        for (; obj != document.body; x += obj.offsetLeft, y += obj.offsetTop, obj = obj.offsetParent) {}
    }
    return {x: x, y: y}
}

// 数字的格式化显示
export function pad(x, len) {
    if (typeof len === 'undefined') {
        len = 2;
    }
    x = String(x);
    while (x.length<len) x = `0${x}`;
  return x;
}

Date.prototype.dateFormat = function (fmt) {
  let date = this
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1, RegExp.$1.length == 1 ?
          o[k] :
          ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

Object.prototype.html = function () {
  if (arguments.length == 0) {
    return this.innerHTML
  } else if (arguments.length == 1) {
    this.innerHTML = arguments[0]
    return this
  }
}
/***
 * 使用字典dict对val进行格式化
 * 显示效果的字段为：labelField
 * 实际用作计算传输：valueField
 */
export function formatFun(val, dict, labelField = "label", valueField = "value", defaultTitle) {

  let filterArray = dict.filter(d => String(d[valueField]) === String(val)) 
        let result = ''


    


    if (filterArray.length > 0) {
        result = filterArray[0][labelField]
    } else {
        let notfound = dict.filter(d => d[valueField] === null)
        result = notfound.length > 0 ? notfound[0][labelField] : defaultTitle || '无配置'
    }
    return result
}

Object.prototype.type = function () {
    let obj = this
    let prototypeStr = Object.prototype.toString.call(obj)
    let typeDict = 'Boolean Number String Function Array Date RegExp Object'
    function class2type(s) {
        let arr = typeDict.split(" ").filter(item => "[object " + item.toLowerCase() + "]" === s.toLowerCase())
        return arr.length > 0 ? arr[0] : null
    }
    let result = obj == null ? String(obj) : class2type(prototypeStr) || "object";
    return result
}
import ('axios').then(axios => {
    if (typeof axios === "undefined") {
        console.log("没有发现axios的存在", axios);
    } else { // 添加请求拦截器
        Object.prototype.$http = axios;
        Object.prototype.$http.notfound = function () {
            console.log("默认的404处理程序")
        }
        axios.interceptors.request.use(function (config) {
            config.headers['X-Requested-With'] = 'XMLHttpRequest'
            console.log("捕捉到axios的存在,request之前的config:", config); // 在发送请求之前做些什么
            return config;
        }, function (error) {
            console.log("错误处理", error); // 对请求错误做些什么
            return Promise.reject(error);
        });
        // 添加响应拦截器
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            console.log("error.response.status", error.response.status); // 对响应错误做点什么
            if (error.response.status === 404) {
                console.log("捕捉到axioserror.response.status==404", error.response); // 对响应数据做点什么
                Object.prototype.$http.notfound()
                return error.response
            }
            return Promise.reject(error);
        });
    }
})
