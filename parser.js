function parseWeeks(weeksString) {
    var weeks = []
    weeksString = weeksString.split(',')
    // console.log(weeksString)
    for (let i = 0; i < weeksString.length; i++) {
        let splitedWeeksString = []
        splitedWeeksString = weeksString[i].split('~')
        // console.log(splitedWeeksString)
        if (splitedWeeksString.length == 1) {
            //表明只上一周
            weeks.push(parseInt(splitedWeeksString[0]))
        }// 考虑单双周上课情况
        else if (splitedWeeksString[1].indexOf("(单)") != -1) {
            let startWeek = parseInt(splitedWeeksString[0])
            let endWeek = parseInt(splitedWeeksString[1])
            if (startWeek % 2 == 0)
                startWeek = startWeek + 1
            if (endWeek % 2 == 0)
                endWeek = endWeek - 1
            for (let j = startWeek; j <= endWeek; j = j + 2) {
                weeks.push(j)
            }
        } else if (splitedWeeksString[1].indexOf("(双)") != -1) {
            let startWeek = parseInt(splitedWeeksString[0])
            let endWeek = parseInt(splitedWeeksString[1])
            if (startWeek % 2 == 1)
                startWeek = startWeek + 1
            if (endWeek % 2 == 1)
                endWeek = endWeek - 1
            for (let j = startWeek; j <= endWeek; j = j + 2) {
                weeks.push(j)
            }
        } else {
            for (let j = parseInt(splitedWeeksString[0]); j <= parseInt(splitedWeeksString[1]); j++) {
                weeks.push(j)
            }
        }
    }

    weeks = weeks.sort((a, b) => {
        return a - b
    }
    )
    return weeks
}

function parseSection(sectionString) {
    sectionString = sectionString.split('-')
    //console.log(sectionString)
    var startSection = parseInt(sectionString[0])
    var endSection = parseInt(sectionString[1])
    if (startSection > 4)
        startSection = startSection - 2
    if (endSection > 4)
        endSection = endSection - 2
    var result = []

    for (let i = startSection; i <= endSection; i++) {
        result.push(i)
    }
    return result
}

function scheduleHtmlParser(res) {
    res = JSON.parse(res)
    var lessonInfo = res.allLessonsInfo
    console.log(lessonInfo)
    var result = []

    for (let i = 0; i < lessonInfo.length; i++) {
        // 获取所有课程
        //console.log(lessonInfo[i])
        let currentLessonInfo = {}
        currentLessonInfo.name = lessonInfo[i].name
        currentLessonInfo.position = lessonInfo[i].position
        currentLessonInfo.teacher = lessonInfo[i].teacher

        let timeTable = lessonInfo[i].timeTable

        // 解析周数
        let weeks = timeTable.weeks
        weeks = parseWeeks(weeks)
        currentLessonInfo.weeks = weeks
        //console.log(weeks)

        // 解析星期
        currentLessonInfo.day = parseInt(lessonInfo[i].week)
        //console.log(currentLessonInfo.day)

        // 解析节次
        let sections = timeTable.time
        sections = parseSection(sections)
        //console.log(sections)
        currentLessonInfo.sections = sections
        result.push(currentLessonInfo)
    }
    //console.log(result)
    if (result.length == 0) {
        let currentLessonInfo = {}
        currentLessonInfo.name = '当前未检索到课程'
        currentLessonInfo.position = ''
        currentLessonInfo.teacher = ''
        currentLessonInfo.weeks = [1]
        currentLessonInfo.day = 1
        currentLessonInfo.sections = [1, 2]
        result.push(currentLessonInfo)
    }
    return result
}