import config from './config'

let template = `
    <div class="datepicker-container">
        <div class="shortcut-wrapper">
            <div class="shortcut-list">
                <div class="shortcut-item" data-type="day" data-start="0" data-end="0">今天</div>
                <div class="shortcut-item" data-type="day" data-start="-1" data-end="-1">昨天</div>
                <div class="shortcut-item" data-type="day" data-start="-6" data-end="0">最近7天</div>
                <div class="shortcut-item" data-type="week" data-start="0" data-end="0">本周</div>
                <div class="shortcut-item" data-type="week" data-start="-1" data-end="-1">上周</div>
                <div class="shortcut-item" data-type="month" data-start="0" data-end="0">本月</div>
                <div class="shortcut-item" data-type="month" data-start="-1" data-end="-1">上月</div>
                <div class="shortcut-item" data-type="season" data-start="0" data-end="0">本季</div>
                <div class="shortcut-item" data-type="season" data-start="-1" data-end="-1">上季</div>
                <div class="shortcut-item" data-type="year" data-start="0" data-end="0">今年</div>
                <div class="shortcut-item" data-type="year" data-start="-1" data-end="-1">去年</div>
            </div>
        </div>
        
        <div class="main-content">
            <div class="calendar-content">
                <div class="start-date date-panel">
                    <div class="input-group input-group-sm">
                        <span class="input-group-btn">
                            <button class="btn btn-default">
                                <b class="glyphicon glyphicon-calendar fa fa-calendar"></b>
                            </button>
                        </span>
                        <input type="text" class="form-control input-date" placeholder="开始时间" data-type="start">
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th class="arrow" data-type="priv" title="上一个月">
                                    <b class="glyphicon glyphicon-chevron-left"></b>
                                </th>
                                <th class="header-date-title" colspan="5"></th>
                                <th class="arrow" data-type="next" title="下一个月">
                                    <b class="glyphicon glyphicon-chevron-right"></b>
                                </th>
                            </tr>
                            <tr class="header-week"></tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="end-date date-panel">
                    <div class="input-group input-group-sm">
                        <span class="input-group-btn">
                            <button class="btn btn-default">
                                <b class="glyphicon glyphicon-calendar fa fa-calendar"></b>
                            </button>
                        </span>
                        <input type="text" class="form-control  input-date" placeholder="结束时间" data-type="end">
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th  class="arrow" data-type="priv"  title="上一个月">
                                    <b class="glyphicon glyphicon-chevron-left"></b>
                                </th>
                                <th class="header-date-title" colspan="5"></th>
                                <th  class="arrow" data-type="next"  title="下一个月">
                                    <b class="glyphicon glyphicon-chevron-right"></b>
                                </th>
                            </tr>
                            <tr class="header-week"></tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="btn-panel">
                <button class="btn btn-success btn-sm btn-submit">确定</button>
                <button class="btn btn-default btn-sm btn-cancel">取消</button>
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

