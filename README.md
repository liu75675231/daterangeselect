使用本插件，需要引用bootstrap 3和jquery

基本用法
``` javascript
    $("#datepicker").DateRangeSelect({
        output: {
            show: $("#id1"),
            allowEmtpy: true,
            plain: false,
        },
        submitCallback: function (start, end) {
            console.log(start);
        }
    });
```

配置项
``` javascript
{
   output: {   // 输出选项，控制所有点击确定后，输出相关的配置
    show: '$("#id1")',   // 把格式化的输出文字信息输出到指定dom中
    start: '$("#id2")',  // 把开始日期的时间文字信息输出到指定dom中
    end: '$("#id3")',  // 把结束日期的时间文字信息输出到指定dom中
    allowEmpty: false, // 值为boolean，默认为false,如果为true，则会多出一个重置按钮，点击以后，输出的日期都为undefined
    plain: false, // 值为boolean，默认为false，如果为true，则输出指定的日期的Date格式化字符串，反之则返回其对应Date对象
   },
   range: {   // 左边快捷选项菜单相关配置
       show: true,  //是否显示左边快捷选项菜单
       data: [     // 左边快捷菜单具体条目，可以为空，如果为空，并且show为true的话，那么将会显示默认快捷键列表
        {         // 用户可以自定义自己的快捷条目
            type: 'month',   // 定义自定义条目的类型，值为：day，week， month， season， year
            name: '前三个月',  // 显示名称
            offsetStart: -3,  // 开始时间相比现在来说的相对于type的时间偏移量
            offsetEnd: -1,   // 结束时间相比现在来说的相对于type的时间偏移量，其应该大于offsetStart
        },
        "yesterday",   // 为比较常用的快捷键配置了一些可枚举的字符串，其为：today, yesterday, last7Days, thisWeek, lastWeek, thisMonth, lastMonth, thisSeason, lastSeason, thisYear, lastYear
       ],
   },
   submitCallback: function (start, end) {} // 点击确定或者重置后，触发该回调，参数start和end分别为开始时间或者结束日期，其结果可能为Date对象或者是格式化字符串，需要根据output.plain字段来定
}
```
