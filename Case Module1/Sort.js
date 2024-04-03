function sortProductUp( arr) {
    arr.sort(function(a, b) {
        return a.price - b.price;
    });
return arr
}

function sortProductDown( arr) {
    arr.sort(function(a, b) {
        return a.price - b.price;
    }).reverse();
    return arr
}