
/* eslint-disable */
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
        changeRandomColor:() => {
            var colors = [
              "primary",
              "success",
              "warning",
              "error",
              "blue",
              "green",
              "red",
              "yellow",
              "pink",
              "magenta",
              "volcano",
              "orange",
              "gold",
              "lime",
              "cyan",
              "geekblue"
            ];
            var ra = Math.floor(Math.random() * 16);
            return  colors[ra];
          }
    
}
