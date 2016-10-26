
var dom1 = [0,0,25], dom2 = [0,1,1], dom3 = [0,2,2], dom4 = [0,3,3], dom5 = [0,4,4], dom6 = [0,5,5], 
dom7 = [0,6,6], dom8 = [1,1,20], dom9 = [1,2,3], dom10 = [1,3,4], dom11 = [1,4,5], dom12 = [1,5,6], 
dom13 = [1,6,7], dom14 = [2,2,21], dom15 = [2,3,5], dom16 = [2,4,6], dom17 = [2,5,7], dom18 = [2,6,8],
 dom19 = [3,3,22], dom20 = [3,4,7], dom21 = [3,5,8], dom22 = [3,6,9], dom23 = [4,4,23], dom24 = [4,5,9],
  dom25 = [4,6,10], dom26 = [5,5,24], dom27 = [5,6,11], dom28 = [6,6,38];

var forTest = [];

//Сценарий работы_______________________
var game = new Game();
var pause = true;

function getRandomArbitary(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function User(name,age,sdano,nextMe,sumId,foto){
	this.name = name;
	this.age = age;
	this.sdano = sdano;
	this.firstTurn = false;
	this.totalSum = 0;
	this.next = nextMe; 
	this.beforeMe = null;
	this.place = 1; // по-умолчанию слева
	this.classOfelem = "Konfishka"; //Если перевернуть то поменять на KonfishkaTurn
	this.idOfGamer = sumId;
	this.DivMini = "mini_" + sumId;
	this.foto = foto;

this.oneone = function()  {
			for(var i=0; i < 7; i++){
				if (dom8.toString() == this.sdano[i].toString()){
				this.firstTurn = true;
				this.userXod(i);
				return true;
				}
			}
			
	}
	
this.ITurn = function(left,right){
		var myDes = this.bestMyDecision(); //вернёт индекс камня для хода или нул
			 if(myDes !== null) { 
			 game.propuskXoda = 0; 
			 
			 
//______________30 сентября_________________________________________________
			this.bestXod(myDes);
			this.userXod(myDes);// отдаём индекс на выброс в игру
			
			 } else	{//иначе пропускаем ход
				 
				 systemMessage(this.name + ": Пропускаю ход. Нет-" + game.left + "-"+game.right);
				 //console.log(this.name + " Пропускает ход. На руках -" + this.sdano);
				 game.propuskXoda ++;
				 if(game.propuskXoda == 4 ) {
					 					
					 systemMessage(this.name + ": Рыба!");
					 ryba();
					 showA();
					 endOfKon(true);
				 }
			 }
		}
	

	//____14 октября_____Улучшаем интеллект виртуальных игроков_________

this.bestMyDecision = function(){
	var forXod = null;
	var i;
		for (i = 0; i < this.sdano.length; i++){
			var left = this.sdano[i][0]; // левое поле фишки
			var right = this.sdano[i][1]; // правое поле фишки
			var ves = this.sdano[i][2]; //приоритет выброса
//если подходит к выбросу
if(left == game.left || left == game.right || right == game.left || right == game.right){
	//и если приоритет больше выбраного ранее
	if(forXod == null || this.sdano[forXod][2] < ves){
	forXod = i;
	//console.log(this.name + " на выброс-"+ this.sdano[forXod]);	
		}	

			 } //else {
			//  	console.log(i + " раза"+ this.name + " не нашёл " + game.left + "ни " + game.right);
			// }

		}
//console.log("Лучший выбор для " + this.name + " камень "+ this.sdano[forXod]);
return forXod;
}

	//______конец функции улучшенного интеллекта________________

//теперь сделать правильный стиль камню и выбросит в кон
this.bestXod = function(forXod){

	var left = this.sdano[forXod][0]; // левое поле фишки
	var right = this.sdano[forXod][1]; // правое поле фишки


if(left == game.left || right == game.left){
				if (left == game.left){
					//левое поле фишки равно левому концу кона - перевернуть картинку
					this.classOfelem = "KonfishkaTurn";
					game.left = right;
					} else	{
					//правое поле фишки равно левому концу кона - оставить как есть
					this.classOfelem = "Konfishka";
					game.left = left;
					}		
				//find = true;
				//messSimply("<br/><h3>"+ this.name +" Решил поставить слева - "+ this.sdano[i] +" стиль фишки - " + this.classOfelem + "</h3>");
				this.place = 1; //слева
				//return i;
				//break;
			} else {
					if (left == game.right || right == game.right){
						if (left == game.right){
							this.classOfelem = "Konfishka";
							game.right = right;
							} else	{
								this.classOfelem = "KonfishkaTurn";
								game.right = left;
								}
				//find = true;
				//messSimply("<br/><h3>"+ this.name +" Решил поставить справа - "+ this.sdano[i] +" стиль фишки - " + this.classOfelem + "</h3>");
				this.place = 2; //справа
				//return i;


} //Закрывается BestXod
}
}

//Новая функция только для хода
this.userXod = function(ind) {
		//Подключаем добавление картинок фишек в кон
		var left = this.sdano[ind][0];
		var right = this.sdano[ind][1];
		var side = this.place;
		this.addFishToKon(left, right, side);
		systemMessage(this.name + " сходил - " + left + " " + right);
		this.dellMiniFish(1, this.DivMini); //удаляем минифишку 
		//_____________26 сентября 2016 года____________________
		
		if (this.place == 1){
		game.situation.unshift(this.sdano[ind]);
		} else game.situation.push(this.sdano[ind]);
		
		this.sdano.splice(ind,1);
		if (this.sdano.length == 0){
		
		systemMessage("Выиграл - " + this.name);
		winner(this.name, this.idOfGamer);
		showA();
		endOfKon(false);
		}
	}
	
	
this.schet = function(){
		var sumThisKon = 0; 
		for (var i = 0; i < this.sdano.length; i++){
			
			sumThisKon = sumThisKon + this.sdano[i][0] + this.sdano[i][1];
			} 
		//штрафные санкции за дубль ноль или шесть 
	if(this.sdano.length == 1){
			if(this.sdano[0][2] ==25 || this.sdano[0][2] ==38)	{
			sumThisKon = sumThisKon+ this.sdano[0][2];
			systemMessage(this.name + ' оштрафован на ' + sumThisKon);
		}
	}
//_____20 октября 2016г ______записывать в счёт только больше 12
	
		// if (sumThisKon > 12 || this.totalSum > 12){
		// 	this.totalSum = this.totalSum + sumThisKon;
		// 	systemMessage(this.name + ' в гору плюс ' + sumThisKon);
		// } else systemMessage(this.name + ' очков меньше 13 ' + sumThisKon);
		

	// var elem = document.getElementById(this.idOfGamer);
	// elem.innerHTML = this.totalSum;
	
	return sumThisKon;
	
	}
	

	this.addFishToKon  = function(left,right,side){

	//получаем доступ к блоку фишек кона
	var div = document.getElementById("fish"); 
	var elem = document.createElement('img'); 
	var nameOfFile = 'img/fishki/'+ left + '' + right + '.png'; 
	
	//проверка на дубль
	if (right == left) {
	this.classOfelem = "KonfishkaDubl";
	}

	elem.className = this.classOfelem;
	elem.src = nameOfFile;
	elem.id = "Fishka "+left+"-"+right;
	//проверка куда ставить слева-справа
	if(side !== 1){
	div.appendChild(elem);
	} else
	div.insertBefore(elem, div.children[0]);
    
	} // конец addFishToKon()


this.addMiniFish = function(qnty,div){
		var div = document.getElementById(div); 
		while(qnty != 0){
		var elem = document.createElement('img');
		elem.src = "img/back_fish.png";
		elem.id = "back_fish";
		div.appendChild(elem);	
		qnty --;
		}
	}

this.dellMiniFish = function(qnty, div){

var div = document.getElementById(div); 
var childNodes = div.childNodes;
		while(qnty != 0){
		div.removeChild(childNodes[0]);
		qnty --;
		}
}





} //Закончился конструктор юзеров

//Начался конструктор живого игрока

function LiveUser(name,age,sdano,nextMe,sumId,foto) {

this.name = name;
this.age = age;
this.sdano = sdano;
this.firstTurn = false;
this.totalSum = 0;
this.next = nextMe; 
this.place = 1; // по-умолчанию слева
this.inHand = 7;
this.foto = foto;
this.idOfGamer = sumId;
this.useDragDrop = false;
this.classOfelem = "KonfishkaTurn";
	
this.oneone = function()  {
			for(var i=0; i < 7; i++){
				if (dom8.toString() == this.sdano[i].toString()){
				this.firstTurn = true;
				this.userXod("myFishka0"+i);
				return true;
				}
			}
		}
	
// this.myCart = function()  {
// 		messSimply("</br> <h3> myCart: Я -" + this.name + " мои фишки </h3>" + this.sdano);
// 	}
	
// this.messBank = function(){
// 	var div = document.createElement('div'); //создаём его (div - это тип тэга)
// 	div.innerHTML = "</br> <h4>" + game.left + "  " + game.right + "</h4> "; //создаём содержимое
// 	kon.appendChild(div); //включаем в состав какого-то блока	
		
// 	}


this.schet = function(){
		//this.inHand = 7;
		var sumThisKon = 0;
		var inHand = 0;
		var indexInHand;
		for (var i = 0; i < this.sdano.length; i++){
			if(this.sdano[i]){
			sumThisKon = sumThisKon + this.sdano[i][0] + this.sdano[i][1];
			inHand++;
			indexInHand = i;
			} 
		}


	if(inHand == 1){ 
			//console.log(this.name + " одна фишка-" + this.sdano[indexInHand]);
		if(this.sdano[indexInHand][2] ==25 || this.sdano[indexInHand][2] ==38)	{
			sumThisKon = sumThisKon + this.sdano[indexInHand][2];
			systemMessage(this.name + ' оштрафован на ' + sumThisKon);
		}
	}	

// if (sumThisKon > 12 || this.totalSum > 12){
// 			this.totalSum = this.totalSum + sumThisKon;
// 			systemMessage(this.name + ' в гору плюс ' + sumThisKon);
// 		} else systemMessage(this.name + ' очков меньше 13 ' + sumThisKon);
		

	// var elem = document.getElementById(this.idOfGamer);
	// elem.innerHTML = "<h3>" + this.totalSum + "</h3>";
	return sumThisKon;
	}

this.userXod = function(ind){
	if(game.endOfKon){
		//console.log("Игра окончена, ходить нельзя");
		return false;
	}
	var myFish = document.getElementById("myFish"); 
	var fishToDelete = document.getElementById(ind);
	var childNodes = myFish.childNodes;
	var indOfSdano = fishToDelete.indOfSdano;
	var classOfelem = "KonfishkaTurn";
	//проверка на правильность хода
	var myFishPoint = this.sdano[indOfSdano];
	var left = myFishPoint[0];
	var right = myFishPoint[1];	
	if (left !== game.left && left !== game.right && right !== game.left && right !== game.right)
	{
	return false;
	} else {
		if((left == game.left && right ==game.right)|| (left == game.right && right ==game.left)){
			//console.log("Куда ходить ?");
		}

		//если выбор сделан драг-дропом то перескочить
		if(!this.useDragDrop){this.myDecision(ind)};
		this.useDragDrop = false;
		dropInMeHide();
		
		
	//__________________________________
	myFish.removeChild(fishToDelete); //удалить картинку фишки
	this.addFishToKon(left,right);
	//messSimply("</br> <h3> Я -" + this.name + " хожу  " + this.sdano[indOfSdano]+ "</h3>");
	systemMessage(this.name + " сходил - " + left + " " + right);
	if (this.place !== 1){
	game.situation.unshift(this.sdano[indOfSdano]); //если слева вставить в начало кона
	} else game.situation.push(this.sdano[indOfSdano]); //если справа в конец кона
		
	this.sdano[indOfSdano] = null; //Удалять нельзя, сбивается индексация
	//this.inHand = this.inHand - 1;
	this.inHand = howMuchIsTheFish("myFish");
	//console.log(this.inHand);
	game.propuskXoda = 0;
	if (this.inHand == 0){
	window.clearInterval(game.migInterval);
	systemMessage(this.name + " Выиграл.");
	endOfKon(false);
		}
	  } return true;

	}

this.myDecision = function (ind) {

	var myFish = document.getElementById("myFish"); 
	var fishToDelete = document.getElementById(ind);
	var childNodes = myFish.childNodes;
	var indOfSdano = fishToDelete.indOfSdano;
	var classOfelem = "KonfishkaTurn";
	var myFishPoint = this.sdano[indOfSdano];
	var left = myFishPoint[0];
	var right = myFishPoint[1];	

		if (left == game.left) {
			this.classOfelem = "KonfishkaTurn";
			game.left = right;
			this.place = 1;
		} else
		if (right == game.left) {
			this.classOfelem = "Konfishka";
			game.left = left;
			this.place = 1;
		} else		
		if (left == game.right) {
			this.classOfelem = "Konfishka";
			game.right = right;
			this.place = 0;
		} else
		if (right == game.right) {
			this.classOfelem = "KonfishkaTurn";
			game.right= left;
			this.place = 0;
		}

		//проверка на дубль
		if (right == left) {
			this.classOfelem = "KonfishkaDubl";
		}


}

this.addFishToKon  = function(left,right){
	
	//получаем доступ к блоку фишек кона
	var div = document.getElementById("fish"); 
	var elem = document.createElement('img'); 
	var nameOfFile = 'img/fishki/'+ left + '' + right + '.png'; 
	elem.className = this.classOfelem;
	elem.src = nameOfFile;
	elem.id = "Fishka "+left+"-"+right;
	//проверка куда ставить слева-справа
	if(this.place !== 1){
	div.appendChild(elem);
	} else
	div.insertBefore(elem, div.children[0]);
    
	} // конец addFishToKon()

} //Закончился конструктор живых юзеров



/* Конструктор игры */

function Game()
{
	
	
	this.bank = [];
	var gaymers = [];
	this.situation = [];
	var nextTurn;
	var endOfKon = false;
	this.firstKon = true;
	var that = this; 
	this.propuskXoda = 0;
	this.left = 1;
	this.right = 1;
	
	//Функция начала кона
	this.beginKon = function(){
		 
		this.bank = [dom1,dom2,dom3,dom4,dom5,dom6,dom7,dom8,dom9,dom10,dom11,dom12,dom13,dom14,dom15,dom16,dom17,dom18,dom19,dom20,dom21,dom22,dom23,dom24,dom25,dom26,dom27,dom28];
		this.left = 1;
		this.right = 1;
	    var mixedBank = [];
		this.situation = [];
		this.endOfKon = false;
			
		for (var i = 0; i < 28; i++){
	var len = this.bank.length;
    var ran = getRandomArbitary(0, --len);
	mixedBank[i] = this.bank[ran];
	this.bank.splice(ran,1);
	
	}

	var player1 = [];
	var player2 = [];
	var player3 = [];
	var player4 = [];


	for (var i = 0; i < 7; i++){
	player1.push(mixedBank.pop());
	player2.push(mixedBank.pop());
	player3.push(mixedBank.pop());
	player4.push(mixedBank.pop());

	}
		
		
		if(this.firstKon){
		this.firstKon = false;
		//console.log("попал в бегине в создание юзеров");
		var testUser = new LiveUser("Андрей", 50, player1, testUser2,"point1","monk");
		
		var testUser4 = new User("Тайсон", 48, player4,testUser,"point4","tyson");
		var testUser3 = new User("Барат", 24, player3, testUser4, "point3","barat");
		var testUser2 = new User("Хайзенберг", 52, player2, testUser3, "point2","haizen");
		testUser.next = testUser2;
		testUser.beforeMe = testUser4;
		testUser4.beforeMe = testUser3;
		testUser3.beforeMe = testUser2;
		testUser2.beforeMe = testUser;

		this.gaymers = [testUser, testUser2, testUser3, testUser4];
		
		} 
			
	forTest = player1;	
	this.gaymers[0].sdano = player1;
	UncolorFace(this.gaymers[0].foto);
	this.gaymers[1].sdano = player2;
	this.gaymers[1].addMiniFish(7,"mini_point2");
	UncolorFace(this.gaymers[1].foto);
	this.gaymers[2].sdano = player3;
	this.gaymers[2].addMiniFish(7,"mini_point3");
	UncolorFace(this.gaymers[2].foto);
	this.gaymers[3].sdano = player4;
	this.gaymers[3].addMiniFish(7,"mini_point4");
	UncolorFace(this.gaymers[3].foto);

	//___работа с графикой__________________________________
	clearFish("myFish");
	clearFish("fish");
	addFish();
	//______________________________________________________

	 this.whoFirst();
	 this.circleOfLife();	
	
} //конец функции начала кона
	
	this.migInterval;
	this.circleOfLife = function(){
		

		while(!this.endOfKon){
	 	if(this.nextTurn instanceof User)
		 {
			var PassButton = document.getElementById("PassButton");
			PassButton.disabled="disabled";
			window.clearInterval(this.migInterval); //Убрать мигание 
			dropInMeHide();							//Убрать площадки
			colorFace(this.nextTurn.foto);
			UncolorFace(this.nextTurn.beforeMe.foto);
			setTimeout("game.circleOfLife()",1000);
			this.whoNext();
			break;
			
		} else 
			this.migInterval = window.setInterval(Mig_label, 500);
			colorFace(this.nextTurn.foto);
			dropInMe(); //Вставить площадки выбора
			UncolorFace(this.nextTurn.beforeMe.foto);
			var PassButton = document.getElementById("PassButton");
			PassButton.disabled=null;
		break;
		}//конеца цикла вайла
		
	} //конец функции цикла жизни

	this.whoFirst = function(){
		
		for (var i = 0; i < 4; i++){
			if ( this.gaymers[i].oneone()){
				this.gaymers[i].firstTurn = false;
				this.nextTurn = this.gaymers[i].next;
				return true;
			} else ;
		}
		
	}
	
	//Поочередный опрос игроков
	this.whoNext = function() {
		this.nextTurn.ITurn(this.left,this.right);
		this.nextTurn = this.nextTurn.next;
	}


} //Конец конструтора Game()

//Функция конца кона

function endOfKon(fish)
{	
	var i;
	var looser = null; //худший игрок кона
	var hiestSum = 0; //Худший результат кона 
	var konSum = 0;
	var TotSum = 0; //Накопитель очков за кон
	var goButton = document.getElementById("goButton");
	goButton.disabled=null;

	game.endOfKon = true;
	
	//проверка на рыбу
	if(fish) {
		
	//перебрать игроков найти лузера
	for( i=0; i < game.gaymers.length; i++){

		//___21.10.2016___добавить обработку рыбы, очки только худшему
		konSum = game.gaymers[i].schet();
		TotSum = TotSum + konSum;
		// проверка на худшего
		if(konSum > hiestSum ){
		hiestSum = konSum ;
		looser = game.gaymers[i];
			}

		}

	//console.log(looser.name + " набрал больше всех, в гору  " + TotSum);
	systemMessage(looser.name + ' набрал больше всех, в гору ' + TotSum);
	looser.totalSum = looser.totalSum + TotSum;

	} else { //если не рыба

	for( i=0; i < game.gaymers.length; i++){
			
//_____20 октября 2016г ______записывать в счёт только больше 12
		konSum = game.gaymers[i].schet();
		if (konSum > 12 || game.gaymers[i].totalSum > 12){
			game.gaymers[i].totalSum = game.gaymers[i].totalSum + konSum;
			systemMessage(game.gaymers[i].name + ' в гору плюс ' + konSum);
		} else systemMessage(game.gaymers[i].name + ' очков меньше 13 ' + konSum + ', не зачисляются');

	   }
	}	

	// вывести текущие показатели в иконках
	for( i=0; i < game.gaymers.length; i++){
	var elem = document.getElementById(game.gaymers[i].idOfGamer);
	elem.innerHTML = game.gaymers[i].totalSum;
	
// проверка на козла
		if (game.gaymers[i].totalSum > 100){
			clearFish("modal");
			goat(game.gaymers[i].name);
			game.firstKon = true;
			showA();

		}

	}

} //конец функции endOfKon


function newGame(){
	clearFish(systemMessage);
	game.beginKon();
}

//Думаю надо убрать в объект LiveUser
function addFish(){

	//получаем доступ к блоку моих фишек
	var div = document.getElementById("myFish"); 
	
	for(var i = 0; i < 7; i++)
	{
	var elem = document.createElement('img'); 
	var nameOfFile = 'img/fishki/'+ forTest[i][0] + '' + forTest[i][1] + '.png'; 
	elem.className = "fishka";
	elem.src = nameOfFile;
	elem.id = "myFishka0" + i;
	elem.indOfSdano = i;

	elem.ondblclick = function() {
		var resultOfXod;
		//если ступил вернёт нул и ничего делать не будем
		resultOfXod = game.nextTurn.userXod(this.id);
		if(resultOfXod){
			game.nextTurn = game.nextTurn.next;
			setTimeout("game.circleOfLife()",1000);
			}
	}
		//вставить функии для драг эн дроп
	elem.ondragstart = function(event) {drag(event);}
		//________5 октября_______________

		div.appendChild(elem);
		
    }
} // конец addFish()

//пропускаю ход
function IamPass(){
	//messSimply("<br> <h3>Я " + game.nextTurn.name + " пропускаю ход </h3>");
	systemMessage(game.nextTurn.name + " пропускаю ход. Нет-" +game.left+"-"+game.right);
	game.nextTurn = game.nextTurn.next;
	game.circleOfLife();
	var PassButton = document.getElementById("PassButton");
	PassButton.disabled="disabled";


}

function clearFish(idParent){

	var div = document.getElementById(idParent);
	var i;
	// теперь к массиву детей
	if(div != null){
	var childNodes = div.childNodes;
	
	var numberChaild = div.children.length;
		for(i=0; i < numberChaild; i++){
		div.removeChild(childNodes[0]);	
	}
	
	}
}


//Не используется пока но рабочая
function waitSeconds(iMilliSeconds){
	
		var counter = 0, start = new Date().getTime(), end = 0;
		while (counter < iMilliSeconds){
			end = new Date().getTime();
			counter = end - start;
		}
	

}

function colorFace(face){
var elem = document.getElementById(face);
elem.className = "faces";
}

function UncolorFace(face){
var elem = document.getElementById(face);
elem.className = "";
}

//для добавления в узлы под drag-drop действия_______________
function drop(ev){
	ev.preventDefault();
	var image = ev.dataTransfer.getData("content");
	// может пригодится, перетаскивает картинку
	//ev.target.appendChild(document.getElementById(image));
	return image;
	}


function drag(ev){
	ev.dataTransfer.setData("content", ev.target.id);
	
}

function allowDrop(ev){
	ev.preventDefault();
	
}
//____________создаёт площадки вставки________________________________
function dropInMe(){

var left_div = document.createElement('div');
var right_div = document.createElement('div');

left_div.className = "dropInMe"; 
right_div.className = "dropInMe"; 

left_div.id = "dropInMeLeft"; 
right_div.id = "dropInMeRight"; 

var fish = document.getElementById("fish"); 

left_div.ondrop = function(event) {
	var idOfChoice = drop(event);
	if(beforeUserXod("left",idOfChoice)){
		if(game.nextTurn.userXod(idOfChoice)){
		game.nextTurn = game.nextTurn.next;
		setTimeout("game.circleOfLife()",1000);
		}
	}
}


left_div.ondragover = function(event) {allowDrop(event);}

right_div.ondrop = function(event) {
	var idOfChoice = drop(event);
	if(beforeUserXod("right",idOfChoice)){
		if(game.nextTurn.userXod(idOfChoice)){
		game.nextTurn = game.nextTurn.next;
		setTimeout("game.circleOfLife()",1000);
		
		}
	}
}

right_div.ondragover = function(event) {allowDrop(event);}

fish.appendChild(right_div);
fish.insertBefore(left_div, fish.children[0]);

}


//________удаляет площадки вставки _______________________
function dropInMeHide(){
var left_div = null;
var right_div = null;
left_div = document.getElementById("dropInMeLeft");
right_div = document.getElementById("dropInMeRight");
	if (left_div){
	left_div.parentNode.removeChild(left_div);
	right_div.parentNode.removeChild(right_div);
	}
}

//____функция для вызова из right_div.ondrop готовит данные для userXod

function beforeUserXod(side,idOfChoice){
	
	var myFish = document.getElementById("myFish"); 
	var fishToDelete = document.getElementById(idOfChoice);
	var childNodes = myFish.childNodes;
	var indOfSdano = fishToDelete.indOfSdano;
	var classOfelem = "KonfishkaTurn";
	var myFishPoint = game.nextTurn.sdano[indOfSdano];
	var leftPoint = myFishPoint[0]; 
	var rightPoint = myFishPoint[1];	
//проверка на правильность хода
// if (leftPoint !== game.left && leftPoint !== game.right && rightPoint !== game.left && rightPoint !== game.right)
// 	{
if(side == "left" && leftPoint != game.left && rightPoint != game.left){	
	//messSimply("</br> <h3> Не правильно ставишь слева </h3>");
	return false;
} else if (side == "right" && leftPoint != game.right && rightPoint != game.right){
	//messSimply("</br> <h3> Не правильно ставишь справа. </h3>");
	return false;
	} else

if (side == "left"){
	game.nextTurn.useDragDrop = true;
	game.nextTurn.place = 1;
	
	if(game.left == leftPoint){
		game.nextTurn.classOfelem = "KonfishkaTurn";
		game.left = rightPoint;
	}	else {
			game.left = leftPoint;
			game.nextTurn.classOfelem = "Konfishka";
		}
} else  if (side == "right"){
	game.nextTurn.useDragDrop = true;
	game.nextTurn.place = 0;
	
	if(game.right == rightPoint){
		game.nextTurn.classOfelem = "KonfishkaTurn";
		game.right = leftPoint;
	} else {	
			game.right = rightPoint;
			game.nextTurn.classOfelem = "Konfishka";
		}
			}	else console.log("Ошибка вызова");


//проверка на дубль
	if (rightPoint == leftPoint) {
	game.nextTurn.classOfelem = "KonfishkaDubl";
	}

game.propuskXoda = 0;
return true;
}


//для вращения картинки______

function imageRotation(){

var angle = 0;
var rotate = setInterval(function(){
	      angle+=3;
	     jQuery("#domino-bank").rotate(angle);
	},60);
return rotate;
}

function rotateBank(){
var goButton = document.getElementById("goButton");
goButton.disabled="disabled";
var fish = document.getElementById("fish");
clearFish("fish");
clearFish("systemMessage");
clearFish("myFish");
clearFish("mini_point4");
clearFish("mini_point3");
clearFish("mini_point2");
clearFish("modal");

var elem = document.createElement('img'); 
	elem.src = 'img/domino-bank.png';
	elem.id = "domino-bank";
	fish.appendChild(elem); 
//systemMessage('Очки: одна 0-0 даёт штраф - 25 очков, 6-6 даёт 50 очков');
systemMessage('Сделать ход - двойное нажатие или перетащить на место вставки.');
systemMessage('Правила: каждый сам за себя. До 101 очка. Одна 0:0 25 очков, 6:6 50 очков');
systemMessage('Новости 24.10.2016: при рыбе очки игроков суммируются в счёт набравшего больше всех');
this.rotate = imageRotation();
setTimeout("clearInterval(rotate)",5000);
setTimeout("newGame()",5000);

}


//Работа с систем текстом
function systemMessage(mess){
var div = document.getElementById("systemMessage"); 
var childNodes = div.childNodes;
var numberChaild = div.children.length;
var elem = document.createElement('div');	
elem.innerHTML = mess;
if(div.childNodes.length > 3) {div.removeChild(childNodes[numberChaild-1]);}
div.insertBefore(elem, div.children[0]); 
}

//Формируем модальное окно, рыба или конец игры

 function ryba(){

var div = document.getElementById("modal"); 
var childNodes = div.childNodes;
var elem = document.createElement('img');	
elem.src = 'img/gazeta2.jpg';
elem.height = 280;

div.appendChild(elem); //включаем в состав какого-то блока	
}

function goat(name){

var div = document.getElementById("modal"); 
var childNodes = div.childNodes;
var elem = document.createElement('img');	
var divName = document.createElement('div');
divName.innerHTML = "<h3>" + name + " проиграл </h3>";
elem.src = 'img/kozel1.jpg';
elem.height = 240;
div.appendChild(elem); //включаем в состав какого-то блока	
div.appendChild(divName);
}

function winner(name,idOfGamer){

var div = document.getElementById("modal"); 
var childNodes = div.childNodes;
var elem = document.createElement('img');	
var divName = document.createElement('div');
divName.innerHTML = "<h3>" + name + " выиграл этот кон </h3>";
elem.src = 'img/' + idOfGamer+".png";
elem.height = 240;
div.appendChild(elem); //включаем в состав какого-то блока	
div.appendChild(divName);

}


//возвращает количество детей любого блока
function howMuchIsTheFish(div){
	var div = document.getElementById(div); 
	var numberChaild = div.children.length;
	return numberChaild;
}