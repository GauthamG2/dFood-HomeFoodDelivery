$(document).ready(function() {});

function goToFood(foodId) {
    console.log(foodId);
    sessionStorage.setItem('foodId', foodId);

    document.location.href = '../html/food-detail.html?foodId=' + foodId;
}