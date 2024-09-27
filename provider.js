var stringToHTML = function(str) {
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
}

function exist (result, currentResult)
{
	for (let i = 0; i < result.length; i++){
		if (result[i].name == currentResult.name && result[i].lessonLocation == currentResult.lessonLocation && result[i].position == currentResult.position && result[i].teacher == currentResult.teacher && result[i].week == currentResult.week && result[i].timeTable.time == currentResult.timeTable.time && result[i].timeTable.weeks == currentResult.timeTable.weeks)
			return 1
	}
	return 0
}

async function showMessage()
{
    await loadTool('AIScheduleTools')
	await AIScheduleAlert('当前页面无课程数据，请登录翱翔门户后定位到“翱翔教务 - 课程管理 - 我的课表”页，并选择需要导入课程的学期。')
}

async function scheduleHtmlProvider() { //函数名不要动
	var result = {}
	
	await new Promise((resolve) => {
		try{
			var obj = document.getElementsByTagName('iframe')
			for (let i = 0; i < obj.length; i++){
				console.log(obj[i].src)
				if (obj[i].src.indexOf('/student/for-std/course-table') != -1){
					var courseTablePage = obj[i].contentWindow.document
					resolve(courseTablePage)
					break
				}
			}	
			if (courseTablePage == undefined)
				showMessage()
		}
		catch(e){
			showMessage()
		}
	}).then(resolve = (courseTablePage) => {
		var allLessonsInfo = []
		// 按周数读取内容
		for (let i = '1'; i <= '7'; i++) {
			var list = courseTablePage.getElementsByClassName(i)
			//console.log(list)
			//console.log("==========周", i, "================")
	
			for (let j = 0; j < list.length; j++) {
				if (list[j].localName == 'tr')
					continue
				
				var lessonInfo = stringToHTML(list[j].innerHTML)
				// 读取一节课程所有信息
				try {
					lessonInfo = lessonInfo.getElementsByClassName("tdHtml")[0].innerHTML
					// console.log(lessonInfo)
					if (lessonInfo == '')
						continue
				} catch (e) {
					continue
				}
	
				// 考虑到同一时间多节课的情况
				lessonInfo = lessonInfo.split('<div class="course-name">')
				for (let k = 1; k < lessonInfo.length; k++){
					let currentLessonInfo = lessonInfo[k]
					// console.log(currentLessonInfo)
					
					// 读取课程名称
					let lessonName = currentLessonInfo.substring(currentLessonInfo.indexOf("</span></div>") + 13, currentLessonInfo.indexOf("</div><div>"))
					// console.log(lessonName)
	
					// 读取单节课程的所有节次
					let lessonSections = currentLessonInfo.match(/(?<=<\/div><div>)(.*)(?=<\/div>)/)
					lessonSections = lessonSections[0].match(/(?<=<\/div><div>)(.*)(?=<div>)/)[0]
					lessonSections = lessonSections.replace(/&nbsp/g, ' ')
					lessonSections = lessonSections.replace(/;/g, '')
					lessonSections = lessonSections.replace(/<\/div>/g, '<br>')
					lessonSections = lessonSections.split('<br>')
					// console.log(lessonSections)
	
					// 填充每一节课的信息
					for (let l = 0; l < lessonSections.length; l++) {
						let currentResult = {}
						let currentLessonSection = lessonSections[l]
						if (currentLessonSection == '')
							continue
						// console.log(currentLessonSection)
						currentLessonSection = currentLessonSection.replace(/ {2,}/g, ' ')
						let currentLesson = currentLessonSection.split(' ')
						// console.log(currentLesson)
	
						// 读取时间信息
						let timeTable = {}
						timeTable.weeks = currentLesson[0].match(/\((.*)周/)[1]
						timeTable.time = currentLesson[1].match(/\((.*)节/)[1]
						if (timeTable.time.indexOf("5") != -1 || timeTable.time.indexOf("6") != -1)
							continue // 中午的课程不予考虑
						else
							currentResult.timeTable = timeTable
						// console.log(timeTable)
		
						// 读取课程位置
						let lessonLocation = currentLesson[2] + " " + currentLesson[3]
						currentResult.lessonLocation = lessonLocation
						// console.log(lessonLocation)
		
						// 读取老师信息
						let teacherInfo = currentLesson[4]
						currentResult.teacher = teacherInfo
						// console.log(teacherInfo)
		
						// 存入课程项
						currentResult.name = lessonName
						currentResult.position = lessonLocation
						currentResult.teacher = teacherInfo
						currentResult.timeTable = timeTable
						currentResult.week = i
	
						if (exist(allLessonsInfo, currentResult))
							continue
						allLessonsInfo.push(currentResult)
						console.log(currentResult)
					} 
				}
			}
		}
	
		var semesterDate = courseTablePage.getElementsByTagName('span')[1].innerHTML
		var semesterWeeks = courseTablePage.getElementsByClassName('selectize-dropdown-content')[1].children.length - 1
		// console.log(semesterWeeks)
		result = {semesterDate, semesterWeeks, allLessonsInfo}
	})
	// console.log(result)
	return JSON.stringify(result)
}