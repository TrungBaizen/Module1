function showAllHistory() {
    let listUser =  JSON.parse(localStorage.getItem("token"))
    let listUserName = [];
    for (let i = 0; i <listUser.length; i++) {
        if (listUser[i].role === "User")
        listUserName.push(listUser[i].username);
    }
    let key = []
    for (let i = 0; i <listUserName.length ; i++) {
        key.push(keyPurchased+listUserName[i]);
    }
    let html =
        `
        <h2>History</h2>
        <table border="1" style="width: 1300px">
        <tr>
            <th>Username</th>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Total price</th>
        </tr>
        `
    for (let i = 0; i <key.length ; i++) {
         let arr = JSON.parse(localStorage.getItem(key[i]))
        for (let j = 0; j < arr.length; j++) {
            html += `
            <tr>
                <td style="text-align: center">${listUserName[i]}</td>
                <td style="text-align: center">${arr[j].id}</td>
                <td style="text-align: center">${arr[j].name}</td>
                <td style="text-align: center">${arr[j].price}</td>
                <td style="text-align: center">${arr[j].quantity}</td>
                <td style="text-align: center"><img src="${arr[j].image}" alt=""></td>
                <td style="text-align: center">${arr[j].price*arr[j].quantity}</td>
            </tr>
        `
        }
    }
    html += `</table>`
    document.getElementById("main").innerHTML = html;
}