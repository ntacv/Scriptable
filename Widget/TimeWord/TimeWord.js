
// set your preferences

// polite, trash or automatique (get angry at 10pm)
var language = "automatique"
//Change to what you want
const backgroundColor = "#333444" 
const textColor = "#ccc666"
const gradientBackround = true


// Various variables used throughout the code
const width = 120
const height = 32
const baseColor = "#242305"
const fillColor = "#e7e247"
const white = "#ffffff"
var today = new Date()

var hours = ['ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE','TEN','ELEVEN','TWELVE'];
var quarters = ["OCLOCK","FIFTEEN","THIRTY","FORTY"]

// define the widget entity
let widget = createWidget()


if (config.runsInWidget) {
  // The script runs inside a widget, so we pass our instance of ListWidget to be shown inside the widget on the Home Screen.
  Script.setWidget(widget)
}else{	
	// The script runs inside the app, so we preview the widget.
  widget.presentLarge()
}


//Widget update time
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// Function to create the widget
function createWidget() {
	
	  // Create a new ListWidget
  const w = new ListWidget()
		
  if(gradientBackround){
// 	for a linear gradient backround
let gradient = new LinearGradient()
gradient.colors = [new Color(backgroundColor), new Color("#002200")]
gradient.locations = [0.3,0.9]
w.backgroundGradient = gradient

}else{
  w.backgroundColor = new Color(backgroundColor)
  }

if(language=="automatique" && today.getHours()<21 && today.getHours()>8){
	language = "polite"
}else{
	language = "trash"
}
  
// first part for trashy text
if (language == "trash" ){
  

  var trashText = w.addText("It's already\n"+ writeDate(hours, today.getHours())+ "\nfucking\n" + quarters[quarter(today.getMinutes())]+"!!!")

  trashText.font = Font.regularSystemFont(22)
  trashText.textColor = new Color(textColor)
  trashText.centerAlignText()


/*
  var time = pad(today.getHours(),2)+ ":" + pad(today.getMinutes(),2);
let update = w.addText( time);

update.font = Font.regularSystemFont(62);
update.textColor = new Color(white);
update.centerAlignText();
*/

w.addSpacer()
  // Grab a symbol in Apple's SF Symbol
  const playSymbol = SFSymbol.named("iphone.slash")
  
  // Turn that into an image to be used in the widget
  const playImage = w.addImage(playSymbol.image)
  
  // Give the image a tint, size and alignment
  playImage.tintColor = new Color(textColor)
  playImage.imageSize = new Size(20, 20)
  playImage.centerAlignImage()

  
    }else{
	
// 	second part for nicer text
	  var trashText = w.addText("It is\n"+ writeDate(hours, today.getHours())+ "\nand\n" + quarters[quarter(today.getMinutes())])

  trashText.font = Font.regularSystemFont(22)
  trashText.textColor = new Color(textColor)
  trashText.centerAlignText()

	
	w.addSpacer()
  // Grab a symbol in Apple's SF Symbol
  const playSymbol = SFSymbol.named("swift")
  
  // Turn that into an image to be used in the widget
  const playImage = w.addImage(playSymbol.image)
  
  // Give the image a tint, size and alignment
  playImage.tintColor = new Color(textColor)
  playImage.imageSize = new Size(20, 20)
  playImage.centerAlignImage()

	
}

  w.presentMedium()
  return w
}


// choosing wich range of minutes
function quarter(minute){
	var quarter = 0
	if(minute>=10 && minute<20){
		quarter = 1
	}else if(minute>=20 && minute<40){
		quarter = 2
	}else if(minute>=40 && minute<55){
		quarter = 3
	}
	
	return quarter
}

// simplify hours to stay in 12 format
function writeDate(hourList, hour){
	var i = hour
    if(hour >12){
i = hour-12

}
	return hourList[i-1]
}

// not used
function writeMinute(quarterList, minute){
	
	var i = 0
	
	return quarterList[i]
}