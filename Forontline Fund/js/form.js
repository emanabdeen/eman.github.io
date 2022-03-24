var validExpiryYear,validExpiryMonth,validcreditCard,validuserEmail,validuserName,validation;
var itemArray=[["chain","Keys Chain",0,5,"true"],
["shirts","Shirts",0,25,"true"],
["pens","Pens",0,2,"true"],
["cookies","Cookies Bages",0,10,"true"],
["juice","Juice Boxes",0,6,"true"]];
var itemQuantity=true;

function LoadFunction(){ // reset the values of input controls in page reload 
    document.getElementById("uName").value="";
    document.getElementById("uemail").value="";
    document.getElementById("cardnumber").value="";
    document.getElementById("expmonth").value="";
    document.getElementById("expyear").value="";
}
function UserNameValidation (){
    document.getElementById('uNameMessage').innerHTML=""; //------------ reset the previous error message
    
    var userNamePattern=/^[A-Z]+\s[A-Z]+$/i; //------------ valdations patterns
    let userName=document.getElementById("uName").value;
    if (!userNamePattern.test(userName)){
        document.getElementById('uNameMessage').innerHTML="<p>Enter the first and the last names</p>";  //------------ error message
        validuserName=0;
    }
    else{
        validuserName=1;
    }
}
function UserEmailValidation (){
    document.getElementById('uEmailMessage').innerHTML="";  //------------ reset the previous error message
    
    var userEmailPattern=/^([A-Z0-9_\-\.])+\@([A-Z0-9_\-\.])+\.([A-Z]{2,4})$/i; //------------ valdations patterns
    let userEmail=document.getElementById("uemail").value;
    if (!userEmailPattern.test(userEmail)){
        document.getElementById('uEmailMessage').innerHTML+="<p>Invalid Email</p>";  //------------ error message
        validuserEmail=0;
    }
    else{
        validuserEmail=1;
    }
}
function CreditCardValidation (){
    document.getElementById('cardNumberMessage').innerHTML="";  //------------ reset the previous error message
    
    var creditCardPattern=/^([0-9]{4})\-([0-9]{4})\-([0-9]{4})\-([0-9]{4})$/;
    let creditCard=document.getElementById("cardnumber").value;
    if (!creditCardPattern.test(creditCard)){
        document.getElementById('cardNumberMessage').innerHTML+="<p>Invalid Number</p>";  //------------ error message
        validcreditCard=0;
    }
    else{
        validcreditCard=1;
    }
}
function ExpMonthValidation (){
    document.getElementById('expMonthMessage').innerHTML=""; //------------ reset the previous error message
    
    var expiryMonthPattern=/^JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC$/;
    let expiryMonth=document.getElementById("expmonth").value;
    if (!expiryMonthPattern.test(expiryMonth)){
        document.getElementById('expMonthMessage').innerHTML+="<p>Invalid Month</p>";  //------------ error message
        validExpiryMonth=0;
    }
    else{
        validExpiryMonth=1;
    }
}
function ExpYearValidation (){
    document.getElementById('expYearMessage').innerHTML=""; //------------ reset the previous error message
    
    var expiryYearPattern=/^\d{4}$/;
    let expiryYear=document.getElementById("expyear").value;
    let currentYear = new Date().getFullYear();
    if ((!expiryYearPattern.test(expiryYear))||expiryYear<currentYear||expiryYear>(currentYear+3)){ // expiry Year should be equal to current year or max 3 years later
        document.getElementById('expYearMessage').innerHTML+="<p>Invalid Year</p>";
        validExpiryYear=0;
    }
    else{
        validExpiryYear=1;
    }
}


function itemValidation (theId,arrayIndex,theMessage){
    document.getElementById(theMessage).innerHTML=""; //------------ reset the previous error message
    
    var itemNumberPattern=/^\d+$/;
    let itemNumber=document.getElementById(theId).value;
    if (!itemNumberPattern.test(itemNumber)){
        document.getElementById(theMessage).innerHTML+="<p>Invalid Number</p>";  //------------ error message
        itemArray[arrayIndex][4]= "false";
    }
    else{
        itemArray[arrayIndex][2]= parseInt(itemNumber);
        itemArray[arrayIndex][4]= "true";
    }
}

