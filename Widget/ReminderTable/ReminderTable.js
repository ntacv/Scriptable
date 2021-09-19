// License Nathan Choukroun


// Store reminder data by putting a one for eachtask done for the day. Outputting a table with each ones colored in the color theme. 
// Inspired by the github widgets. 

// You can put the sortcut and the data file in a another phone to continue using it. 










// reduce data, keep only the square



// edit for me
// save date of the day and add a value if !=


// Editable variables
if(Device.isUsingDarkAppearance()){
  const backgroundColor ="#eeeeee"
}else{
const backgroundColor = "#111111"
}
const themeColor = "#46bd46"


// not editable 
const date = new Date()
const dateSave = new String(date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear())

const day = date.getDay()-1



    // Find today's reminders that are part of the reminder list
    // NOTE : all-day reminders have their time set to 00:00 of the same day, but aren't returned with incompleteDueToday...
let queryStartTime = new Date()
queryStartTime.setDate(queryStartTime.getDate() - 1)
queryStartTime.setHours(23, 59, 59, 0)
let queryEndTime = new Date()
queryEndTime.setHours(23, 59, 59, 0)


var cal = Calendar.defaultForReminders()

// fetch reminders
var reminderComplete = await Reminder.completedBetween(queryStartTime, queryEndTime)

var numberReminderDone = 0

for(var reminder of reminderComplete){
	
	if(reminder.calendar.title == "EveryDay"){
		numberReminderDone++
		//console.log(reminder.title)
}
}
console.log("done : "+numberReminderDone)






// Fetch reminder data from iCloud/Local drive
let fm = FileManager.local();

const iCloudUsed = fm.isFileStoredIniCloud(module.filename);

fm = iCloudUsed ? FileManager.iCloud() : fm;

const widgetFolder = "DoneTable";

const offlinePath = fm.joinPath(fm.documentsDirectory(), widgetFolder);

if (!fm.fileExists(offlinePath)){

fm.createDirectory(offlinePath);
}

reminderFile = fm.joinPath(offlinePath,'DoneTable.json');

reminderData = JSON.parse(fm.readString(reminderFile));






// sync data one time a day
if(reminderData["lastDay"] != String(dateSave)){


reminderData["lastDay"] = String(dateSave)
console.log(reminderData["lastDay"])

var reminderValue = reminderData["data"]

var months = reminderData["data"].length


if(reminderValue[0].length ==4){
//.unshift
  reminderValue.unshift([0])
}else{
	if(reminderValue[0][0] != 0){
	  reminderValue[0].unshift(0)
    }else{
	  //reminderValue[0][0] += 2*10^day    
      reminderValue[0][0] = 1
      console.log("write data for day")
}
}

console.log(reminderData["data"][0][0])


//reminderData["data"][reminderDataLength] = 3*10^(day)
reminderData["data"][0][1] = 1


fm.writeString(reminderFile, JSON.stringify(reminderData))

/*
for(var i=0;i<=reminderDataLength;i++){
	console.log(reminderData["data"][reminderDataLength-1][i])
	
}*/




}//if date





// To reset the data file, 
// uncomment the next line
// run the code once 
// comment the line again tu ruen the code safely
//// 
// resetFile()



// define the widget entity
let widget = createWidget()


if (config.runsInWidget) {
	
  // The script runs inside a widget, so we pass our instance of ListWidget to be shown inside the widget on the Home Screen.
  Script.setWidget(widget)
}else{	
	// The script runs inside the app, so we preview the widget.


  //widget.presentSmall()
}

Script.complete()


// Function to create the widget
function createWidget() {
  // Create a new ListWidget
  const w = new ListWidget()
  w.backgroundColor = Color.white()
	
var textInput

if(args.queryParameters["reminder"]!=null){

 textInput = args.shortcutParameter["reminder"]
//console.log(textInput)

}else{
	textInput = "null"
}
//console.log(textInput)

// Fetch contact list from iCloud/Local drive
let fm = FileManager.local();

const iCloudUsed = fm.isFileStoredIniCloud(module.filename);

fm = iCloudUsed ? FileManager.iCloud() : fm;

const widgetFolder = "DoneTable";

const offlinePath = fm.joinPath(fm.documentsDirectory(), widgetFolder);

if (!fm.fileExists(offlinePath)){

fm.createDirectory(offlinePath);
}

reminderFile = fm.joinPath(offlinePath,'DoneTable.json');

reminderData = JSON.parse(fm.readString(reminderFile));



// fm.writeString(reminderFile, JSON.stringify(reminderData))







  let line = w.addStack()
  line.layoutVertically()
  line.setPadding(0, 4, 0, 0)


  for(var i=0;i<7;i++){

  let column = line.addStack()

  for(var j=0;j<6;j++){
	
//let squareItem = SFSymbol.named(i*j+".square.fill")
let squareItem = SFSymbol.named("square.fill")
squareList = column.addImage(squareItem.image)

squareList.imageSize = new Size(18, 18)

if(j<reminderData["data"].length){
	
	if(i<reminderData["data"][j].length){
		
		let inputValue = reminderData["data"][j][i]
		
		if(inputValue != 0){
		
			squareList.tintColor = new Color(themeColor)
}	
		else{
			squareList.tintColor = Color.lightGray()
}//input

}//if i

}//if j
else{
	
	squareList.tintColor = Color.black()


}//if j
 column.addSpacer(4)
}//for
}//for






	
	return w
}



