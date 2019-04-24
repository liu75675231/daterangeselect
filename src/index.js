import TEMPLATE, { getOptButtons } from './template'
import Calendar from "./calendar";
import { init as rangeInit } from "./range";
var $, DAYS, DateRangeSelect;
$ = jQuery;

const defaults = {
    output: {
        show: undefined,
        allowEmtpy: false,
        plain: false,
    },
    range: {
        show: true,
        data:[],
    },
    submitCallback: function () { },
}

DateRangeSelect = (function () {
        function DateRangeSelect($select, options) {
            this.$select = $select;
            this.$DateRangeSelect = $(TEMPLATE);
            this.$select.attr('tabindex', '-1').before(this.$DateRangeSelect);
            this.isHidden = true;
            this.options = $.extend(true, {}, defaults, options);
            this.initOptions();
            this.initBindings();

            if (options.startDate && options.endDate) {
                this.setRange('direct', options.startDate, options.endDate);
            } else {
                this.setRange('day', 0, 7);
            }

        }
        DateRangeSelect.prototype.initOptions = function () {
            rangeInit(this);
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
            if (rect.left + 650 > window.innerWidth) {
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
        return DateRangeSelect;
    }
)();

$.fn.DateRangeSelect = function (options) {
    return new DateRangeSelect(this, options);
}
