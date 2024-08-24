// load XML data using AJAX
// Ajax - asynchronous javascript and xml
// it works where nobody has to wait for each other

// 
// It’s a set of web development techniques that allows web applications to send and retrieve data from a server asynchronously (in the background) without interfering with the display and behavior of the existing page
// AJAX operations are asynchronous, meaning they don’t block the execution of other scripts

// get means firing an http request - either get or post - so it requests server(xampp) to fetch xml data

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "mov.xml",
        dataType: "xml",
        // Sends an HTTP GET request to fetch mov.xml and expects an XML response.
        success: function (xml) {
            let mov_arr = [];

            $(xml).find('movie').each(function () {
                // .find() : used to get the descendants of each element in the current set of matched elements,
                // filtered by a selector, jQuery object, or element34.
                // each is a for loop for a each movie tag
                const title = $(this).find('title').text();    // innerText
                const year = $(this).find('year').text();
                const dir = $(this).find('director').text();
                const gen = $(this).find('genre').text();
                const rating = $(this).find('rating').text();
                const img = $(this).find('img').text();

                mov_arr.push({ title, year, dir, gen, rating, img });
                //This line creates an object with properties title, year, dir, gen, rating, and img.
                // The object is then added to the mov_arr array using the push method.

                // so 
                // first array of one particular movie is made in the loop with elements tittle, year, director etc  ---- no no no no
                // first object of one particular movie is made with these elements, object is dictionary in java (look at those curly braces -- python ref )  ------------------------------- important
                //  so the object will have title: IronMan, director: , year:    .. and so on for each movie
                // and that whole array (no i meant object) is then added to the mov_arr using push
            });

            // use this function for displaying all movies either sorted/ non-sorted whatever 
            function dis(mov_arr) {
                mov_arr.forEach(i => {
                    $('#movie_list').append(`
                    <li class="movie-item">
                        <h3 class="title content">${i.title}</h3>
                        <img class="image content" src="${i.img}" alt="${i.title}">
                        <p class="year content">Year: ${i.year}</p>
                        <p class="dir content">Director: ${i.dir}</p>
                        <p class="genre content">Genre: ${i.gen}</p>
                        <p class="mov_rating content">Rating: ${i.rating}</p>
                    </li>
                `);
                }
                );
            }

            dis(mov_arr);           // when page loads , non-ordered movies list

            // code to toggle the sorting based on year of release
            var yflag = 0;
            $('#sort_year').click(function () {
                if (yflag == 0) {
                    // (a, b) => a.year - b.year is a comparator function | compares pair of two objects at a time, after that, compares another pair
                    mov_arr.sort((a, b) => a.year - b.year);  // ascending
                    // If a.year is less than b.year, the function returns a negative value, meaning a comes before b.
                    //  if equal than 0

                    yflag = 1
                }
                else {
                    mov_arr.sort((a, b) => b.year - a.year);  // descending
                    yflag = 0;
                }
                $('#movie_list').empty();  // once you sort them, empty the og array which had non-ordered movies
                dis(mov_arr);
            });


            // code to toggle the sorting based on rating
            var rflag = 0;      // a flag var for rating toggle
            $('#sort_rating').click(function () {
                if (rflag == 0) {
                    mov_arr.sort((a, b) => a.rating - b.rating);   // ascending
                    rflag = 1;
                }
                else {
                    mov_arr.sort((a, b) => b.rating - a.rating);   // descending
                    rflag = 0;
                }
                $('#movie_list').empty();
                dis(mov_arr);
            }); // toggle ends here



            //  copilots code for search bar
            $('#search_box').on('input', function() {
                const input1 = $(this).val().toLowerCase();
                const filteredMovies = mov_arr.filter(i => 
                    i.title.toLowerCase().includes(query) ||
                    i.year.toLowerCase().includes(input1) ||
                    i.dir.toLowerCase().includes(input1) ||
                    i.gen.toLowerCase().includes(input1) ||
                    i.rating.toLowerCase().includes(input1)
                );
                $('#movie_list').empty();
                dis(filteredMovies);
            });

        },  // success code ends here (function ends)

        error: function () {
            $('#movie_list').append('<li> Error Loading List</li>'); //this works as innerHTML+= in JS
        }
    })      // ajax ends    
})  // jquery code ends



// var: Variables declared with var are hoisted to the top of their scope and initialized with undefined.
// let: Variables declared with let are also hoisted but are not initialized. Accessing them before declaration results in a ReferenceError12.
/*
function example() {
    if (true) {
        var x = 5;
        let y = 10;
    }
    console.log(x); // 5
    console.log(y); // ReferenceError: y is not defined
}
     */