function drawSquare(w){
// Grab a symbol in Apple's SF Symbol
  const playSymbol = SFSymbol.named("square.fill")
  // Turn that into an image to be used in the widget
  const playImage = w.addImage(playSymbol.image)
  // Give the image a tint, size and alignment
  playImage.tintColor = new Color(themeColor)
  playImage.imageSize = new Size(20, 18)
  //playImage.centerAlignImage()
}


function firstRect(){
	
		const drw = new DrawContext()
	drw.size = new Size(100, 100)
	drw.opaque = false
	drw.respectScreenScale = true
	drw.setFillColor(new Color(themeColor))
	
	const base = new Path()
	
	var rect = new Rect(0, 0, 50, 50)
	base.addRoundedRect(rect, 2, 3)
	drw.addPath(base)
	drw.fillPath()
	drw.setFillColor(new Color(themeColor))
	
	
	
	return drw.getImage()
}

function drawIcon(text, bcgColor, textColor){
    // Use only mono-spaced font here
    let iconFont = new Font("Menlo Bold", 60);
    let iconCanvas = new DrawContext();
    iconCanvas.opaque = false;
    iconCanvas.size = new Size(100,100);
    let iconRect = new Rect(0,0,100,100);
    text = text.substr(0,1)
    textRect = new Rect(30,15,70,85);
    iconCanvas.setFillColor(bcgColor);
    iconCanvas.fillEllipse(iconRect);
    iconCanvas.setFont(iconFont);
    iconCanvas.setTextColor(textColor);
    iconCanvas.drawTextInRect(text,textRect);
    let icon = iconCanvas.getImage();
    return icon;
}

function drawAvatar(sfSymbol, name1, name2, bcgColor, textColor){
    // Use only mono-spaced font here
    let avatarFont = new Font("Menlo Bold", 100);
    let avatarCanvas = new DrawContext();
    avatarCanvas.opaque = false;
    avatarCanvas.size = new Size(200,200);
    let avatarRect = new Rect(0,0,200,200);
    if (sfSymbol === null) {
        if (name2 !== null && name2 != ""){
            text = name1.substr(0,1) + name2.substr(0,1)
            textRect = new Rect(40,40,150,150);
        } else {
            text = name1.substr(0,1)
            textRect = new Rect(70,40,150,150);
        }
        avatarCanvas.setFillColor(bcgColor);
        avatarCanvas.fillEllipse(avatarRect);
        avatarCanvas.setFont(avatarFont);
        avatarCanvas.setTextColor(textColor);
        avatarCanvas.drawTextInRect(text,textRect);
    } else {// SFSymbol
        symbol = SFSymbol.named(sfSymbol);
        symbol.applyFont(Font.regularRoundedSystemFont(100));
        avatarCanvas.drawImageInRect(symbol.image,avatarRect);
    }

    let avatar = avatarCanvas.getImage();
    return avatar;
}


function resetFile(){
	
	// Fetch contact list from iCloud/Local drive
let fm = FileManager.local();

const iCloudUsed = fm.isFileStoredIniCloud(module.filename);

fm = iCloudUsed ? FileManager.iCloud() : fm;

const widgetFolder = "DoneTable";

const offlinePath = fm.joinPath(fm.documentsDirectory(), widgetFolder);

if(!fm.fileExists(offlinePath)){
fm.createDirectory(offlinePath);
}

reminderFile = fm.joinPath(offlinePath,'DoneTable.json');
// 
// fm.copy(reminderFile, fm.joinPath(offlinePath, "DoneTableCopy.json"))

reminderData = JSON.parse(fm.readString(reminderFile));

console.log(reminderData)

var textReset = 
{"name":"reminderData",
"lastDay":" ",
"data":[
[0,0,0,0,0,0,0]
]
}

fm.writeString(reminderFile, JSON.stringify(textReset))

/*
var sureToReset = new Alert()
sureToReset.message = "Are you sure you want to delete all the data from the cache file?"
sureToReset.title = "Reset file"
sureToReset.addTextField("Yes")
sureToReset.addAction("Done")
sureToReset.addCancelAction("Cancel")

sureToReset.presentAlert()

if(sureToReset.presentAlert(1)){
var resetedFile = new Alert()
resetedFile.title = sureToReset.textFieldValue(0)
resetedFile.presentAlert()
// fm.writeString(contactsFile, JSON.stringify(contactList))
}
	console.log(sureToReset.presentAlert(1))
	*/
}
