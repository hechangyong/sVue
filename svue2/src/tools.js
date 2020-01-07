
export default {
    formatDate: (time, format = 'YY-MM-DD HH:mm:ss') => {
        var date = new Date(time);

        var year = date.getFullYear(),
            month = date.getMonth() + 1,//月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
            return '0' + index;
        });////开个长度为10的数组 格式为 00 01 02 03

        var newTime = format.replace(/YY/g, year)
            .replace(/MM/g, preArr[month] || month)
            .replace(/DD/g, preArr[day] || day)
            .replace(/HH/g, preArr[hour] || hour)
            .replace(/mm/g, preArr[min] || min)
            .replace(/ss/g, preArr[sec] || sec);

        return newTime;
    },

    groupBy: (array, f) => {
        // debugger;
        const groups = {};
        array.forEach(function (o) {
            const group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
            return groups[group];
        });
    },
    /**
     * 格式化价格
     * @param {价格} price 
    */
    formatPrice: (price) => {
        return (price / 100).toFixed(2);
    },
    /**
     * 解析获取url参数
     */
    parseUrl: (queryKey) => {
        var search = location.search;

        if (search.length > 0 && search.indexOf('?') > -1) {
            search = search.substring(1);
            var cArr = search.split('&');

            for (var i = 0, len = cArr.length; i < len; i++) {
                var item = cArr[i],
                    key = cArr[i].split('=')[0],
                    val = cArr[i].split('=')[1];

                if (key === queryKey) {
                    return val;
                }
            }
        }

        return null;
    },

    /**
     *  删除url上的某个参数
     */
    deleteUrlQuery: (queryKey) => {
        var search = location.search;
        var resSearch = '';
        var queryArr = [].concat(queryKey);

        if (search.length > 0 && search.indexOf('?') > -1) {
            search = search.substring(1);
            var cArr = search.split('&');

            for (var i = 0, len = cArr.length; i < len; i++) {
                var item = cArr[i],
                    key = cArr[i].split('=')[0],
                    val = cArr[i].split('=')[1];

                if (queryArr.indexOf(key) === -1) {
                    if (resSearch.length == 0) {
                        resSearch += '?' + key + '=' + val;
                    } else {
                        resSearch += '&' + key + '=' + val;
                    }
                }
            }
        }

        return location.origin + location.pathname + resSearch;
    },
    /**
     * 获取url中的source，返回对应的shareSource
     */
    getShareSource: () => {
        var source = parseUrl('source');

        if (source && /^share(\d)+$/.test(source)) {
            source = 'share' + (Number(source.slice(5)) + 1);
        } else {
            source = 'share0';
        }

        return source;
    },

    /**
     * 是否是IOS
     */
    isIOS: () => {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        return isiOS;
    },

    /**
     * // 是否是Android
     */
    isAndroid: () => {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

        return isAndroid;
    },
    /**
     * // 是否是微信环境
     */

    isWechat: () => {
        //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

}
