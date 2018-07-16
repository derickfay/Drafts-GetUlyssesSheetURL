// See online documentation for examples
// http://getdrafts.com/scripting

var p = Prompt.create();
p.title = "Search Ulysses Titles";
p.addTextField("f","","");
p.addButton("Enter");
p.addSwitch("regex","Use Regular Expressions?",false);

if (p.show()) {

var db = Dropbox.create();

var path = "/ulyssesIndex.txt";

let i = db.read(path);

// alert(i);

var dc = i.split("\n")

if (p.fieldValues["regex"]) {
var f = RegExp(p.fieldValues["f"]);
dc = dc.filter(s => f.test(s));
} else {
var f = p.fieldValues["f"];
dc = dc.filter(s => s.includes(f));
}

}

const titles = ti => ti.map(t => "["+t.split("\",")[0].substr(1)+"]"+"("+t.split("\",")[1]+")");

var pTitles = titles(dc);

var picker = Prompt.create();
picker.title = "Found URLs";
picker.addButton("Copy");
picker.addSelect("URLs", "Select:", values=pTitles, selectedValues=[], allowMultiple=true);

if (picker.show()) {
var mdLinks=picker.fieldValues["URLs"]

draft.setTemplateTag("mdLinks", mdLinks.join("\n"))


}
