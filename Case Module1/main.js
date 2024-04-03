let store = new ProductManager();
let productCart;
// localStorage.setItem("list", JSON.stringify([]));
// localStorage.setItem("token", JSON.stringify([]));
function showAll(list) {
    selectOptionBlock();
    let arr = store.findAll();
    checkHome = list;
    if (list === HOME) {
        listShort = arr;
        document.getElementById("select").value = NULL
    }
    if (list !== undefined && list !== NULL && list !== HOME) {
        arr = list;
    }

    let html =
        `
        <h2>Home</h2>
        <table border="1" style="width: 1300px">
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th colspan="2">Action</th>
        </tr>
        `
    for (let i = 0; i < arr.length; i++) {
        html += `
            <tr>
                <td style="text-align: center">${arr[i].id}</td>
                <td style="text-align: center">${arr[i].name}</td>
                <td style="text-align: center">${arr[i].price}</td>
                <td style="text-align: center">${arr[i].quantity}</td>
                <td style="text-align: center"><img src="${arr[i].image}" alt=""></td>
                <td style="text-align: center">
                <button onclick="handleActionQuantityProduct(${arr[i].id},'+')">+</button>
                <input type="number" id="${arr[i].id}" style="width: 100px">
                <button onclick="handleActionQuantityProduct(${arr[i].id},'-')">-</button>
                </td>
                <td style="text-align: center"><button onclick="handleQuantityProduct(${arr[i].id})">Thêm vào giỏ hàng</button></td>
            </tr>
        `
    }
    html += `</table>`
    document.getElementById("main").innerHTML =html;
    document.getElementById("searchProduct").innerHTML = `   
                <input type="text" id="search" placeholder="Nhập tên muốn tìm">
                <button onclick="search()">Search</button>`
    document.getElementById("home").innerHTML = `    
                <button onclick="showAll(HOME)">Home</button>
`

    //Chưa đăng nhập mới cho hiện
    if (account === NULL) {
        document.getElementById("account").innerHTML = `
               <button onclick="formLogin()">Đăng nhập</button>
               <button onclick="formSignup()">Đăng ký</button>
    `
    }
}
showAll()
function showFormUpdate(id) {
    let oldProduct = store.findProductById(id);
    document.getElementById("main").innerHTML = `
  <h2>Product Update</h2>
<table>
    <tr>
        <td><label>Id:</label></td>
        <td><input type="number" id="id" placeholder="ID" style="width: 1000px" value="${oldProduct.id}" readonly></td>
    </tr>
    <tr>
        <td>
            <label>Name:</label>
        </td>
        <td>
            <input type="text" id="name" placeholder="NAME" style="width: 1000px" value="${oldProduct.name}">
        </td>
    </tr>
    <tr>
        <td>
            <label>Price:</label>
        </td>
        <td>
            <input type="number" id="price" placeholder="PRICE" style="width: 1000px" value="${oldProduct.price}">
        </td>
    </tr>
    <tr>
        <td>
            <label>Quantity:</label>
        </td>
        <td>
            <input type="number" id="quantity" placeholder="QUANTITY" style="width: 1000px" value="${oldProduct.quantity}">
        </td>
    </tr>
    <tr>
        <td>
            <label>Image:</label>
        </td>
        <td>
            <input type="text" id="image" placeholder="IMAGE" style="width: 1000px" value="${oldProduct.image}">
        </td>
    </tr>
</table>
<br>
<button onclick="update()">Update</button>
    `
}

function update() {
    let id = +document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    let image = document.getElementById("image").value;
    let newProduct = new Product(id, name, price, quantity, image);
    store.update(id, newProduct);
    alert("Sửa thành công");
    showAllAdmin();
}

function remove(id) {
    let isConfirm = confirm("Are you sure?")
    if (isConfirm) {
        store.remove(id);
        alert("Xóa thành công");
        showAllAdmin();
    }
}

