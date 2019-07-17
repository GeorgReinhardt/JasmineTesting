function TodoList(dom, callback){
  // Kontrollieren, ob schon etwas im Speicher ist, ansonsten initialisieren
  if(localStorage.getItem("list") == null){
    localStorage.setItem("list", JSON.stringify([]));
  }

  if(localStorage.getItem("indexCounter") == null){
    localStorage.setItem("indexCounter", "0");
  }

  this.currentDate = new Date().toLocaleDateString();
  this.dom = dom;

  // Funktion die ausgeführt wird, nach einem repaint
  this.callback = callback;
  this.repaint();
};

TodoList.prototype.getList = function(){
  var list = JSON.parse(localStorage.getItem("list"));
  return list;
};

TodoList.prototype.getIndexCounter = function(){
  var list = JSON.parse(localStorage.getItem("indexCounter"));
  return list;
};

TodoList.prototype.getTodo = function(index){
  //gibt einen Todo-Eintrag über seinen tatsächlichen Index zurück
  var list = this.getList();
  var todo;
  $.each(list, function(key, val){
    if(val != undefined) {
      if(val.index == parseInt(index)){
        todo = val;
      }
    }
  });
  return todo;
};

TodoList.prototype.add = function(text, date){
  // Liste einlesen
  var list = this.getList();
  var index = parseInt(localStorage.getItem("indexCounter"));
  // Neues Element anhängen
  list.push({
    index: index,
    text: text,
    date: date,
    isMarked: false
  });

  // Liste speichern, indexCounter inkrementieren
  localStorage.setItem("list", JSON.stringify(list));
  localStorage.setItem("indexCounter", index+1);

  // Liste neu Anzeigen
  this.repaint();
};

TodoList.prototype.remove = function(index){
  // Liste einlesen
  var list = this.getList();

  // Liste durchgehen, das entsprechende Item finden und löschen
  $.each(list, function(key, val){
    if(val != undefined) {
      if(parseInt(val.index) == parseInt(index)){
        list.splice(key, 1);
      }
    }
  });

  // Liste abspeichern
  localStorage.setItem("list", JSON.stringify(list));
  // Liste neu Anzeigen
  this.repaint();
};


TodoList.prototype.repaint = function(){
  // Liste einlesen
  var list = this.getList();
  var row = $("<div class=\"row\"></div>");
  var currentDate = this.currentDate;
  var dom = this.dom;

  // Inhalt löschen
  $(dom).html("");

  $.each(list, function(key, val){
    var item = $("<div class=\"col-12 listitem\"></div>");
    var subrow = $("<div class=\"row\"></div>");
    var field1 = $("<div class=\"col-7\"></div>");
    var span1 = $("<span>"+val.text+"</span>");
    var field2 = $("<div class=\"col-3\"></div>");
    var span2 = $("<span class=\"center\">"+val.date+"</span>");
    if(val.date == currentDate){
      field2.addClass("today");
      val.isMarked = true;
    }

    var field3 = $("<div class=\"col-2\"></div>");
    var button = $("<span class=\"button remove-item\" data-index=\""+val.index+"\">X</span>")

    $(field1).append(span1);
    $(subrow).append(field1);

    $(field2).append(span2);
    $(subrow).append(field2);

    $(field3).append(button);
    $(subrow).append(field3);

    $(item).append(subrow);
    $(dom).append(item);

    localStorage.setItem("list", JSON.stringify(list));
  });

  this.callback();
}
