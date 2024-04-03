class qlsp {
    constructor(name, img, price, company) {
        this.name = name;
        this.img = img;
        this.price = price;
        this.company = company;
    }
}

let products = [new qlsp("ipx", "ipx.jpg", 20000)];
show();

function add() {
    let name = document.getElementById("namesp").value;
    let img = document.getElementById("linkanh").value;
    let price = document.getElementById("ng").value;
    let company = document.getElementById("lt").value;
    products.push(new qlsp(name, img, price, company));
    show();
    document.getElementById("namesp").value = "";
    document.getElementById("linkanh").value = "";
    document.getElementById("ng").value = "";
    document.getElementById("lt").value = "";
}


function show() {
    console.log(products)
    let s = ""
    s += `<tr>`
    s += ` <td> <h2>Anh san pham</h2></td>`
    s += `<td> <h2>Ten san pham</h2></td>`
    s += `<td> <h2>Gia san pham</h2></td>`
    s += `</tr>`
    for (let i = 0; i < products.length; i++) {
        s += `<tr class="hang" style="font-size: 30px">`
        s += `<td><img src="${products[i].img} " width="200" height="200"></td> `
        s += `<td>${products[i].name} </td> `
        s += `<td>${products[i].price}</td>  `
        s += `<td><input type="button" value="EDIT" onclick="edit(${i})"></td>`
        s += `<td><input type="button" value="DELETE" onclick="deletee(${i})" > </td> `
        s += `<td><input type="button" value="THEM VAO GIO HANG" onclick="addshop(${i})">  </td>`
        s += `</tr>`
    }
    console.log(s)
    document.getElementById("display").innerHTML = s;
}

class Shopp {
    constructor(name, price, img) {
        this.name = name
        this.price = price
        this.img = img

    }
}


let arrd = [];

function addshop(index) {
    let name = products[index].name
    let price = products[index].price
    let img = products[index].img
    arrd.push(new Shopp(name, price, img));
    showshop()
}


function showshop() {
    let a = ""
    a += `<tr>`
    a += ` <td> <h1>Anh san pham</h1></td>`
    a += `<td> <h1>Ten san pham</h1></td>`
    a += `<td> <h1>Gia san pham</h1></td>`
    a += `</tr>`
    for (let i = 0; i < arrd.length; i++) {
        a += `<table>`
        a += `<tr>`
        a += `<td><img src="${arrd[i].img} " width="200" height="200"></td> `
        a += `<td><table><tr><td> ${"ten sp: "} ${arrd[i].name}</td></tr> `
        a += `<tr> <td> ${"gia tien: "} ${arrd[i].price}</td> </tr> </table> </td>`
        a += `<td><input type="button" value="DELETE" onclick="deletee1(${i})"></td>`
        a += `</tr>`
        a += `<table>`
    }
    document.getElementById("displayshop").innerHTML = a;


}

function tiemkiem() {
    let d = ""
    for (let i = 0; i < products.length; i++) {

        if (document.getElementById("check").value == products[i].name) {
            d += `<table>`
            d += `<tr>`
            d += `<td><img src="${products[i].img} " width="200" height="200"></td> `
            d += `<td><table><tr><td> ${"ten sp: "} ${products[i].name}</td></tr> `
            d += `<tr> <td> ${"gia tien: "} ${products[i].price}</td> </tr> </table> </td>`
            d += `</tr>`
            d += `<table>`
            document.getElementById("displaycheck").innerHTML = d;
        }
    }
    let modalla = document.getElementById("modal_add2")
    modalla.style.display = "flex"
}

function backtk() {
    let modalla = document.getElementById("modal_add2")
    modalla.style.display = "none"
}

function edit(index) {
    products[index].name = prompt("nhap ten can sua:  ");
    products[index].img = prompt("nhap img ");
    products[index].price = prompt("nhap gia ");
    show();
}

function deletee(index) {
    products.splice(index, 1);
    show();
}

function deletee1(index) {
    arrd.splice(index, 1);
    showshop();
}

function shoping() {
    arrd = [];
    alert(" chuc mung ban da thanh toan thanh cong");
    document.getElementById("displayshop").innerHTML = "";
}

function dell() {
    let a = ""
    for (let i = 0; i < products.length; i++) {
        if (products[i].company == "DELL") {
            a += `<table>`
            a += `<tr>`
            a += `<td><img src="${products[i].img} " width="200" height="200"></td> `
            a += `<td><table><tr><td> ${"ten sp: "} ${products[i].name}</td></tr> `
            a += `<tr> <td> ${"gia tien: "} ${products[i].price}</td> </tr> </table> </td>`
            a += `</tr>`
            a += `<table>`
            document.getElementById("displaydell").innerHTML = a;
        }
    }
    document.getElementById("modal_add4").style.display = "flex"
}

function back() {
    document.getElementById("modal_add4").style.display = "none"
}

function hp() {
    let a = ""
    for (let i = 0; i < products.length; i++) {
        if (products[i].company == "HP") {
            a += `<table>`
            a += `<tr>`
            a += `<td><img src="${products[i].img} " width="200" height="200"></td> `
            a += `<td><table><tr><td> ${"ten sp: "} ${products[i].name}</td></tr> `
            a += `<tr> <td> ${"gia tien: "} ${products[i].price}</td> </tr> </table> </td>`
            a += `</tr>`
            a += `<table>`
            document.getElementById("displayHP").innerHTML = a;
        }
    }
    document.getElementById("modal_add5").style.display = "flex"
}

function backdp() {
    document.getElementById("modal_add5").style.display = "none"
}

function asus() {
    let a = ""
    for (let i = 0; i < products.length; i++) {
        if (products[i].company == "ASUS") {
            a += `<table>`
            a += `<tr>`
            a += `<td><img src="${products[i].img} " width="200" height="200"></td> `
            a += `<td><table><tr><td> ${"ten sp: "} ${products[i].name}</td></tr> `
            a += `<tr> <td> ${"gia tien: "} ${products[i].price}</td> </tr> </table> </td>`
            a += `</tr>`
            a += `<table>`
            document.getElementById("displayasus").innerHTML = a;
        }
    }
    document.getElementById("modal_add6").style.display = "flex"
}

function backdp1() {
    document.getElementById("modal_add6").style.display = "none"
}