function checkout(){
    //---------------------------------------- check that all item quantity is valid number-----------------------------------------------
    itemQuantity=true;
    for (i=0;i<itemArray.length;i++){
        if(itemArray[i][4]==="false"){
            itemQuantity=false;
        }
    }//---------------------------------------------check all user information is valid----------------------------------------------
    
    validation=validExpiryYear+validExpiryMonth+validcreditCard+validuserEmail+validuserName; 
    if(isNaN(validation) ||validation<5){
        document.getElementById('part3').innerHTML="<p style='color: red;'>Please complete your personal information</p>";
    }
//--------------------------------------------------------------------------------------------------------------------------------
    if (validation==5 && itemQuantity==true){ // if user information & item quantity are valid
    
        document.getElementById('part1').innerHTML="<h2>Thank you for your purchase!</h2>";
//--------------------------------------------user information table---------------------------------------------------------------------
        let userInformation= '<table>';
            userInformation+='<tbody>';
                userInformation += '<tr>';
                    userInformation +=  '<td>Name</td>';
                    userInformation +=  `<td>${document.getElementById("uName").value}</td>`;
                userInformation +=  '</tr>';
                userInformation += '<tr>';
                    userInformation +=  '<td>Email</td>';
                    userInformation +=  `<td>${document.getElementById("uemail").value}</td>`;
                userInformation +=  '</tr>';
                userInformation += '<tr>';
                    userInformation +=  '<td>Credit Card</td>';
                    userInformation +=  `<td>xxxx-xxxx-xxxx-${String(document.getElementById("cardnumber").value).substring(15)} </td>`;
                userInformation +=  '</tr>';
            userInformation+='</tbody>';
        userInformation += '</table>';
        document.getElementById('part2').innerHTML=userInformation;
//-----------------------------------------Total Price and Donation amount calculations-----------------------------------------------------
        var totalPrice=0;
        var minDonation;
        var donationLable;
        for (k=0;k<itemArray.length;k++){
            if(itemArray[k][2]!=0){ // if the quantity not equal zero
                totalPrice+= itemArray[k][2]*itemArray[k][3]; // summation of the price for each product
            }
        }
        var totalPricePercentage=(totalPrice*0.1).toFixed(2); // calculate the 10% of the total price
        if(totalPricePercentage>10){                          // if the 10% of the total price > $10
            minDonation=totalPricePercentage;                 // the minimum donation value = 10% of the total price
            donationLable="%10 of your purchasing";
        }
        else{
            minDonation=10;                                     // otherwise th minimum donation value = $10
            donationLable="Minimum";                        
        }
        totalPrice+=minDonation;                                // total price + donation

//---------------------------------------------------------Purchased items table----------------------------------------------------
        let itemsTable= '<table>';
            itemsTable+='<thead>';
                itemsTable += '<tr>';
                itemsTable +=  '<th>Item</td>';
                itemsTable +=  '<th>Quantity</td>';
                itemsTable +=  '<th>Unit Price</td>';
                itemsTable +=  '<th>Total Price</td>';
                itemsTable +=  '</tr>';
            itemsTable+='</thead>';
            itemsTable+='<tbody>';
//------------------------------------------------------------------------------------------------------------------------------------
            for(j=0;j<itemArray.length;j++){
                if(itemArray[j][2]!=0){                         // if the quntity not zero
                    itemsTable += '<tr>';
                    itemsTable +=  `<td>${itemArray[j][1]}</td>`;
                    itemsTable +=  `<td>${itemArray[j][2]}</td>`;
                    itemsTable +=  `<td>$ ${itemArray[j][3]}</td>`;
                    itemsTable +=  `<td>$ ${itemArray[j][2]*itemArray[j][3]}</td>`;
                itemsTable +=  '</tr>';
                }
            }        
//------------------------------------------------------------------------------------------------------------------------------------
                itemsTable += '<tr>';
                    itemsTable +=  '<td>Donation</td>';
                    itemsTable +=  `<td colspan="2" >${donationLable}</td>`;
                    itemsTable +=  `<td>$ ${minDonation}</td>`;
                itemsTable +=  '</tr>';
                itemsTable += '<tr>';
                    itemsTable +=  `<td colspan="3" style="text-align: right; font-weight: bold;">Total</td>`;
                    itemsTable +=  `<td>$ ${totalPrice}</td>`;
                itemsTable +=  '</tr>';
//------------------------------------------------------------------------------------------------------------------------------------               
            itemsTable+='</tbody>';
        itemsTable += '</table>';

        document.getElementById('part3').innerHTML=itemsTable;
    }
}
