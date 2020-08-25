/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

//movieDB object
const movieDB = {
    movies: [
        "Joker",
        "Batman",
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ],

    //Reloading database
    reloadDB: function() {
        this.movies.sort();
        
        promoList.innerHTML ='';
        
        this.movies.forEach((item, index) => { 
            promoList.innerHTML +=
                `<li class=promo__interactive-item>${index + 1}. ${item}
                    <div class="delete"></div>
                </li>`;
        });
        
        //assigning events to trashcans
        trashCans = document.querySelectorAll('.delete');
        trashCans.forEach((item, index) => {
            item.addEventListener('click', (event) => {
                delete movieDB.movies[index];
                event.srcElement.parentElement.remove();
                movieDB.reloadDB();
            });
        });        
    }
};

//Adding new movie to list function
function confirmAdding(event) {
    event.preventDefault();

    newFilm = inputField.value;

    if (newFilm!='') {
        if (newFilm.length > 21){newFilm = newFilm.slice(0,21) + '...';}
        
        if (checkbox.checked){
            alert('Adding your favourite movie');
            checkbox.checked = false;
        }

        movieDB.movies.push(newFilm);
        movieDB.reloadDB();

        inputField.value = '';
        inputField.placeholder = 'Что уже посмотрено...?';
    } else {
        inputField.value = '';
        inputField.placeholder = 'Введите название фильма...';
        inputField.style.backgroundColor = 'LightCoral';
        setTimeout(() => {inputField.style.cssText = 'background: rgba(196, 196, 196, 0.29)';}, 500);
    }
}

//Variables declaration
const advs = document.querySelectorAll('.promo__adv img'),
      genre = document.querySelector('.promo__genre'),
      promoBG = document.querySelector('.promo__bg'),
      promoListItems = document.querySelectorAll('.promo__interactive-item'),
      promoList = document.querySelector('.promo__interactive-list'),
      inputField = document.querySelector('.adding__input'),
      button = document.getElementsByTagName('button')[0],
      checkbox = inputField.nextElementSibling.nextElementSibling;
      
let newFilm,
    trashCans = document.querySelectorAll('.delete');

//Initialization of input data
movieDB.movies.forEach((item, index, array) => {
    if (item.length > 21){item = item.slice(0,21) + '...';}
});

//Removing advertisement
advs.forEach((item) => item.remove());

//Changing genre to drama
genre.textContent = 'драма';

//Changing background image
promoBG.style.backgroundImage = 'url("img/bg.jpg")';

//Relodaing database
movieDB.reloadDB();

//Adding click event to confirm button
button.addEventListener('click', confirmAdding);