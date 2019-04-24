import Config from "./config";

function getRangeHtml (option) {
    const arr = [];
    let template = '';
    if (option.range.show) {
        option.range.data.forEach((elem) => {
            let data = undefined;
            if (typeof elem === 'object') {
                data = elem;
            } else {
                data = Config.ranges[elem];
            }
            if (data) {
                arr.push(`<div class="drs-shortcut-item" data-type="${ data.type }" data-start="${ data.offsetStart }" data-end="${ data.offsetEnd }">${ data.name }</div>`);
            }
        });
    }
    return arr.join('');
}

function bindEvent (DateRangeSelect) {
    let $DateRangeSelect = DateRangeSelect.$DateRangeSelect;
    $DateRangeSelect.find('.drs-shortcut-item').click(function (evt) {
        var presetIndex;
        var $this = $(this);
        presetIndex = $this.index();
        DateRangeSelect.$select[0].selectedIndex = presetIndex;
        DateRangeSelect.setRange($this.data('type'),$this.data('start'), $this.data('end'));
    });
}

export function init (DateRangeSelect) {
    const $DateRangeSelect = DateRangeSelect.$DateRangeSelect,
        options = DateRangeSelect.options;
    if (options.range.show) {
        $DateRangeSelect.addClass('with-range');
        if (!options.range.data.length) {
            options.range.data = Object.keys(Config.ranges);
        }
        $DateRangeSelect.find('.drs-shortcut-list').html(getRangeHtml(options));
        bindEvent(DateRangeSelect);
    }
}


