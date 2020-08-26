'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    //sorting without case
    function sortArr(array) {
        array.sort(function(a,b) {
            if (a.toLowerCase() > b.toLowerCase()){return 1;}
            if (a.toLowerCase() < b.toLowerCase()){return -1;}
            if (a>b){return 1;}
            if (a<b){return -1;}
            return 0;
        });
    }

    //movieDB object
    const movieDB = {
        movies: [
            "Joker",
            "Batman",
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против всех"
        ],
    
        //Reloading database
        reloadDB: function() {
            sortArr(movieDB.movies);
            
            promoList.innerHTML ='';
            
            movieDB.movies.forEach((item, index) => { 
                promoList.innerHTML +=
                    `<li class=promo__interactive-item style="text-transform: none;">
                        ${index + 1}. ${item}
                        <div class="delete"></div>
                    </li>`;
            });
            //assigning events to trashcans
            trashCans = document.querySelectorAll('.delete');
            trashCans.forEach((item, index) => {
                item.addEventListener('click', (event) => {
                    movieDB.movies.splice(index, 1);
                    item.parentElement.remove();

                    movieDB.reloadDB();
                });
            });        
        }
    };
    
    //Adding new movie to list function
    const confirmAdding = function(event) {
        event.preventDefault();
    
        newFilm = addInput.value;
    
        if (newFilm) {
            //formating data
            if (newFilm.length > 21){newFilm = `${newFilm.slice(0,21)}...`;}
            
            if (addCheck.checked){alert('Adding your favourite movie');}
    
            movieDB.movies.push(newFilm);
            movieDB.reloadDB();
            
            event.target.reset();
            addInput.placeholder = 'Что уже посмотрено...?';
        } else {
            addInput.value = '';
            addInput.placeholder = 'Введите название фильма...';
            addInput.style.backgroundColor = 'LightCoral';
            setTimeout(() => {addInput.style.cssText = 'background: rgba(196, 196, 196, 0.29)';}, 500);
        }
    };
    
    //Variables declaration
    const advs = document.querySelectorAll('.promo__adv img'),
          genre = document.querySelector('.promo__genre'),
          promoBG = document.querySelector('.promo__bg'),
          promoList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          addCheck = addForm.querySelector('[type="checkbox"]');
    
    let newFilm,
        trashCans = document.querySelectorAll('.delete');
    
    //Initialization of input data    
    movieDB.movies.forEach((item, index) => {
        if (item.length > 21){item = `${item.slice(0,21)}...`;}
        movieDB.movies[index] = item;
    });
    movieDB.reloadDB();
    
    //Removing advertisement
    advs.forEach((item) => item.remove());
    
    //Changing genre to drama
    genre.textContent = 'драма';
    
    //Changing background image
    promoBG.style.backgroundImage = 'url("img/bg.jpg")';
    
    //Adding confirm event to form
    addForm.addEventListener('submit', confirmAdding);

});
