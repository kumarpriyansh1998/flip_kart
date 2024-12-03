const express = require('express');
const { resolve } = require('path');
let cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());

app.use(express.static('static'));


let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; //
// let cartTotal = 0;

app.get('/',(req,res)=>{
  return res.send("Welcome");
});

app.get('/cart-total',(req,res)=>{
  
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = cartTotal + newItemPrice;
  return res.send(cartTotal.toString());
});

app.get('/membership-discount',(req,res)=>{
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember==="true";
  let afterDis;
  if(isMember){
    afterDis = cartTotal - ((discountPercentage*cartTotal)/100);
  }else{
    afterDis = cartTotal;
  }
  return res.send(afterDis.toString());
});

app.get('/calculate-tax',(req,res)=>{
  
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (cartTotal*taxRate)/100;
  return res.send(tax.toString());
});


app.get('/estimate-delivery',(req,res)=>{
  let sm = req.query.shippingMethod;
  let dis = parseFloat(req.query.distance);
  let eta;
  if(sm==='standard'){
    eta = dis/50;
  }else{
    eta = dis/100;
  }

  return res.send(eta.toString());
});

app.get('/shipping-cost',(req,res)=>{
  let weight = parseFloat(req.query.weight);
  let dis = parseFloat(req.query.distance);
  let cost = weight*dis*0.1;
  return res.send(cost.toString());
});


app.get('/loyalty-points',(req,res)=>{
  let a = parseFloat(req.query.purchaseAmount);
  let point = a*2;
  return res.send(point.toString());
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
