import config from './config'

let template = `
    <div class="drs-datepicker-container">
        <div class="drs-shortcut-wrapper">
            <div class="drs-shortcut-list">
                <div class="drs-shortcut-item" data-type="day" data-start="0" data-end="0">今天</div>
                <div class="drs-shortcut-item" data-type="day" data-start="-1" data-end="-1">昨天</div>
                <div class="drs-shortcut-item" data-type="day" data-start="-6" data-end="0">最近7天</div>
                <div class="drs-shortcut-item" data-type="week" data-start="0" data-end="0">本周</div>
                <div class="drs-shortcut-item" data-type="week" data-start="-1" data-end="-1">上周</div>
                <div class="drs-shortcut-item" data-type="month" data-start="0" data-end="0">本月</div>
                <div class="drs-shortcut-item" data-type="month" data-start="-1" data-end="-1">上月</div>
                <div class="drs-shortcut-item" data-type="season" data-start="0" data-end="0">本季</div>
                <div class="drs-shortcut-item" data-type="season" data-start="-1" data-end="-1">上季</div>
                <div class="drs-shortcut-item" data-type="year" data-start="0" data-end="0">今年</div>
                <div class="drs-shortcut-item" data-type="year" data-start="-1" data-end="-1">去年</div>
            </div>
        </div>
        
        <div class="drs-main-content">
            <div class="drs-calendar-content">
                <div class="drs-start-date drs-date-panel">
                    <div class="input-group input-group-sm">
                        <span class="input-group-btn">
                            <span class="btn btn-default">
                                <b class="glyphicon glyphicon-calendar fa fa-calendar"></b>
                            </span>
                        </span>
                        <input type="text" class="form-control drs-input-date" placeholder="开始时间" data-type="start">
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th class="drs-arrow" data-type="priv" title="上一年" data-span="year">
                                    <b class="glyphicon glyphicon-backward"></b>
                                </th>
                                <th class="drs-arrow" data-type="priv" title="上一个月" data-span="month">
                                    <b class="glyphicon glyphicon-chevron-left"></b>
                                </th>
                                <th class="drs-header-date-title" colspan="3">
                                    <span class="drs-header-year drs-header-btn" data-type="year"></span>&nbsp;
                                    <span class="drs-header-month drs-header-btn" data-type="month"></span>
                                    <div class="drs-header-popup drs-header-popup-month" data-type="month" style="display: none;">
                                        <div class="drs-header-popup-item drs-month-1" data-num="1">1月</div>
                                        <div class="drs-header-popup-item drs-month-2" data-num="2">2月</div>
                                        <div class="drs-header-popup-item drs-month-3" data-num="3">3月</div>
                                        <div class="drs-header-popup-item drs-month-4" data-num="4">4月</div>
                                        <div class="drs-header-popup-item drs-month-5" data-num="5">5月</div>
                                        <div class="drs-header-popup-item drs-month-6" data-num="6">6月</div>
                                        <div class="drs-header-popup-item drs-month-7" data-num="7">7月</div>
                                        <div class="drs-header-popup-item drs-month-8" data-num="8">8月</div>
                                        <div class="drs-header-popup-item drs-month-9" data-num="9">9月</div>
                                        <div class="drs-header-popup-item drs-month-10" data-num="10">10月</div>
                                        <div class="drs-header-popup-item drs-month-11" data-num="11">11月</div>
                                        <div class="drs-header-popup-item drs-month-12" data-num="12">12月</div>
                                    </div>
                                    <div class="drs-header-popup drs-header-popup-year" data-type="year" style="display: none;">
                                        <div class="drs-header-popup-container"></div>
                                        <div class="drs-header-popup-item drs-header-popup-priv"><i class="glyphicon glyphicon-arrow-left drs-header-popup-priv"></i></div>
                                        <div class="drs-header-popup-item drs-header-popup-this-year">今年</div>
                                        <div class="drs-header-popup-item drs-header-popup-next"><i class="glyphicon glyphicon-arrow-right drs-header-popup-next"></i></div>
                                    </div>
                                </th>
                                <th class="drs-arrow" data-type="next" title="下一个月" data-span="month">
                                    <b class="glyphicon glyphicon-chevron-right"></b>
                                </th>
                                 <th class="drs-arrow" data-type="next" title="下一年" data-span="year">
                                    <b class="glyphicon glyphicon-forward"></b>
                                </th>
                            </tr>
                            <tr class="drs-header-week"></tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="drs-end-date drs-date-panel">
                    <div class="input-group input-group-sm">
                        <span class="input-group-btn">
                            <span class="btn btn-default">
                                <b class="glyphicon glyphicon-calendar fa fa-calendar"></b>
                            </span>
                        </span>
                        <input type="text" class="form-control  drs-input-date" placeholder="结束时间" data-type="end">
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th class="drs-arrow" data-type="priv" title="上一年" data-span="year">
                                    <b class="glyphicon glyphicon-backward"></b>
                                </th>
                                <th  class="drs-arrow" data-type="priv"  title="上一个月" data-span="month">
                                    <b class="glyphicon glyphicon-chevron-left"></b>
                                </th>
                                <th class="drs-header-date-title" colspan="3">
                                    <span class="drs-header-year drs-header-btn" data-type="year"></span>&nbsp;
                                    <span class="drs-header-month drs-header-btn" data-type="month"></span>
                                    <div class="drs-header-popup drs-header-popup-month" data-type="month" style="display: none;">
                                        <div class="drs-header-popup-item drs-month-1" data-num="1">1月</div>
                                        <div class="drs-header-popup-item drs-month-2" data-num="2">2月</div>
                                        <div class="drs-header-popup-item drs-month-3" data-num="3">3月</div>
                                        <div class="drs-header-popup-item drs-month-4" data-num="4">4月</div>
                                        <div class="drs-header-popup-item drs-month-5" data-num="5">5月</div>
                                        <div class="drs-header-popup-item drs-month-6" data-num="6">6月</div>
                                        <div class="drs-header-popup-item drs-month-7" data-num="7">7月</div>
                                        <div class="drs-header-popup-item drs-month-8" data-num="8">8月</div>
                                        <div class="drs-header-popup-item drs-month-9" data-num="9">9月</div>
                                        <div class="drs-header-popup-item drs-month-10" data-num="10">10月</div>
                                        <div class="drs-header-popup-item drs-month-11" data-num="11">11月</div>
                                        <div class="drs-header-popup-item drs-month-12" data-num="12">12月</div>
                                    </div>
                                    <div class="drs-header-popup drs-header-popup-year" data-type="year" style="display: none;">
                                        <div class="drs-header-popup-container"></div>
                                        <div class="drs-header-popup-item  drs-header-popup-priv"><i class="glyphicon glyphicon-arrow-left drs-header-popup-priv"></i></div>
                                        <div class="drs-header-popup-item drs-header-popup-this-year">今年</div>
                                        <div class="drs-header-popup-item  drs-header-popup-next"><i class="glyphicon glyphicon-arrow-right drs-header-popup-next"></i></div>
                                    </div>
                                </th>
                                <th  class="drs-arrow" data-type="next"  title="下一个月" data-span="month">
                                    <b class="glyphicon glyphicon-chevron-right"></b>
                                </th>                                 
                                <th class="drs-arrow" data-type="next" title="下一年" data-span="year">
                                    <b class="glyphicon glyphicon-forward"></b>
                                </th>
                            </tr>
                            <tr class="drs-header-week"></tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="drs-btn-panel">  
            </div>
        </div>
    </div>`

