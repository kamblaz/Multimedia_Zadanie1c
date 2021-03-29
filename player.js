(function() {
    const videoPlayer = document.querySelector('video');
    const playlistWrapper = document.querySelector('.movies_wrapper');
    const addMovieButton = document.querySelector('.add_movie_button');
    const newMovieTitle = document.querySelector('#movie_title');
    const newMovieUrl = document.querySelector('#movie_url');


    const createNewMovieElement = () => {
        const movieItem = document.createElement('option');
        movieItem.textContent = newMovieTitle.value;
        var url = newMovieUrl.value;
        url = '\"'.concat(url);
        url = url.concat('\"');
        movieItem.setAttribute('onclick', `runVideo(${url})`);
        //initializeLitenersForMovieItem(movieItem);
        playlistWrapper.appendChild(movieItem);
        newMovieUrl.value = '';
        newMovieTitle.value = '';
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

function getParamNames(func) {
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var result = func.slice(func.indexOf('(') + 1, func.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
}

function removeParentheses(string) {
    var result = string.toString().replaceAll('\"', '');
    return result;
}

current_video_index = 0;
document.getElementById('video').addEventListener('ended', myHandler, false);

function myHandler(e) {
    var e = document.getElementsByTagName("select")[0];
    var lis = document.getElementsByTagName("option");
    for (var i = 0; i < lis.length; ++i) {
        var item = lis[i];
        if (item.value == e.value) {
            current_video_index = i;
        }
    }
    if (current_video_index < lis.length - 1) {
        next_video_link = removeParentheses(getParamNames(lis[current_video_index + 1].getAttribute('onclick')));
        $("#video").attr('src', next_video_link);
        var next_video_title = lis[current_video_index + 1].value;
        $('#select').val(next_video_title);
        current_video_index += 1;
    } else {
        next_video_link = removeParentheses(getParamNames(lis[0].getAttribute('onclick')));
        $("#video").attr('src', next_video_link);
        var next_video_title = lis[0].value;
        $('#select').val(next_video_title);
        current_video_index = 0;
    }
    $("#video")[0].load();
    console.log("Number of videos", lis.length)
    console.log("Current video index", current_video_index)
    console.log("Current video name", e.value)
    console.log("ended");
}

function moveUp() {
    var selected = $("#select").find(":selected");
    var before = selected.prev();
    if (before.length > 0)
        selected.detach().insertBefore(before);
}

function moveDown() {
    var selected = $("#select").find(":selected");
    var next = selected.next();
    if (next.length > 0)
        selected.detach().insertAfter(next);
}

function remove() {
    var selected = $("#select").find(":selected");
    console.log(selected);

}