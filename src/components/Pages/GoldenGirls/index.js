import $ from "jquery";

var numb=($(".allsaves .save").length)
var midScreenSave = 1;
var activeSave = 1
var tempSave = 1
var scrollTop = $(".allsaves").scrollTop();
var winHeight = $(".allsaves").prop('scrollHeight')-$(".allsaves").height();
var scrollPercent = (scrollTop) / (winHeight)	
var scrollPercentRounded = Math.round(scrollPercent*100);
function setActiveSave(num,temp){
	if (temp==1){
		tempSave = num
	}
	activeSave = num
	$('.save').removeClass("save--active");
	$('#save'+num).addClass("save--active");
	updateScrollings()
}
function restoreSave(){
	setActiveSave(tempSave,0)
}
$(".allsaves").scroll(function(e){
	updateScrollings()
});
$(window).resize(function(){
    updateScrollings()
});
setTimeout
function updateScrollings(){
	scrollTop = $(".allsaves").scrollTop();
	winHeight = $(".allsaves").prop('scrollHeight')-$(".allsaves").height();
	scrollPercent = (scrollTop) / (winHeight)	
	scrollPercentRounded = Math.round(scrollPercent*100);
	for(let j=0;j<=numb;j++){
		if (j==activeSave){
			//$('#save'+j).css("transform","translateX("+(37+(scrollPercent-(j/10))*(-10))+"vmin) skew(2deg)");}
			$('#save'+j).css("transform","translateX("+(30+((j-(scrollPercent*(numb+1)))*3))+"%) skewY(2deg) scale(1.1)");}
		else{
			//$('#save'+j).css("transform","translateX("+((30)+(scrollPercent-(j/10))*(-20))+"vmin) skew(2deg) ");}
			$('#save'+j).css("transform","translateX("+(30+((j-(scrollPercent*(numb+1)))*3))+"%) skewY(2deg)");}
			let range = 1/numb
			if (scrollPercent>((j*range)-.05) && scrollPercent<((j+1)*range)){
				midScreenSave = j;
				//setActiveSave(j);
		}
	}
}
for(let i = 0; i <= numb; i++) {
  $('#save' + i).click( function(){
    setActiveSave(i,0);
		confirm("Load file "+i+"?");
		// $('#save' + i + " ")
  });
	$('#save' + i).hover( function(){
    setActiveSave(i,1);
  });
	$('#save' + i).mouseleave( function(){
    restoreSave();
  });
}
setActiveSave(1)

const number = 59
const handle = '@tuxedollamas'

function DialogueMessage(props){
	return <h1>{props.number}</h1>
}
function atComponent (props){
	return <h3>{props.handle}</h3>
}
// https://codepen.io/Jop/pen/c518b59a39110411f154fb37fd31cdac?editors=0010
function App(){
	return(
		
	<div className="dialogue di--confirm">
		<div className="di--messageholder">
			<div className="di--message">Are you sure you want to load file {number}?	</div>
		</div>
		<div className="di--buttonholder">
			<button className="di-nobutton" onClick={()=>dismissLoad(i)}>Blech, nevermind.</button>
			<button className="di-yesbutton" onClick={()=>confirmLoad(i)}>Yep!</button>
		</div>
	</div>

	)
}
function loadPopup(i){	
ReactDOM.render(
	<App number = {i}/>,
	document.getElementById('popup')
)
}