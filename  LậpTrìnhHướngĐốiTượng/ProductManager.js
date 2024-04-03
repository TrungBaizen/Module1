class ProductManager {
    constructor(list, nameStore) {
        this.list = list
        this.nameStore = nameStore;
    }

    add(newProduct) {
        (this.list).push(newProduct)
    }

    findAll() {
        return this.list
    }

    editProduct(id, newProduct) {

    }

    removeProduct(id) {
    }
}

let store = new ProductManager([], "Vinmart");

function add() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let image = document.getElementById("image").value;
    let newProduct = new Product(id, name, price, image)
    store.add(newProduct)
    displayAll()
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
}

function displayAll() {
    let s = "";
    s += `<tr>`
    s += `<td> <h4>Id</h4></td>`
    s += `<td> <h4>Name Product</h4></td>`
    s += `<td> <h4>Price</h4></td>`
    s += `<td> <h4>Image</h4></td>`
    s += `<td colspan="2"></td>`
    s += `</tr>`
    for (let i = 0; i < store.list.length; i++) {
        s += `<tr class="product" style="font-size: 15px ; background: lightgrey" >`
        s += `<td>${store.list[i].id} </td> `
        s += `<td>${store.list[i].name} </td> `
        s += `<td>${store.list[i].price} </td> `
        s += `<td><img src="${store.list[i].img}" width="200" height="200" alt="Hiện chưa có ảnh sản phẩm"> </td> `
        s += `<td><input type="button" value="EDIT" onclick="editProduct(${i})" style="background: limegreen " > </td> `
        s += `<td><input type="button" value="DELETE" onclick="removeProduct(${i})" style="background: limegreen" > </td> `
        s += `</tr>`
        console.log(store.list.length)
    }
    console.log(s)
    document.getElementById("display").innerHTML = s;
}

function editProduct(index) {
    store.list[index].id = prompt("Nhập id cần sửa:  ");
    store.list[index].name = prompt("Nhập tên cần sửa:  ");
    store.list[index].price = prompt("Nhập giá cần sửa:  ");
    store.list[index].image = prompt("Nhập ảnh cần sửa:  ");
    displayAll();
}

function removeProduct(index) {
    store.list.splice(index,1)
    displayAll();
}
