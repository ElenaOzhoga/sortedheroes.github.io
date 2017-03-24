var data = {
	"Mortal Kombat": {
		"Sub-Zero": {},
		"Scorpion": {},
		"Noob Sybot": {}
	},
	"Marvel Universe": {
		"Fantastic Four": {
			"Mr. Fantastic": {},
			"Invisible Woman": {},
			"Human Torch": {},
			"The Thing": {}
		},
		"Spider-Man": {},
		"Avengers": {
			"Captain America":{},
			"Thor":{},
			"Iron-Man":{}
		},
		"X-Men": {
			"POCOMAXA":{},
			"mujik v kolyaske":{},
			"Magneto":{},
			"other guys":{}
		}
	},
	"DC Universe": {
		"Justice League": {
			"SuperMan": {},
			"Batman": {},
			"Wonder Woman": {}
		},
		"Supervillain": {
			"Lex Luthor": {},
			"The Joker": {},
			"Ra's al Ghul": {}
		}
	}
};

var content = document.querySelector('#content');

function createTree (htmlContainer, jsonData) {
	var domContent = '';
	if (jsonData) {
		domContent += '<ul class="item-list">';
		for (var key in jsonData) {
			domContent += "<li>" + key + (jsonData[key] ? "<ul>": "");
			for (var key1 in jsonData[key]) {
				domContent += "<li>" + key1 + (jsonData[key][key1] ? "<ul>": "");
				for (var key2 in jsonData[key][key1]) {
					domContent +=  "<li>" + key2 + "</li>";
				}
				domContent += (jsonData[key][key1] ? "</ul>": "") + "</li>";
			}
			domContent += (jsonData[key] ? "</ul>": "") + "</li>";
		}
		domContent += '</ul>';
		htmlContainer.innerHTML += domContent;
	}

}

function ascendingOrder (a, b) {
	if(a.innerText < b.innerText) return -1;
	if(a.innerText > b.innerText) return 1;
	return 0;
}

function descendingOrder (a, b) {
	if(a.innerText < b.innerText) return 1;
	if(a.innerText > b.innerText) return -1;
	return 0;
}


//todo @vm: в этом задании была идея собрать всех героев ИЗ дерева
//todo @vm: в обычный список, и его сортировать

//todo @vm: дерево сортировать конечно сложнее, и это плюс что ты сделала так :)
//todo @vm: хотелось бы еще видеть возможность как-то сортировать дерево туда-сюда

function sortTree(htmlContainer, ul) {
	var newUl = ul.cloneNode(false);
	var list = [];
	var innerList = [];
	var helpList = [];
	var innerInnerList = [];
	var helpInnerList = [];

	for(var i = 0; i < ul.childNodes.length; i++){
		list.push(ul.childNodes[i]);
	}

	//list.sort(ascendingOrder);
	list.sort(descendingOrder);

	for(var i = 0; i < list.length; i++){
		for (var j = 0; j < list[i].childNodes[1].childNodes.length; j++) {
			innerList[j] = list[i].childNodes[1].childNodes[j];
			innerList[j].className = i;
			helpList.push(innerList[j]);
		}
	}

	for(var i = 0; i < list.length; i++) {
		newUl.appendChild(list[i]);
	}

	//helpList.sort(ascendingOrder);
	helpList.sort(descendingOrder);

	for (var i = 0; i < helpList.length; i++) {
		for (var j = 0; j < helpList[i].childNodes[1].childNodes.length; j++) {
			innerInnerList[j] = helpList[i].childNodes[1].childNodes[j];
			innerInnerList[j].className = helpList[i].childNodes[0].data.replace(/\s/g,"");
			helpInnerList.push(innerInnerList[j]);
		}
	}

	for(var i = 0; i < newUl.childNodes.length; i++) {
		for(var j = 0; j < helpList.length; j++) {
			if (helpList[j].className == i) {
				newUl.childNodes[i].childNodes[1].appendChild(helpList[j]);
			}
		}
	}

	//helpInnerList.sort(ascendingOrder);
	helpInnerList.sort(descendingOrder);

	//todo @vm: вот эта часть стремно выглядит

	//todo @vm: проблема с этой частью и в целом с алгоритмом в том что он заточен под три степени вложенности, а если их будет больше?
	//todo @vm: тут уже нужна рекурсия :)
	//todo @vm: можешь попробовать переделать рекурсивно, либо уже сделать как было в задании изначально - сортировать обычный список
	for(var i = 0; i < newUl.childNodes.length; i++) {
		for(var j = 0; j < helpList.length; j++) {
			for (var k = 0; k < helpInnerList.length; k++) {
				if (newUl.childNodes[i].childNodes[1].childNodes[j] !== undefined) {
					//todo @vm: особенно это условие :)
					if (helpInnerList[k].className == newUl.childNodes[i].childNodes[1].childNodes[j].childNodes[0].data.replace(/\s/g,"")) {
						newUl.childNodes[i].childNodes[1].childNodes[j].childNodes[1].appendChild(helpInnerList[k]);
					}

				}
			}

		}
	}

	htmlContainer.replaceChild(newUl, ul);

}

createTree(content, data);

sortTree(content, document.querySelector('.item-list'));