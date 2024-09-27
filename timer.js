function findWeekendLesson (lessonInfo)
{
    for (let i = 0; i < lessonInfo.length; i++){
        if (lessonInfo[i].week == "6" || lessonInfo[i].week == "7")
            return true
    }
    return false
}

function parseCampus (allLessonsInfo)
{
    var youyiLessonsCount = 0
    var changanLessonsCount = 0
    for (let i = 0; i < allLessonsInfo.length; i++){
        if (allLessonsInfo[i].lessonLocation.indexOf('友谊') != -1)
            youyiLessonsCount++
        else
            changanLessonsCount++
    }
    return  youyiLessonsCount > changanLessonsCount ? 1 : 0
}

async function scheduleTimer({providerRes, parserRes} = {}) 
{
    providerRes = JSON.parse(providerRes)
    // console.log(providerRes)
    var result = {}

    await loadTool('AIScheduleTools')
	await AIScheduleAlert('由于小爱课程表自身的限制，无法显示中午的课程，请注意中午排课信息！另请导入后注意当前周数！反馈建议请加3148228376')
    
    // 获取校区
    var campus = parseCampus(providerRes.allLessonsInfo)

    // 获取学期时间
    let startDay = new Date(providerRes.semesterDate)
    //console.log(Date.parse(startDay))
    result.startSemester = Date.parse(startDay) + ''
    result.startWithSunday = false
    
    // 获取周数
    result.totalWeek = providerRes.semesterWeeks

    // 是否显示周末
    result.showWeekend = findWeekendLesson(providerRes.allLessonsInfo)
    //console.log(result.showWeekend)

    result.forenoon = 4
    result.afternoon = 4
    result.night = 3

    var nowDate = new Date();
    if (campus == 0) { // 显示长安校区排课时间
        // console.log("当前显示长安校区排课时间")
        result.night = 3
        result.sections = [{
            section: 1, // 节次：[1, 30]之间的整数
            startTime: '08:30', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '09:15', // 结束时间：同上
        },{
            section: 2, // 节次：[1, 30]之间的整数
            startTime: '09:25', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '10:10', // 结束时间：同上
        },{
            section: 3, // 节次：[1, 30]之间的整数
            startTime: '10:30', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '11:15', // 结束时间：同上
        },{
            section: 4, // 节次：[1, 30]之间的整数
            startTime: '11:25', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '12:10', // 结束时间：同上
        },{
            section: 5, // 节次：[1, 30]之间的整数
            startTime: '14:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '14:45', // 结束时间：同上
        },{
            section: 6, // 节次：[1, 30]之间的整数
            startTime: '14:55', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '15:40', // 结束时间：同上
        },{
            section: 7, // 节次：[1, 30]之间的整数
            startTime: '16:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '16:45', // 结束时间：同上
        },{
            section: 8, // 节次：[1, 30]之间的整数
            startTime: '16:55', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '17:40', // 结束时间：同上
        },{
            section: 9, // 节次：[1, 30]之间的整数
            startTime: '19:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '19:45', // 结束时间：同上
        },{
            section: 10, // 节次：[1, 30]之间的整数
            startTime: '19:55', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '20:40', // 结束时间：同上
        },{
            section: 11, // 节次：[1, 30]之间的整数
            startTime: '20:40', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '21:25', // 结束时间：同上
        }]
    }
    else if(nowDate.getMonth() >= 9 || nowDate.getMonth() <= 3){ // 显示友谊校区冬季排课时间
        // console.log("当前显示友谊校区冬季排课时间")
        result.night = 2
        result.sections = [{
            section: 1, // 节次：[1, 30]之间的整数
            startTime: '08:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '08:50', // 结束时间：同上
        },{
            section: 2, // 节次：[1, 30]之间的整数
            startTime: '09:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '09:50', // 结束时间：同上
        },{
            section: 3, // 节次：[1, 30]之间的整数
            startTime: '10:10', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '11:00', // 结束时间：同上
        },{
            section: 4, // 节次：[1, 30]之间的整数
            startTime: '11:10', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '12:00', // 结束时间：同上
        },{
            section: 5, // 节次：[1, 30]之间的整数
            startTime: '14:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '14:50', // 结束时间：同上
        },{
            section: 6, // 节次：[1, 30]之间的整数
            startTime: '15:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '15:50', // 结束时间：同上
        },{
            section: 7, // 节次：[1, 30]之间的整数
            startTime: '16:10', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '17:00', // 结束时间：同上
        },{
            section: 8, // 节次：[1, 30]之间的整数
            startTime: '17:10', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '18:00', // 结束时间：同上
        },{
            section: 9, // 节次：[1, 30]之间的整数
            startTime: '19:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '19:50', // 结束时间：同上
        },{
            section: 10, // 节次：[1, 30]之间的整数
            startTime: '20:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '20:50', // 结束时间：同上
        }]
    }
    else { // 显示友谊校区夏季排课时间
        // console.log("当前显示友谊校区夏季排课时间")
        result.night = 2
        result.sections = [{
            section: 1, // 节次：[1, 30]之间的整数
            startTime: '08:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '08:50', // 结束时间：同上
        },{
            section: 2, // 节次：[1, 30]之间的整数
            startTime: '09:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '09:50', // 结束时间：同上
        },{
            section: 3, // 节次：[1, 30]之间的整数
            startTime: '10:10', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '11:00', // 结束时间：同上
        },{
            section: 4, // 节次：[1, 30]之间的整数
            startTime: '11:10', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '12:00', // 结束时间：同上
        },{
            section: 5, // 节次：[1, 30]之间的整数
            startTime: '14:30', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '15:20', // 结束时间：同上
        },{
            section: 6, // 节次：[1, 30]之间的整数
            startTime: '15:30', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '16:20', // 结束时间：同上
        },{
            section: 7, // 节次：[1, 30]之间的整数
            startTime: '16:40', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '17:30', // 结束时间：同上
        },{
            section: 8, // 节次：[1, 30]之间的整数
            startTime: '17:40', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '18:30', // 结束时间：同上
        },{
            section: 9, // 节次：[1, 30]之间的整数
            startTime: '19:30', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '20:20', // 结束时间：同上
        },{
            section: 10, // 节次：[1, 30]之间的整数
            startTime: '20:30', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '21:20', // 结束时间：同上
        }]
    }

  // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
    return result
}