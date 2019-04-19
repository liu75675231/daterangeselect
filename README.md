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
``` json
{
    // 输出选项，控制所有点击确定后，输出相关的配置
   output: {   
    show: '$("#id1")',   // 把格式化的输出文字信息输出到指定dom中
    start: '$("#id2")',  // 把开始日期的时间文字信息输出到指定dom中
    end: '$("#id3")',  // 把结束日期的时间文字信息输出到指定dom中
    allowEmpty: false, // 值为boolean，默认为false,如果为true，则会多出一个重置按钮，点击以后，输出的日期都为undefined
    plain: false, // 值为boolean，默认为false，如果为true，则输出指定的日期的Date格式化字符串，反之则返回其对应Date对象
   },
   submitCallback: function (start, end) {} // 点击确定或者重置后，触发该回调，参数start和end分别为开始时间或者结束日期，其结果可能为Date对象或者是格式化字符串，需要根据output.plain字段来定
}
```
