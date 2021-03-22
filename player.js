(function() {
    const videoPlayer = document.querySelector('video');
    const playlistWrapper = document.querySelector('.movies_wrapper');
    const addMovieButton = document.querySelector('.add_movie_button');
    const newMovieTitle = document.querySelector('#movie_title');
    const newMovieUrl = document.querySelector('#movie_url');
    let movies = Array.from(document.querySelectorAll('.movie'));


    const createNewMovieElement = () => {
        const movieItem = document.createElement('option');
        movieItem.className = 'movie';
        console.log(movieItem.className);
        //movieItem.setAttribute('value', );
        movieItem.textContent = newMovieTitle.value;
        //movieItem.onclick = function() { document.getElementById('video').setAttribute('src', newMovieUrl.value); };
        console.log(newMovieUrl.value);
        movieItem.onclick = function() { document.getElementById('video').setAttribute('src', newMovieUrl.value); };
        // const title = document.createElement('span');
        // title.setAttribute('data-video', newMovieUrl.value);
        // title.textContent = newMovieTitle.value;
        // title.className = 'movie_link';
        // console.log(title.className);
        // movieItem.appendChild(title);
        movies.push(movieItem);
        //initializeLitenersForMovieItem(movieItem);
        movieItem.setAttribute('data-index', (movies.length - 1).toString());
        playlistWrapper.appendChild(movieItem);
        newMovieUrl.value = '';
        newMovieTitle.value = '';
        //aaa
    }

    addMovieButton.addEventListener('click', (e) => {
        e.preventDefault();
        createNewMovieElement();
    })

    const swapArrayElements = (arr, indexA, indexB) => [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];

    const moveUp = (movie) => {
        let oldIndex = Number(movie.getAttribute('data-index'));
        if (oldIndex === 0) {
            return void 0;
        }
        let newIndex = oldIndex - 1;
        swapArrayElements(movies, oldIndex, newIndex);
    }

    const moveDown = (movie) => {
        let oldIndex = Number(movie.getAttribute('data-index'));
        if (oldIndex === movies.length - 1) {
            return void 0;
        }
        let newIndex = oldIndex + 1;
        swapArrayElements(movies, oldIndex, newIndex);
    }

    const remove = (movie) => {
        const index = movie.getAttribute('data-index');
        movies.splice(index, 1);
        for (let i = index; i < movies.length; i++) {
            movies[i].setAttribute('data-index', i.toString());
        }
    }

    const setPlayVideoListener = (movie) => {
        const movieLink = movie.querySelector('.movie_link');
        movieLink.addEventListener('click', () => {
            videoPlayer.src = movieLink.getAttribute('data-video');
        });
    }
    const setMoveUpListener = (movie) => movie.querySelector('.move_up_button').addEventListener('click', () => {
        moveUp(movie);
        reloadList()
    });
    const setMoveDownListener = (movie) => movie.querySelector('.move_down_button').addEventListener('click', () => {
        moveDown(movie);
        reloadList();
    });
    const setRemoveListener = (movie) => movie.querySelector('.remove_button').addEventListener('click', () => {
        remove(movie);
        reloadList();
    });

    const initializeLitenersForMovieItem = (movieItem) => {
        setPlayVideoListener(movieItem);
        //setMoveUpListener(movieItem);
        //setMoveDownListener(movieItem);
        //setRemoveListener(movieItem);
    }

    const reloadList = () => {
        playlistWrapper.innerHTML = '';
        movies.forEach((movieItem, idx) => {
            movieItem.setAttribute('data-index', idx.toString());
            playlistWrapper.appendChild(movieItem);
        });
    }

    //movies.forEach(movie => initializeLitenersForMovieItem(movie));

    //reloadList();
})();

function runVideo(link) {
    document.getElementById('video').setAttribute('src', link)
}