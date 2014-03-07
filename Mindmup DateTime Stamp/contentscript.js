$( document ).ready(function(){
    chrome.extension.sendMessage({}, function(response) {});
    
	$( document ).bind('keydown', function(e){

        var keystroke;
        var initials;
        chrome.storage.sync.get(function(storage){
            initials = storage.initials;        
            keystroke = storage.keystroke;
        

            if(e.keyCode == keystroke.keyCode && e.shiftKey == keystroke.shiftKey 
              && e.altKey == keystroke.altKey && e.ctrlKey == keystroke.ctrlKey) {
                if( $(document.activeElement).attr("id") == "attachEditArea") {
                    var newDate = new Date();
                    var datetime = newDate.timeNow() + " "+ newDate.today() + ": ";
                    var initaldatetime = initials + " " + datetime + " ";
                    pasteHtmlAtCaret(initaldatetime);
                }            			
        	}
         });       
	})
});

Date.prototype.today = function(){ 
    return (this.getMonth()+1) +"/"+ ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+this.getFullYear() 
};
//For the time now
Date.prototype.timeNow = function(){
	var hour = this.getHours();
	var time = "PM";
	if(hour < 12){
		time = "AM";
	}
	else if(hour > 12){
		hour = hour-12;
	}
    return hour +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + " " + time;
};

function pasteHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}