export default {
    rangeTypes: {
        day: true,
        week: true,
        month: true,
        season: true,
        year: true,
    },
    ranges: {
        today: {
            type: 'day',
            name: '今天',
            offsetStart: 0,
            offsetEnd: 0,
        },
        yesterday: {
            type: 'day',
            name: '昨天',
            offsetStart: -1,
            offsetEnd: -1,
        },
        last7Days: {
            type: 'day',
            name: '最近7天',
            offsetStart: -6,
            offsetEnd: 0,
        },
        thisWeek: {
            type: 'week',
            name: '本周',
            offsetStart: 0,
            offsetEnd: 0,
        },
        lastWeek: {
            type: 'week',
            name: '上周',
            offsetStart: -1,
            offsetEnd: -1,
        },
        thisMonth: {
            type: 'month',
            name: '本月',
            offsetStart: 0,
            offsetEnd: 0,
        },
        lastMonth: {
            type: 'month',
            name: '上月',
            offsetStart: -1,
            offsetEnd: -1,
        },
        thisSeason: {
            type: 'season',
            name: '本季',
            offsetStart: 0,
            offsetEnd: 0,
        },
        lastSeason: {
            type: 'season',
            name: '上季',
            offsetStart: -1,
            offsetEnd: -1,
        },
        thisYear: {
            type: 'year',
            name: '今年',
            offsetStart: 0,
            offsetEnd: 0,
        },
        lastYear: {
            type: 'year',
            name: '去年',
            offsetStart: -1,
            offsetEnd: -1,
        },
    },
}
