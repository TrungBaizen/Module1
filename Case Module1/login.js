let account = NULL;
let listUser = [];
let admin = {
    username: 'admin',
    password: 'admin',
    email: 'admintrung@gmail.com',
    name: 'AdminTrung',
    role: "Admin"
}
listUser.push(admin);
let keyProduct = "product";
let keyPurchased = "purchased"
let puschased = [];
// localStorage.setItem("token", JSON.stringify([]));
// localStorage.setItem("token", JSON.stringify(listUser));
function formSignup() {
    selectOptionNone();
    let signup = `
    <h2>Signup</h2>
<form>
    <input type="text" id="username" placeholder="Username">
    <br>
    <input type="password" id="password" placeholder="Password">
    <br>
    <input type="email" id="email" placeholder="Email">
    <br>
    <input type="text" id="name" placeholder="Name">
    <br>
    <input type="text" id="role" value="User" placeholder="Name" hidden="hidden" readonly>
    <br>
    <button onclick="signup()">Đăng ký</button>
    <h4 onclick="formLogin()"><u>Đăng nhập</u></h4>
</form>`
    document.getElementById("main").innerHTML = signup;
}

function formLogin() {
    selectOptionNone();
    let login = `
    <h2>Login</h2>
<div>
    <input type="text" id="username" placeholder="Username">
    <br>
    <input type="password" id="password" placeholder="Password">
    <br>
    <button onclick="logIn()">Đăng nhập</button>
    <h4 onclick="formSignup()"><u>Đăng ký</u></h4>
</div>`
    document.getElementById("main").innerHTML = login;
}

function signup() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let role = document.getElementById("role").value;
    let user = {
        username: username,
        password: password,
        email: email,
        name: name,
        role: role
    }
    let data = JSON.parse(localStorage.getItem("token"));
    let check = false
    if (username.length >= 8 && password.length >= 6) {
        for (let i = 0; i < data.length; i++) {
            if (username !== data[i].username && email !== data[i].email) {
                check = true;
            } else if (username === data[i].username) {
                check = false
            } else if (email === data[i].email) {
                check = false
            }
        }
        if (check) {
            data.push(user);
            /*lưu tài khoản và giỏ hàng*/
            localStorage.setItem("token", JSON.stringify(data));
            // tạo giỏ hàng riêng cho tài khoản user
            localStorage.setItem(keyProduct + user.username, JSON.stringify([]));
            // tạo nơi lưu trữ sản phẩm đã mua
            localStorage.setItem(keyPurchased + user.username, JSON.stringify([]));
            alert("Đăng ký thành công")
            formLogin();
        } else {
            alert("Tài khoản hoặc email đã tồn tại")
            formSignup()
        }
    } else {
        alert("Username có ít nhất 8 kí tự và password có ít nhất 6 kí tự")
        formSignup()
    }
}

function logIn() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let userLogin = localStorage.getItem("token")
    let data = JSON.parse(userLogin)
    let check = false;
    let index = 0;
    for (let i = 0; i < data.length; i++) {
        if (username === data[i].username && password === data[i].password) {
            check = true;
            index = i;
            break;
        }
    }
    if (check) {
        alert("Đăng nhập thành công");
        account = data[index];
        if (account.role === "Admin") {
            showAllAdmin();
            document.getElementById("account").innerHTML = `
               <h4>Xin chào ${account.name}</h4>
               <button onclick="logOut()">Đăng xuất</button>
    `
        } else if (account.role === "User") {
            showAll(HOME);
            document.getElementById("cart").style.display = 'block'
            document.getElementById("account").innerHTML = `
               <h4>Xin chào ${account.name}</h4>
               <button onclick="logOut()">Đăng xuất</button>
    `
        }
    } else {
        alert("Đăng nhập thất bại");
        formLogin();
    }
}

function logOut() {
    account = NULL;
    window.location.href = "CaseQuanLy.html";
}