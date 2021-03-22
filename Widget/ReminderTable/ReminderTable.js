// License Nathan Choukroun


// Store the data by putting a one for eachtask done for the day. Outputting a table with each ones colored in the theme. 
// Inspired by the github widgets




// Editable variables

const backgroundColor = "#111111"
const themeColor = "#46bd46"
const date = new Date()


//resetFile()

// define the widget entity
let widget = createWidget()


if (config.runsInWidget) {
	
  // The script runs inside a widget, so we pass our instance of ListWidget to be shown inside the widget on the Home Screen.
  Script.setWidget(widget)
}else{	
	// The script runs inside the app, so we preview the widget.


  widget.presentMedium()
}




// Function to create the widget
function createWidget() {
  // Create a new ListWidget
  const w = new ListWidget()
  w.backgroundColor = Color.white()
	
var textInput

if(args.queryParameters["reminder"]!=null){

 textInput = args.shortcutParameter["reminder"]
console.log(textInput)

}else{
	textInput = "null"
}
console.log(textInput)

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


//contactList["Tons"][date.getDay()][1]++

for(i=0;i<6;i++){
	
	console.log(reminderData["Tons"][i])
}


// fm.writeString(reminderFile, JSON.stringify(reminderData))


// var hey = w.addText(reminderData["Tons"][1])

//for(i=0;i<7;i++){
	
    var hey = w.addText(textInput)
    hey.font = Font.regularMonospacedSystemFont(16)
    hey.textColor = new Color(themeColor)
    hey.centerAlignText()




/*
	//drawSquare(w)
	let square = SFSymbol.named(i+".square.fill")
	squareList = w.addImage(square.image)
	
	squareList.tintColor = new Color(themeColor)
  squareList.imageSize = new Size(20, 18)
*/
	
	
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

reminderData = JSON.parse(fm.readString(reminderFile));

console.log(reminderData)

var textReset = {"Tons":"001011"}

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