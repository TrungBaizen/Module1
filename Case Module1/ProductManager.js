class ProductManager {
    list;

    constructor() {
        this.list = JSON.parse(localStorage.getItem("list"));
        // this.list.push(new Product(1,"Laptop Dell G16 7620",25000000,20, "https://lapvip.vn/upload/products/original/dell-gaming-g16-7620-1676600915.jpg"))
        // this.list.push(new Product(2,"Laptop Dell Vostro 5402",12500000,25, "https://cdn.tgdd.vn/Products/Images/44/232428/dell-vostro-5402-i5-v4i5003w-222320-102344-600x600.jpg"));
        // this.list.push(new Product(3,"Laptop Dell XPS 15 9570",80850000,10,"https://laptopleson.com/wp-content/uploads/2019/06/Laptop-L%C3%AA-S%C6%A1n-Dell-XPS-9570-04.jpg" ));
        // this.list.push(new Product(4,"Laptop Dell Precision 7780",37500000,12, "https://laptopdell.com.vn/wp-content/uploads/2023/03/Dell-Precision-7780_2-2-e1679640123360.png"));
        // this.list.push(new Product(5,"Laptop Dell Ispiron",17450000,10, "https://anphat.com.vn/media/product/44585_laptop_dell_inspiron_15_3520_71003262_anphatpc_88.jpg"));
        // localStorage.setItem("list", JSON.stringify(this.list))
    }

    findAll() {
        return JSON.parse(localStorage.getItem("list"));
    }

    findById(id) {
        let arr = JSON.parse(localStorage.getItem("list"));
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return arr[i];
            }
        }
        return NULL;
    }

    add(newProduct) {
        this.list.push(newProduct);
        localStorage.setItem("list", JSON.stringify(this.list));
    }


    remove(id) {
        let index = this.findIndexById(id);
        this.list.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(this.list));
    }

    findIndexById(id) {
        for (let i = 0; i < this.list.length; i++) {
            if (id === this.list[i].id) {
                return i;
            }
        }
        return -1;
    }

    findProductById(id) {
        let index = this.findIndexById(id);
        let product = this.list[index];
        return product;
    }

    update(id, newProduct) { // sửa sản phẩm nào, thay bằng sản phẩm nào
        let index = this.findIndexById(id);
        this.list[index] = newProduct;
        localStorage.setItem("list", JSON.stringify(this.list));
    }

    findProductByName(name) {
        let result = [];
        let fullTextSearch = this.removeVietnameseTones(name.trim().toUpperCase());
        for (let i = 0; i < this.list.length; i++) {
            let check = this.removeVietnameseTones(this.list[i].name.trim().toUpperCase());
            if (check.includes(fullTextSearch)) {
                result.push(this.list[i])
            }
        }
        return result;
    }


    removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str =
            str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }
}

function sortProduct() {
    let action = document.getElementById("select").value
    let arr = store.findAll();

    if (checkHome === HOME){
        listShort = NULL_SORT;
    }else if (action === NULL && checkHome === HOME){

    }
    if (listShort !== NULL_SORT){
        arr = listShort;
    }



    if (action === actionSortPriceUp) {
        sortProductUp(arr)
         /*return tăng dần theo giá tiền */
    }else if (action === actionSortPriceDown){
        /*return giảm dần theo giá tiền*/
        sortProductDown(arr)
    }
    showAll(arr)
}

