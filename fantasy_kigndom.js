let tank = {
  size: 1,
  population: 1,
  density: 1,
  ratio: function() {
    return (this.population/this.size)/this.density;
  }
}

let gui = {
  sobj: document.getElementById("size"),
  pobj: document.getElementById("population"),
  dobj: document.getElementById("density"),
  uobj: document.getElementById("unit"),
  tobj: document.getElementById("translation"),
  nobj: document.getElementById("newSize"),
  
  refresh: function() {
    tank.size = this.sobj.value;
    tank.population = this.pobj.value;
    tank.density = this.dobj.value;
	const ratio = tank.ratio();
	const nsize = ratio * tank.size;
	if(this.uobj.value == "kilometres") {
		this.tobj.value = ratio.toFixed(4) + " square kilometres";
		this.nobj.value = nsize.toFixed(0) + " square kilometres";
	} else if (this.uobj.value == "miles") {
		this.tobj.value = ratio.toFixed(4) + " square miles";
		this.nobj.value = nsize.toFixed(0) + " square miles";
	}
  }
}

window.addEventListener("load", function() {
  gui.sobj.addEventListener("change", function() { gui.refresh(); });
  gui.pobj.addEventListener("change", function() { gui.refresh(); });
  gui.dobj.addEventListener("change", function() { gui.refresh(); });
  gui.uobj.addEventListener("change", function() { gui.refresh(); });
  gui.refresh();
});
