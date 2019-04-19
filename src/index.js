import TEMPLATE, { getOptButtons, getHeaderYearsHtml, getHeaderYearsSpan, getInitHeaderYear } from './template'
import config from "./config";
var $, Calendar, DAYS, DateRangeSelect, MONTHS;
$ = jQuery;
DAYS = ['一', '二', '三', '四', '五', '六', '日'];
MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

const defaults = {
    ranges: [ Object.keys(config.ranges) ],
    submitCallback: function () { },
}

DateRangeSelect = (function () {
        function DateRangeSelect($select, options) {
            this.$select = $select;
            this.$DateRangeSelect = $(TEMPLATE);
            this.$select.attr('tabindex', '-1').before(this.$DateRangeSelect);
            this.isHidden = true;
            this.options = $.extend({}, defaults, options);
            this.initOptions();
            this.initBindings();

            if (options.startDate && options.endDate) {
                this.setRange('direct', options.startDate, options.endDate);
            } else {
                this.setRange('day', 0, 7);
            }

        }
        DateRangeSelect.prototype.initOptions = function () {
            if (this.options.noRanges) {
                this.$DateRangeSelect.addClass('no-ranges');
            }
            this.$select.parent().css({
                position: 'relative',
            });
            this.$DateRangeSelect.find('.drs-btn-panel').html(getOptButtons(this.options));
        }
        DateRangeSelect.prototype.initBindings = function () {
            var self;
            self = this;
            this.$select.on('focus mousedown', function (e) {
                var $select;
                $select = this;
                setTimeout(function () {
                    return $select.blur();
                }, 0);
                return false;
            });

            this.$DateRangeSelect.bind('click', function (evt) {
                let $target = $(evt.target);
                if ($target.hasClass('drs-header-popup-priv') || $target.hasClass('drs-header-popup-next')) {
                    return evt.stopPropagation();
                }
                if (!$target.hasClass('drs-header-btn')) {
                    self.$DateRangeSelect.find('.drs-header-popup').hide();
                }

                return evt.stopPropagation();
            });

            $(document).click(function (evt) {
                if ((evt.target === self.$select[0] || $(evt.target).parent(self.$select[0])[0] === self.$select[0]) && self.isHidden) {
                    self.$DateRangeSelect.find('.drs-header-popup').hide();
                    return self.show();
                } else if (!self.isHidden) {
                    return self.hide();
                }
            });
            this.$DateRangeSelect.find('.drs-btn-cancel').click(function () {
                return self.hide();
            });

            if (self.options.output && self.options.output.allowEmtpy) {
                this.$DateRangeSelect.find('.drs-btn-reset').click(function () {
                    var output = self.options.output;
                    if (output.show) {
                        output.show.prop('tagName').toLowerCase() === 'input'
                            ? output.show.val('')
                            : output.show.text('');
                    }
                    if (output.start) {
                        output.start.prop('tagName').toLowerCase() === 'input'
                            ? output.start.val('')
                            : output.start.text('');
                    }

                    if (output.end) {
                        output.end.prop('tagName').toLowerCase() === 'input'
                            ? output.end.val('')
                            : output.end.text('');
                    }

                    self.options.submitCallback && self.options.submitCallback(undefined, undefined);
                    return self.hide();
                });
            }

            this.$DateRangeSelect.find('.drs-btn-submit').click(function () {
                if (self.startCalendar.date > self.endCalendar.date) {
                    console.error('开始时间不能大于结束时间，请重新选择');
                    return;
                }

                let startDate = self.formatDate(self.startDate()),
                    endDate = self.formatDate(self.endDate());
                var callbackStartDate = self.startDate();
                var callbackEndDate = self.endDate();
                if (self.options.output) {
                    let output = self.options.output,
                        $show = output.show,
                        $start = output.start,
                        $end = output.end;

                    if ($show) {
                        let text = startDate + '至' + endDate;
                        $show.prop('tagName').toLowerCase() === 'input'
                            ? $show.val(text)
                            : $show.text(text);
                    }
                    if ($start) {
                        $start.prop('tagName').toLowerCase() === 'input'
                            ? $start.val(startDate)
                            : $start.html(startDate);
                    }
                    if ($end) {
                        $end.prop('tagName').toLowerCase() === 'input'
                            ? $end.val(endDate)
                            : $end.text(endDate);
                    }
                    if (self.options.output.plain) {
                        callbackStartDate = self.formatDate(callbackStartDate);
                        callbackEndDate = self.formatDate(callbackEndDate);
                    }
                }

                self.options.submitCallback && self.options.submitCallback(callbackStartDate, callbackEndDate);
                return self.hide();
            });
            this.$DateRangeSelect.on("keypress blur",".drs-input-date", function (e) {
                if (e.type === 'keypress' && e.which !== 13) {
                    return true;
                }
                var isDateStr = true;
                var dateObj = {}
                self.$DateRangeSelect.find(".drs-input-date").each(function (index, elem) {
                    if (elem.value === '' || new Date(elem.value) == 'Invalid Date') {
                        isDateStr = false;
                        console.error('日期为空或者不合法');
                        self.showCustomDate();
                        return false;
                    }
                    var $elem = $(elem);
                    dateObj[$elem.data('type')] = elem.value;
                })

                if (isDateStr) {
                    if (dateObj.start > dateObj.end) {
                        self.setRange('direct', dateObj.start, dateObj.start);
                    } else {
                        self.setRange('direct', dateObj.start, dateObj.end);
                    }

                }
                return true;
            });
            return this.$DateRangeSelect.find('.drs-shortcut-item').click(function (evt) {
                var presetIndex;
                var $this = $(this);
                presetIndex = $this.index();
                self.$select[0].selectedIndex = presetIndex;
                self.setRange($this.data('type'),$this.data('start'), $this.data('end'));
            });
        }
        DateRangeSelect.prototype.hide = function () {
            this.isHidden = true;
            return this.$DateRangeSelect.hide();
        }
        ;
        DateRangeSelect.prototype.show = function () {
            this.isHidden = false;
            this.adjustPosition();
            return this.$DateRangeSelect.show();
        }
        DateRangeSelect.prototype.adjustPosition = function () {
            var rect = this.$select.get(0).getBoundingClientRect();
            var pos = {
                top: rect.height + 'px',
            };

            var left = undefined;
            if (rect.left + 650 > screen.availWidth) {
                pos.right =  '0px';
            } else {
                pos.left = '0px';
            }
            this.$DateRangeSelect.css(pos);
        }
        DateRangeSelect.prototype.showCustomDate = function () {
            this.startCalendar.$input.val(this.formatDate(this.startDate()));
            this.endCalendar.$input.val(this.formatDate(this.endDate()));
        }
        DateRangeSelect.prototype.formatDate = function (d) {
            return d.getFullYear() + "-" + this.formatNumber(d.getMonth() + 1) + '-' +  this.formatNumber(d.getDate());
        }
        DateRangeSelect.prototype.formatNumber = function (num, len = 2) {
            return (Array(len).join(0) + num).slice(-len);
        }
        DateRangeSelect.prototype.setRange = function (type = 'day', start = 0, end = 30) {
            var endDate, startDate;
            var obj = {
                day: function (dateObj, offset) {
                    dateObj.setDate(dateObj.getDate() + offset);
                },
                week: function (dateObj, offset, isWeekEnd) {
                    var cur = undefined;
                    var cur = dateObj.getDate() - dateObj.getDay() + 1 + offset * 7;
                    if (isWeekEnd) {
                        cur += 6;
                    }
                    dateObj.setDate(cur);

                },
                month: function (dateObj, offset, isEnd) {
                    dateObj.setDate(1);
                    if (isEnd) {
                        dateObj.setMonth(dateObj.getMonth() + offset + 1);
                        dateObj.setDate(dateObj.getDate() - 1);
                    } else {
                        dateObj.setMonth(dateObj.getMonth() + offset);
                    }
                },
                season: function (dateObj, offset, isEnd) {
                    dateObj.setDate(1);
                    if (isEnd) {
                        dateObj.setMonth((offset + 1) * 3);
                        dateObj.setDate(dateObj.getDate() - 1);
                    } else {
                        dateObj.setMonth(offset * 3);
                    }
                },
                year: function (dateObj, offset, isEnd) {
                    dateObj.setDate(1);
                    dateObj.setMonth(0);
                    if (isEnd) {
                        dateObj.setFullYear(dateObj.getFullYear() + offset + 1);
                        dateObj.setDate(dateObj.getDate() - 1);
                    } else {
                        dateObj.setFullYear(dateObj.getFullYear() + offset);
                    }
                },
                direct: function (dateObj, dateStr) {
                    var tempDate = new Date(dateStr);
                    if (tempDate == 'Invalid Date') {
                        console.error('日期格式不正确');
                        return false;
                    }
                    dateObj.setDate(tempDate.getDate());
                    dateObj.setMonth(tempDate.getMonth());
                    dateObj.setFullYear(tempDate.getFullYear());
                }
            }
            if (!obj[type]) {
                console.error('类型不对：' + type + ", we need " + Object.keys(obj).join(','));
                return;
            }
            // daysAgo -= 1;
            endDate = new Date();
            startDate = new Date();

            obj[type](startDate, start, false);
            obj[type](endDate, end, true);
            this.startCalendar = new Calendar(this, this.$DateRangeSelect.find('.drs-start-date'), startDate, true);
            this.endCalendar = new Calendar(this, this.$DateRangeSelect.find('.drs-end-date'), endDate, false);
            this.showCustomDate();
            return this.draw();
        };
        DateRangeSelect.prototype.endDate = function () {
            return this.endCalendar.date;
        }
        ;
        DateRangeSelect.prototype.startDate = function () {
            return this.startCalendar.date;
        }
        ;
        DateRangeSelect.prototype.draw = function () {
            this.startCalendar.draw();
            return this.endCalendar.draw();
        }
        ;
        return DateRangeSelect;
    }
)();
Calendar = (function () {
        function Calendar(DateRangeSelect, $calendar, date, isStartCalendar) {
            var self;
            this.DateRangeSelect = DateRangeSelect;
            this.$calendar = $calendar;
            this.date = date;
            this.isStartCalendar = isStartCalendar;
            self = this;
            this.date.setHours(0, 0, 0, 0);
            this._visibleMonth = this.month();
            this._visibleYear = this.year();
            this.$title = this.$calendar.find('.drs-header-date-title');
            this.$dayHeaders = this.$calendar.find('.drs-header-week');
            this.$input = this.$calendar.find('.drs-input-date');
            this.$days = this.$calendar.find('tbody');
            this.$dateDisplay = this.$calendar.find('.drp-calendar-date');
            this.currentHeaderPopupMaxYear = getInitHeaderYear();

            this.$title.find('.drs-header-popup-container').html(getHeaderYearsHtml(this.currentHeaderPopupMaxYear));

            $calendar.find('.drs-arrow').click(function (evt) {
                if ($(this).data('type') === 'next') {
                    if ($(this).data('span') === 'month') {
                        self.showNextMonth();
                    } else {
                        self.showNextYear();
                    }

                } else {
                    if ($(this).data('span') === 'month') {
                        self.showPreviousMonth();
                    } else {
                        self.showPreviousYear();
                    }

                }
                return false;
            });
            this.$title.find('.drs-header-btn').off("click").click(function(e) {
                let $elem = $(e.target);
                let $popupYear = self.$title.find('.drs-header-popup-year');
                let $popupMonth = self.$title.find('.drs-header-popup-month');
                if ($elem.data('type') === 'year') {
                    if ($popupYear.css('display') === 'block') {
                        $popupYear.hide();
                    } else {
                        self.setYearSelectPanel(getInitHeaderYear());
                        self.$title.find('.drs-header-popup-item').removeClass('drs-selected');
                        self.$title.find('.drs-year-' + self._visibleYear).addClass('drs-selected');
                        console.log(self);
                        $popupYear.show();
                    }
                    $popupMonth.hide();
                } else {
                    if ($popupMonth.css('display') === 'block') {
                        $popupMonth.hide();
                    } else {
                        self.$title.find('.drs-header-popup-item').removeClass('drs-selected');
                        self.$title.find('.drs-month-' + self._visibleMonth).addClass('drs-selected');
                        $popupMonth.show();
                    }
                    $popupYear.hide();
                }
            });
            this.$title.on('click', '.drs-header-popup-item', function(e) {
                let $target = $(e.target);
                if ($target.hasClass('drs-header-popup-priv')) {
                    self.setYearSelectPanelToPriv();
                    return;
                }
                if ($target.hasClass('drs-header-popup-next')) {
                    self.setYearSelectPanelToNext();
                    return;
                }

                let type = $target.parent('.drs-header-popup').data('type');

                if (type === 'month') {
                    self.setCurrentMonth($target.data('num'));
                } else {
                    let num = undefined;
                    if ($target.hasClass('drs-header-popup-this-year')) {
                        num = new Date().getFullYear();
                    } else {
                        num = $target.data('num');
                    }
                    self.setCurrentYear(num);
                }
            });
        }
        Calendar.prototype.setYearSelectPanelToPriv = function () {
            this.currentHeaderPopupMaxYear -= getHeaderYearsSpan();
            this.$title.find('.drs-header-popup-container').html(getHeaderYearsHtml(this.currentHeaderPopupMaxYear));
        }
        Calendar.prototype.setYearSelectPanelToNext = function () {
            this.currentHeaderPopupMaxYear += getHeaderYearsSpan();
            this.$title.find('.drs-header-popup-container').html(getHeaderYearsHtml(this.currentHeaderPopupMaxYear));
        }
        Calendar.prototype.setYearSelectPanel = function (num) {
            this.currentHeaderPopupMaxYear = num;
            this.$title.find('.drs-header-popup-container').html(getHeaderYearsHtml(this.currentHeaderPopupMaxYear));
        }
        Calendar.prototype.showPreviousMonth = function () {
            if (this._visibleMonth === 1) {
                this._visibleMonth = 12;
                this._visibleYear -= 1;
            } else {
                this._visibleMonth -= 1;
            }
            return this.draw();
        }
        Calendar.prototype.showPreviousYear = function () {
            this._visibleYear -= 1;
            return this.draw();
        }
        Calendar.prototype.setCurrentYear = function (year) {
            this._visibleYear = year;
            this.draw();
        }
        Calendar.prototype.showNextMonth = function () {
            if (this._visibleMonth === 12) {
                this._visibleMonth = 1;
                this._visibleYear += 1;
            } else {
                this._visibleMonth += 1;
            }
            return this.draw();
        }
        Calendar.prototype.setCurrentMonth = function (month) {
            this._visibleMonth = month;
            this.draw();
        }
        Calendar.prototype.showNextYear = function () {
            this._visibleYear += 1;
            return this.draw();
        }
        Calendar.prototype.setDay = function (day) {
            this.setDate(this.visibleYear(), this.visibleMonth(), day);
            return this.DateRangeSelect.showCustomDate();
        }
        ;
        Calendar.prototype.setDate = function (year, month, day) {
            this.date = new Date(year, month - 1, day);
            this.DateRangeSelect.showCustomDate();
            return this.DateRangeSelect.draw();
        }
        ;
        Calendar.prototype.draw = function () {
            var day, _i, _len;
            this.$dayHeaders.empty();
            this.$title.find('.drs-header-year').text(this.visibleYear() + '年');
            this.$title.find('.drs-header-month').text(this.nameOfMonth(this.visibleMonth()));
            for (_i = 0, _len = DAYS.length; _i < _len; _i++) {
                day = DAYS[_i];
                this.$dayHeaders.append($("<th>" + day + "</th>"));
            }
            this.drawDateDisplay();
            return this.drawDays();
        }
        ;
        Calendar.prototype.dateIsSelected = function (date) {
            return date.getTime() === this.date.getTime();
        }
        ;
        Calendar.prototype.dateIsInRange = function (date) {
            return date >= this.DateRangeSelect.startDate() && date <= this.DateRangeSelect.endDate();
        }
        ;
        Calendar.prototype.dayClass = function (day, type) {
            var classes, date;
            switch (type) {
                case 'priv':
                    date = new Date(this.visibleYear(), this.visibleMonth() - 2, day);
                    break;
                case 'next':
                    date = new Date(this.visibleYear(), this.visibleMonth(), day);
                    break;
                default:
                    date = new Date(this.visibleYear(), this.visibleMonth() - 1, day);
                    break;
            }

            classes = '';

            if (this.dateIsSelected(date)) {
                classes = 'drs-active';
                if (this.$calendar.hasClass("drs-start-date")) {
                    classes += ' drs-start-day';
                }
                if (this.$calendar.hasClass("drs-end-date")) {
                    classes += ' drs-end-day';
                }

            } else if (this.dateIsInRange(date)) {
                classes = 'drs-in-range';
                if (date.getTime() === this.DateRangeSelect.endDate().getTime()) {
                    classes += ' drp-day-last-in-range';
                }
            } else if (this.isStartCalendar) {
                if (date > this.DateRangeSelect.endDate()) {
                    classes += ' drs-day-disabled';
                }
            } else if (date < this.DateRangeSelect.startDate()) {
                classes += ' drs-day-disabled';
            }
            return classes;
        }
        Calendar.prototype.isLastDayOfWeek = function (day, firstDayOfMonth, lastDayOfMonth) {
            if ((day + firstDayOfMonth - 2) % 7 === 0 || day === lastDayOfMonth) {
                return true;
            }
            return false;
        }

        Calendar.prototype.drawDays = function () {
            var firstDayOfMonth, i, lastDayOfMonth, self, _i, _j, _ref;
            self = this;
            this.$days.empty();
            firstDayOfMonth = this.firstDayOfMonth(this.visibleMonth(), this.visibleYear());
            var daysOfLastWeekOfLastMonth = this.daysOfLastWeekOfLastMonth(this.visibleMonth(), this.visibleYear());
            lastDayOfMonth = this.daysInMonth(this.visibleMonth(), this.visibleYear());

            var tempDaysArr = [];
            for (let n = 0; n < daysOfLastWeekOfLastMonth.length; n++) {
                tempDaysArr.push("<td class='drs-not-current-month " + (this.dayClass(daysOfLastWeekOfLastMonth[n], 'priv')) + "' data-type='priv'>" + daysOfLastWeekOfLastMonth[n] + "</td>");
            }

            var num = 0;
            var isFirst = true;
            for (i = _j = 1; _j <= lastDayOfMonth; i = _j += 1) {
                tempDaysArr.push("<td class='" + (this.dayClass(i, 'cur')) + "' data-type='cur'>" + i + "</td>");
                if (this.isLastDayOfWeek(i, firstDayOfMonth, lastDayOfMonth)) {
                    if (tempDaysArr.length < 7) {
                        let nextNum = 6 - tempDaysArr.length;
                        for (let n = 0; n <= nextNum; n++) {
                            tempDaysArr.push("<td class='drs-not-current-month " + (this.dayClass((n + 1), 'next')) + "' data-type='next'>" + (n + 1) + "</td>");
                        }
                    }
                    this.$days.append($("<tr>" + tempDaysArr.join('') + "</tr>"));
                    tempDaysArr = [];
                }
            }

            return this.$calendar.find('td').click(function (evt) {
                var day;
                if ($(this).hasClass('drs-day-disabled')) {
                    return false;
                }

                day = parseInt($(this).text(), 10);
                if (isNaN(day)) {
                    return false;
                }

                if ($(this).data("type") === 'priv') {
                    self.setDate(self._visibleYear, self._visibleMonth - 1, day);
                    self.showPreviousMonth();
                } else if ($(this).data("type") === 'next') {
                    self.setDate(self._visibleYear, self._visibleMonth + 1, day);
                    self.showNextMonth();
                } else {
                    self.setDay(day);
                }
            });
        }
        ;
        Calendar.prototype.drawDateDisplay = function () {
            return this.$dateDisplay.text([this.month(), this.day(), this.year()].join('/'));
        }
        ;
        Calendar.prototype.month = function () {
            return this.date.getMonth() + 1;
        }
        ;
        Calendar.prototype.day = function () {
            return this.date.getDate();
        }
        ;
        Calendar.prototype.dayOfWeek = function () {
            return this.date.getDay() + 1;
        }
        ;
        Calendar.prototype.year = function () {
            return this.date.getFullYear();
        }
        ;
        Calendar.prototype.visibleMonth = function () {
            return this._visibleMonth;
        }
        ;
        Calendar.prototype.visibleYear = function () {
            return this._visibleYear;
        }
        ;
        Calendar.prototype.nameOfMonth = function (month) {
            return MONTHS[month - 1];
        }
        ;
        Calendar.prototype.firstDayOfMonth = function (month, year) {
            return new Date(year, month - 1, 1).getDay() + 1;
        }

        Calendar.prototype.daysOfLastWeekOfLastMonth = function (month, year) {
            var lastMonthLastDayObj = new Date(year, month - 1, 0);
            var lastMonthLastDate = lastMonthLastDayObj.getDate();
            var days = lastMonthLastDayObj.getDay();
            var arr = [];
            for (let i = days; i >= 0, i--;) {
                arr.push(lastMonthLastDate - i);
            }
            return arr;
        }

        Calendar.prototype.daysInMonth = function (month, year) {
            month || (month = this.visibleMonth());
            year || (year = this.visibleYear());
            return new Date(year, month, 0).getDate();
        }
        ;
        return Calendar;
    }
)();
$.fn.DateRangeSelect = function (options) {
    return new DateRangeSelect(this, options);
}
