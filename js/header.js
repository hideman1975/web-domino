//функции для мигания текста

function Mig_label()
{
    var label = document.getElementById('mig_label');
    if ( label.style.color == "red" ) {
        label.style.color = "blue";
    } else {
        label.style.color = "red";
    }
}



//Фунции для модального окна
//передача элементов по id "a" и "b"

window.onload = function(){
	a = document.getElementById("a");
	b = document.getElementById("b");
	rotateBank();
	//setInterval(Mig_label, 500); //мигание, выполнять каждые 500 миллесекунд
}

//показываем окно функции "showA"
function showA(){
//Задаем прозрачность и блокируем дисплей
//элемента "b"
	b.style.filter = "alpha(opacity=80)";
	b.style.opacity = 0.8;
	b.style.display = "block";
	// Задаем блокироваку и отступ сверху в 200px
	//элемента "a"
	a.style.display = "block";
	a.style.top = "200px";
}

//Вызываем функцию "hideA", которая будет скрывать
//окно для элементов "a" и "b"
function hideA(){
	b.style.display = "none";
	a.style.display = "none";
}     
