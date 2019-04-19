import {getHeaderYearsHtml, getHeaderYearsSpan, getInitHeaderYear} from "./template";
const DAYS = ['一', '二', '三', '四', '五', '六', '日'],
    MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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

                if (self.$calendar.data('type') === 'start') {
                    self.DateRangeSelect.endCalendar.$title.find('.drs-header-popup').hide();
                } else {
                    self.DateRangeSelect.startCalendar.$title.find('.drs-header-popup').hide();
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

export default Calendar;
