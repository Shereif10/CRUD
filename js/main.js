var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescriptionInput = document.getElementById('productDescription');


var searchInput = document.getElementById('searchInput');

var updateBtn = document.getElementById('updateBtn');
var addBtn = document.getElementById('addBtn');

var indexUpdate = 0;

var productContainer = [];


if(localStorage.getItem('products') != null){

    productContainer = JSON.parse(localStorage.getItem('products'));
    displayData();
}



function addProduct() {

    if(regexName() == true && regexPrice() == true && regexCategory() == true && regexDescription() == true){
        addBtn.classList.remove('disabled');
        product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescriptionInput.value
        }
    
        productContainer.push(product);
        localStorage.setItem('products' , JSON.stringify(productContainer))
    
        displayData();
        clearForm();
    }
    
}

function displayData() {


    var cartona = ''


    for (var i = 0; i < productContainer.length; i++) {

        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].description}</td>
        <td>
            <button class="btn btn-outline-warning btn-sm" onclick='setData(${i})'>Update</button>
            <button class="btn btn-outline-danger btn-sm" onclick='deleteProduct(${i})'>Delete</button>
       </td>
</tr>`


    }

    document.getElementById('tableData').innerHTML = cartona;


}


function deleteProduct(elementNumber){


    productContainer.splice(elementNumber , 1);

    localStorage.setItem('products' , JSON.stringify(productContainer));



    displayData()


}


function searchProduct(){

    var term = searchInput.value;


    var cartona = ''


    for (var i = 0; i < productContainer.length; i++) {


        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            cartona += `<tr>
        <td>${i + 1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].description}</td>
        <td>
            <button class="btn btn-outline-warning btn-sm">Update</button>
            <button class="btn btn-outline-danger btn-sm" onclick='deleteProduct(${i})'>Delete</button>
       </td>
</tr>`


    }

    document.getElementById('tableData').innerHTML = cartona;
        }

        

}


function setData(index){
    var currentProduct = productContainer[index];

    indexUpdate = index;

    productNameInput.value = currentProduct.name;
    productPriceInput.value = currentProduct.price;
    productCategoryInput.value = currentProduct.category;
    productDescriptionInput.value = currentProduct.description;

    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
}


function updateProduct(){
    var product = {
        name: productNameInput.value ,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value
    }

    productContainer.splice(indexUpdate , 1 , product);

    localStorage.setItem('products', JSON.stringify(productContainer));
    displayData();

    updateBtn.classList.add('d-none');
    addBtn.classList.remove('d-none');
    
    clearForm();
}


function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}




function regexName(){
    var regex = /^[A-Z][a-z]{2,8}$/;
    var text = productNameInput.value;

    var messageName = document.getElementById('messageName');

    if(regex.test(text) == true){

        productNameInput.classList.add('is-valid')
        productNameInput.classList.remove('is-invalid')

        messageName.classList.add('d-none')

        return true;
    }
    else{
        
        productNameInput.classList.add('is-invalid')
        productNameInput.classList.remove('is-valid')

        messageName.classList.remove('d-none')
        
        return false;
    }

}


function regexPrice(){
    var regex = /^[\d]{1,6}$/
    var text = productPriceInput.value;

    var messagePrice = document.getElementById('messagePrice');

    if(regex.test(text)== true && text > 0) {
        productPriceInput.classList.add('is-valid')
        productPriceInput.classList.remove('is-invalid')

        messagePrice.classList.add('d-none')

        return true;
    }
    else{

        productPriceInput.classList.add('is-invalid')
        productPriceInput.classList.remove('is-valid')

        messagePrice.classList.remove('d-none')
        
        return false;
    }
}

function regexCategory(){
    var regex = /^(mobile|tv|laptop)$/i;
    var text = productCategoryInput.value;

    var messageCategory = document.getElementById('messageCategory');

    if(regex.test(text) == true){

        productCategoryInput.classList.add('is-valid')
        productCategoryInput.classList.remove('is-invalid')

        messageCategory.classList.add('d-none')

        return true;
    }
    else{
        
        productCategoryInput.classList.add('is-invalid')
        productCategoryInput.classList.remove('is-valid')

        messageCategory.classList.remove('d-none')
        
        return false;
    }
}

function regexDescription(){
    var regex = /^[\w]{3,100}$/i;
    var text = productDescriptionInput.value;

    var messageDescription = document.getElementById('messageDescription');

    if(regex.test(text) == true){

        productDescriptionInput.classList.add('is-valid')
        productDescriptionInput.classList.remove('is-invalid')

        messageDescription.classList.add('d-none')

        return true;
    }
    else{
        
        productDescriptionInput.classList.add('is-invalid')
        productDescriptionInput.classList.remove('is-valid')

        messageDescription.classList.remove('d-none')
        
        return false;
    }
}