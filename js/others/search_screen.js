
$(document).on("pageinit", function () {
    update_list();
});


// $(document).on("pagecontainerload", function () {
//     initPage();
// });





function update_list() {
    populateNews();
    populateCategories();
    $("#nav_bar_search").addClass("ui-btn-active");
}


function populateCategories() {

    var categories = JSON.parse(localStorage.getItem('categories'));

    $.each(categories, function (index, category) {
        $('#news-articles2').append("<a onclick='goToSearch(\"" + category.title + "\")'> <div class='category center-outer-div'\
            style='background:linear-gradient(0deg, rgba(31, 29, 29, 0.7), rgba(31, 29, 29, 0.7)),url(\""+ category.imageUrl + "\");   background-size: 200px 200px;'>\
            <div class='center-inner-div'>\
                <h1 class='heading-four white'>"+ category.title + "</h1>\
            </div>\
        </div > </a>");
    });

}

function goToSearch(title) {
    localStorage.setItem("filterDB", null);
    localStorage.setItem("userSearchValue", JSON.stringify({ "type": "category", "value": title }));
    window.location = "browse_kitchen.php";
}

function populateNews() {
    // clear the existing list
    var articles = JSON.parse(localStorage.getItem('articles'));
    $.each(articles, function (index, article) {
        $("#news-articles").append("<div class='article ui-grid-a'>\
            <div class='center-outer-div ui-block-a' >\
                    <div class='center-inner-div article-inner'>\
                        <h1 class='heading-three article-text teal bold'>"+ article.title + "</h1>\
                        <p class='paragraph article-text grey thin'>"+ article.description + "\
                                    </p>\
                            <h3 class='heading-five article-text teal thin'>Use Code:</h3>\
                            <h2 class='heading-five article-text teal bold'>"+ article.code + "</h2>\
                    </div>\
                </div >\
                <div class='center-outer-div article-inner ui-block-b'>\
                    <div class='center-inner-div article-inner'>\
                        <img class='news-image'\
                        src='"+ article.imageUrl + "'/>\
                    </div>\
                </div>\
            </div > ");

    });
}