function showFormAdd() {
    document.getElementById("main").innerHTML = `
<h2>Add Product</h2>
<table>
    <tr>
        <td><label>Id:</label></td>
        <td><input type="number" id="id" placeholder="ID" style="width: 1000px"></td>
    </tr>
    <tr>
        <td>
            <label>Name:</label>
        </td>
        <td>
            <input type="text" id="name" placeholder="NAME" style="width: 1000px">
        </td>
    </tr>
    <tr>
        <td>
            <label>Price:</label>
        </td>
        <td>
            <input type="number" id="price" placeholder="PRICE" style="width: 1000px">
        </td>
    </tr>
    <tr>
        <td>
            <label>Quantity:</label>
        </td>
        <td>
            <input type="number" id="quantity" placeholder="QUANTITY" style="width: 1000px">
        </td>
    </tr>
    <tr>
        <td>
            <label>Image:</label>
        </td>
        <td>
            <input type="text" id="image" placeholder="IMAGE" style="width: 1000px">
        </td>
    </tr>
</table>
<br>
<button onclick="add()">Add</button>
    `
}

function add() {
    let id = +document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    let image = document.getElementById("image").value;
    let newProduct = new Product(id, name, price, quantity, image);
    store.add(newProduct);
    alert("Thêm thành công");
    showAllAdmin();
}

function search() {
    let name = document.getElementById("search").value;
    listShort = store.findProductByName(name);
    showAll(listShort)
}

function searchAdmin() {
    let name = document.getElementById("search").value;
    let productS = store.findProductByName(name);
    let s =
        `
        <h2>Search Results</h2>
        <table border="1" style="width: 1000px">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
            <th colspan="2">Action</th>
           </tr>`
    for (let i = 0; i < productS.length; i++) {
        s += `
           <tr>
                <td style="text-align: center">${productS[i].id}</td>
                <td style="text-align: center">${productS[i].name}</td>
                <td style="text-align: center">${productS[i].price}</td>
                <td style="text-align: center">${productS[i].quantity}</td>
                <td style="text-align: center"><img src="${productS[i].image}" alt=""></td>
                <td style="text-align: center"><button onclick="showFormUpdate(${productS[i].id})">Sửa</button></td>
                <td style="text-align: center"><button onclick="remove(${productS[i].id})">Xóa</button></td>
           </tr>
        
    `
    }


    s += `</table>`
    document.getElementById("main").innerHTML = s;
}

function showAllAdmin() {
    selectOptionNone();
    let arr = store.findAll();
    let html =
        `
        <h2>Home</h2>
        <table border="1" style="width: 1300px">
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th colspan="2">Action</th>
        </tr>
        `
    for (let i = 0; i < arr.length; i++) {
        html += `
            <tr>
                <td style="text-align: center">${arr[i].id}</td>
                <td style="text-align: center">${arr[i].name}</td>
                <td style="text-align: center">${arr[i].price}</td>
                <td style="text-align: center">${arr[i].quantity}</td>
                <td style="text-align: center"><img src="${arr[i].image}" alt=""></td>
                <td style="text-align: center"><button onclick="showFormUpdate(${arr[i].id})">Sửa</button></td>
                <td style="text-align: center"><button onclick="remove(${arr[i].id})">Xóa</button></td>
            </tr>
        `
    }
    html += `</table>`
    document.getElementById("main").innerHTML = html;
    document.getElementById("main2").innerHTML = `<button onclick="showAllHistory()">Lịch sử giao dịch khách hàng</button>`

    document.getElementById("main3").innerHTML = `<button onclick="showFormAdd()">Thêm sản phẩm</button>`
    document.getElementById("home").innerHTML = `<button onclick="showAllAdmin()">Trang chủ</button>`
    document.getElementById("searchProduct").innerHTML = `    
                <input type="text" id="search" placeholder="Nhập tên muốn tìm">
                <button onclick="searchAdmin()">Search</button>`
}

// Lưu trữ dữ liệu bằng local storage
// localStorage.setItem("name", "Hello C02");
// let name = localStorage.getItem("name");
// alert(name)

// localStorage.setItem("list", JSON.stringify([]));
// Json.stringify giúp tạo 1 chuỗi "[]"