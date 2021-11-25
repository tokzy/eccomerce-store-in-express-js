if (document.readyState == 'loading') {
document.addEventListener('DOMContentLoaded', ready)
} else {
ready()
}

function ready() {
///var quantityInputs = document.getElementsByClassName('cart-quantity-input')
//for (var i = 0; i < quantityInputs.length; i++) {
//var input = quantityInputs[i]
//input.addEventListener('change', quantityChanged)
//}

var addToCartButtons = document.getElementsByClassName('shop-item-button')
for (var i = 0; i < addToCartButtons.length; i++) {
var button = addToCartButtons[i]
button.addEventListener('click', addToCartClicked)
}

//document.getElementsByClassName('btn-purchase')[0].addEventListener('change', SelectCurrency)
}


function quantityChanged(event) {
var input = event.target
if (isNaN(input.value) || input.value <= 0) {
input.value = 1
}
updateCartTotal()
}

function addToCartClicked(event) {
document.getElementById('error').innerHTML = "";
var button = event.target;
var shopItem = button.parentElement.parentElement.parentElement;

var id = shopItem.getElementsByClassName('product_id')[0].value;
var title = shopItem.getElementsByClassName('product_name')[0].value;
var price = shopItem.getElementsByClassName('product_price')[0].value;
var imageSrc = shopItem.getElementsByClassName('product_image2')[0].src;  
var qty = document.getElementById('sst').value;

addItemToCart(id,title, price, qty,imageSrc)
//updateCartTotal()
countCartItems()
if(document.getElementById('error').innerHTML != 'error'){
swal(title, "Item added successfully to Your shopping cart", "success");
}
//console.log(id+""+title);
}


function addItemToCart(id,title, price, qty,imageSrc) {
var cartRow = document.createElement('div')
cartRow.classList.add('cart-row')
var cartItems = document.getElementsByClassName('cart-items')[0]
var cartItemNames = cartItems.getElementsByClassName('cart-id')

for (var i = 0; i < cartItemNames.length; i++) {
if (cartItemNames[i].innerText === id) {
document.getElementById('error').innerHTML = 'error'
swal(title, "Item already added to cart", "warning");
fail;
}
}

var cartRowContents = `
<div class="cart-item cart-column">
<img class="cart-item-image" src="${imageSrc}" style="max-width:100px:width:100%;max-height:100px;">
<span class="cart-id" hidden>${id}</span>
<span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
<input class="cart-quantity-input" type="number" value="${qty}" disabled>
<button class="btn btn-danger" type="button" hidden><i class="fa fa-trash"></i></button>
</div>`

cartRow.innerHTML = cartRowContents
cartItems.append(cartRow)
cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
var amt = document.getElementById('part').innerText;
document.getElementById('part').innerHTML = Number(amt) + 1;
addToCartDb(id,qty,price)
}

function addCommas(nStr){

nStr += '';

var x = nStr.split('.');

var x1 = x[0];

var x2 = x.length > 1 ? '.' + x[1] : '';

var rgx = /(\d+)(\d{3})/;

while (rgx.test(x1)) {

x1 = x1.replace(rgx, '$1' + ',' + '$2');

}

return x1 + x2;

}


function updateCartTotal() {
var cartItemContainer = document.getElementsByClassName('cart-items')[0]
var cartRows = cartItemContainer.getElementsByClassName('header-cart-wrapitem')
var total = 0
for (var i = 0; i < cartRows.length; i++) {
var cartRow = cartRows[i]
var priceElement = cartRow.getElementsByClassName('cart-price')[0]
var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//console.log(priceElement.value)
var price2 = priceElement.innerText;
var price = parseFloat(price2.replace(',',''))
var quantity = quantityElement.value
total = total + (price * quantity)
}

total = Math.round(total * 100) / 100
//$('cart-total-price').remove();
//document.getElementsByClassName('cart-total-price')[0].innerText = symbol+''+ addCommas(total)
//document.getElementsByClassName('cart_price')[0].innerText = symbol+'' + addCommas(total)
}


