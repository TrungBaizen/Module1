function findByKey(key) {
    return JSON.parse(localStorage.getItem(key))
}

function create(key, carts) {
    localStorage.setItem(key, JSON.stringify(carts));
}

function showAllCart() {

    let key = keyProduct + account.username;
    let cart = findByKey(key);
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
            <th>Total Price</th>
            <th colspan="2">Action</th>
        </tr>
        `

    // Check sản phẩm trong giỏ haàng có tồn tại không : Nếu không tồn tại thì xóa sản phẩm trong giỏ hàng
    for (let i = 0; i < cart.length; i++) {
        let check = store.findById(cart[i].id);
        if (check === NULL) {
            validateRemoveProductCart(cart[i].id);
            return;
        }
    }

    for (let i = 0; i < cart.length; i++) {
        html += `
            <tr>
                <td style="text-align: center">${cart[i].id}</td>
                <td style="text-align: center">${cart[i].name}</td>
                <td style="text-align: center">${cart[i].price}</td>
                <td style="text-align: center">${cart[i].quantity}</td>
                <td style="text-align: center"><img src="${cart[i].image}" alt=""></td>
                <td style="text-align: center">${cart[i].price * cart[i].quantity}</td>
                <td style="text-align: center"><button onclick="purchase(${cart[i].id})">Mua</button></td>
                <td style="text-align: center"><button onclick="removeProductCart(${cart[i].id})">Xóa</button></td>
            </tr>
        `
    }
    html += `</table>`
    document.getElementById("myModalCart").innerHTML = html;

}


/*xử lý sự kiện người dùng khi click + or - */
function handleActionQuantityProduct(id, action) {
    /*Kiểm tra tồn tại của user đăng nhập*/
    if (account === NULL) {
        alert("Vui lòng đăng nhập để thêm sản phẩm")
        formLogin();
    } else {
        let product = store.findById(id);
        let calculate = Number(document.getElementById(id).value);
        if (action === "+") {
            calculate += 1;
        } else {
            calculate -= 1;
        }

        if (calculate < 0) {
            alert("Không để số lượng nhỏ hơn không")
        } else if (Number(product.quantity) < calculate) {
            alert("Sản phẩm trong kho đã đạt giới hạn")
        } else {
            document.getElementById(id).value = calculate;
        }
    }
}

/*xử lý sự kiện người dùng thêm sản phẩm vào giỏ hàng */
function handleQuantityProduct(id) {
    let product = store.findById(id);
    if (account === NULL) {
        alert("Vui lòng đăng nhập để thêm sản phẩm")
        formLogin();
    } else {
        let key = keyProduct + account.username;
        let quantity = document.getElementById(id).value;
        if (quantity === "" || quantity == 0) {
            alert("Hãy nhập số lượng");
            document.getElementById(id).value = "";
            return;
        }
        if (quantity <= 0 || quantity > Number(product.quantity)) {
            alert("Số lượng nhập vào không được thấp hơn 1 và không được lớn hơn số lượng còn trong kho");
            document.getElementById(id).value = "";
            return;
        }
        let cartUser = findByKey(key);
        let idExitProduct = exitProductByCart(cartUser, id);
        let quantityProduct = product.quantity;
        product.quantity = quantity;
        /*Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa nếu đã tồn tại thì tìm ra sản phẩm đó để add thêm giá trị*/
        if (idExitProduct === NULL) {
            cartUser.push(product);
            document.getElementById(id).value = "";
            alert("Thêm sản phẩm thành công")
        } else {
            let quantityToCart = Number(cartUser[idExitProduct].quantity);
            quantityToCart += Number(quantity);
            if (Number(quantityToCart) > Number(quantityProduct)) {
                alert("Số lượng nhập vào lớn hơn số lượng còn trong kho")
                document.getElementById(id).value = "";
                return;
            }
            alert("Thêm sản phẩm thành công")
            document.getElementById(id).value = "";
            cartUser[idExitProduct].quantity = quantityToCart;
        }
        create(key, cartUser)
    }
}


/* Mua hàng trong giỏ hàng và trừ đi số lượng còn lại trong kho */
function purchase(id) {
    let key = keyProduct + account.username;
    let key2 = keyPurchased + account.username;
    let cartUser = findByKey(key);
    let idExitProduct = exitProductByCart(cartUser, id);
    if (idExitProduct !== NULL) {
        let i = Number(idExitProduct);
        let product = store.findById(id);
        let quantityCart = Number(cartUser[i].quantity);
        let quantityStore = Number(product.quantity);
        if (quantityStore >= quantityCart) {
            product.quantity = quantityStore - quantityCart;
            store.update(id, product);
            /* Lưu các  thông tin sản phẩm khi mua vào một cái localStorage mới  */
            puschased = findByKey(key2)
            puschased.push(cartUser[i])
            create(key2, puschased)
            /* Xóa sản phẩm khỏi giỏ hàng và localStorage lưu trữ giỏ hàng */
            const cartUser1 = cartUser.slice(0, i);
            const cartUser2 = cartUser.slice(i + 1, cartUser.length);
            let result = cartUser1.concat(cartUser2)
            create(key, result)
            showAllCart();
            showAll();
            alert("Mua thành công")
        } else {
            alert("Số lượng mua lớn hơn số lượng còn lại trong kho")
        }
    }
}

function removeProductCart(id) {
    let key = keyProduct + account.username;
    let cartUser = findByKey(key);
    let idExitProduct = exitProductByCart(cartUser, id);
    cartUser.splice(idExitProduct, 1);
    localStorage.setItem(key, JSON.stringify(cartUser));
    alert("Xóa thành công");
    showAllCart();
}


function validateRemoveProductCart(id) {
    let key = keyProduct + account.username;
    let cartUser = findByKey(key);
    let idExitProduct = exitProductByCart(cartUser, id);
    cartUser.splice(idExitProduct, 1);
    localStorage.setItem(key, JSON.stringify(cartUser));
    showAllCart();
}

/*Kiểm tồn tại của sản phẩm trong giỏ hàng*/
function exitProductByCart(cart, productId) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == productId) {
            return i;
        }
    }
    return NULL;
}