export default template;
export function getRangeHtml (arr = []) {
    let template = '';
    arr.forEach((elem) => {
        template = `<div class="shortcut-item" data-type="${ elem.type }" data-start="${ elem.offsetStart }" data-end="${ elem.offsetEnd }">{{ elem.name }}</div>`
    });
}
export function getOptButtons(option) {
    let arr = [
        '<button class="btn btn-success btn-sm drs-btn-submit drs-opt-btn" type="button">确定</button>',
        '<button class="btn btn-default btn-sm drs-btn-cancel drs-opt-btn" type="button">取消</button>',
    ];
    if (option.output && option.output.allowEmtpy) {
        arr.push('<button class="btn btn-default btn-sm drs-btn-reset drs-opt-btn" type="button">重置</button>');
    }
    return arr.join('');
}
const yearSpan = 18;
export function getHeaderYearsHtml(startYearNum) {
    const arr = [];
    let currentYear = Number(startYearNum) - 10;
    for (let i = 0; i < yearSpan; i++) {
        arr.push('<div class="drs-header-popup-item drs-year-' + currentYear + '" data-num="' + currentYear + '">' + currentYear + '</div>');
        currentYear++;
    }
    return arr.join('');
}
export function getHeaderYearsSpan () {
    return yearSpan;
}
const initHeaderYear = new Date().getFullYear();
export function getInitHeaderYear () {
    return initHeaderYear;
}