function countCartItems() {
var cartItemContainer = document.getElementsByClassName('cart-items')[0]
var cartRows = cartItemContainer.getElementsByClassName('header-cart-wrapitem').length
var cart_initial = document.getElementsByClassName('part')[0].innerText

for (var i = 0; i < cartRows; i++) {
if(cart_initial === ""||isNaN(cart_initial)){
document.getElementsByClassName('part')[0].innerHTML = parseInt(cart_initial2)+1
}else{
document.getElementsByClassName('part')[0].innerHTML = parseInt(cart_initial)+1
}
}
}

function addToCartDb(productId,qty,price){
var hr = new XMLHttpRequest();
var url = "/cart/product/add";
var vars = "productId="+productId+"&qty="+qty+"&price="+price;
hr.open("POST", url, true);
hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
hr.onreadystatechange = function() {
if(hr.readyState == 4 && hr.status == 200) {
var return_data = hr.responseText;
console.log(return_data);
}
}
hr.send(vars);
//document.getElementById("flas").innerHTML = "<img src='images/progress-bar.gif'>";
}

function CartQuantityUpdate(id,price,qty){
var hr = new XMLHttpRequest();
var url = "CartUpdate.php";
var vars = "id="+id+"&qty="+qty+"&price="+price;
hr.open("POST", url, true);
hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
hr.onreadystatechange = function() {
if(hr.readyState == 4 && hr.status == 200) {
var return_data = hr.responseText;
if(return_data){
document.getElementsByClassName('order_total_amount')[0].innerText = addCommas(return_data);
document.getElementById("refresh_"+id).innerHTML = " ";
}
}
}
hr.send(vars);
document.getElementById("refresh_"+id).innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
}

function removeCartItem(id) {
var hr = new XMLHttpRequest();
var url = "CartItemDelete.php";
var vars = "id="+id;
hr.open("POST", url, true);
hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
hr.onreadystatechange = function() {
if(hr.readyState == 4 && hr.status == 200) {
var return_data = hr.responseText;
if(return_data){
$('.cart_'+id).remove();   
document.getElementsByClassName('order_total_amount')[0].innerText = return_data;
document.getElementById("refresh_"+id).innerHTML = " ";
}
}
}
hr.send(vars);
document.getElementById("refresh_"+id).innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
}

function SelectCurrency(id) {
var hr = new XMLHttpRequest();
var url = "SelectCurrency.php";
var vars = "id="+id;
hr.open("POST", url, true);
hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
hr.onreadystatechange = function() {
if(hr.readyState == 4 && hr.status == 200) {
var return_data = hr.responseText;
if(return_data == "success"){    
document.getElementById("Cu_message").innerHTML = "<div class='alert alert-success'>Currency set successfully...</div>";
setTimeout(function(){location.reload()},1000);
}
}
}
hr.send(vars);
document.getElementById("Cu_message").innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
}


function CouponCode() {
var hr = new XMLHttpRequest();
var url = "CouponUse.php";
var coupon = document.getElementById('coupon45').value
var totalcost = document.getElementById('fee').value
var vars = "coupon="+coupon+"&total="+totalcost;
hr.open("POST", url, true);
hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
hr.onreadystatechange = function() {
if(hr.readyState == 4 && hr.status == 200) {
var return_data = hr.responseText; 
if(return_data == 'success'){
swal("success","coupon applied successfully","success");
setTimeout(function(){location.reload()},1000);
}

if(return_data != "success"){
document.getElementById("coupon_message").innerHTML = "";    
swal("alert",return_data, "error");      
}

}
}
hr.send(vars);
document.getElementById("coupon_message").innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
}

//======================================paystack payment integration============================================================
function payWithPaystackInvoice(){
var email = document.getElementById('userEmail').value;    
var total_price = document.getElementById('fee').value;    
var sfee = document.getElementById('sfee').value;
var tranx = document.getElementById('tranx').value;

var price = parseInt(total_price);
var handler = PaystackPop.setup({
key: 'pk_test_7d0838d7e3fa21e84d9997071f46d7ffc2b47703',  // put paystack key here
email: email,  //Email of customer here
amount: price * 100,  // amount in kobo
currency: "NGN",
ref: ''+Math.floor((Math.random() * 1000000000) + 1),
callback: function(response){   
//alert('Transaction successful.');
window.location = "../PaymentSuccess.php?status=invoice&tranxid="+tranx; 
var txt_id = response.reference;
},
onClose: function(){

}
});
handler.openIframe();
}

//============================================================integration ends========================================



