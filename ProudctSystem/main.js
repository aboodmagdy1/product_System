// total fucntion 
// creat product funciton 
// save data in localStorage 
// clear data from input after creat 
// display data after it input 
// creat count of product 
// delete
// update 
// search
// clead data (when input is not completed with data  )
// --------------------------------------------------------------------------------------------------------------
// hold the element 
let title  =document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let inputIN = document.querySelectorAll(".inputs input")
let imporatanIN=[title,price,category,count]
let searchIN = document.getElementById("search")

// Update or Create
let mood = "create"
// search mood search by title / category  
let searchMood = "title"
// a temp variaple to use the i argument in the fucnction update date autside this fucntion 
let temp ;
// get total
function getTotal()
{
    if(price.value !="")
    {
        let result =+price.value+ +taxes.value+ +ads.value- +discount.value+"$"
        total.innerHTML = result
        total.style.background = `var(--total-on)`
    }
    else
    {
        total.innerHTML = ""
        total.style.background = `var(--total-off)`
    }

}
// -------------------------------------------------------------------------------------------------------------
// creat proudct(creat)
// هعمل كده عشان مش كل ما يعمل ري لود يمسح البيانات القديمه
let dataOfProducts
if(window.localStorage.Products !=null)
{
dataOfProducts = JSON.parse(localStorage.Products)
// to display data onload
displayData()
}else
{
    dataOfProducts=[]
}
submit.onclick =function()
{
let product = 
{   
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
}

// to save all data when creat a new product
if(title.value!==""
 && price.value !== ""&& 
 category.value!==""&& product.count<100)
{
    if(mood === "create"&& product.count!==''){
        if(product.count>0)
        {
            for(let i = 0 ;i<product.count;i++)
            {
                dataOfProducts.push(product)
            }
        }
        else
        {
            // count is negative  then creat 1 product
            dataOfProducts.push(product)
        }
        }
        else
        {
             dataOfProducts[temp]=product
             mood="create"
             submit.innerHTML="Create"
             count.style.display="block"
             inputIN.forEach((input)=>{
                input.style.border = "none"
            })

        }
        clearData()
        imporatanIN.forEach((input)=>{ if(input.value===""){input.style.border ="none"}})
}
else
{
    imporatanIN.forEach((input)=>{ if(input.value===""){input.style.border ="1px solid var(--error-color)"}})
}

getTotal()

// save data in localStorage
window.localStorage.setItem("Products",JSON.stringify(dataOfProducts))
displayData()
}
// --------------------------------------------------------------------------------------
// clear inputs 

function clearData()
{ 
    // clear input data
    inputIN.forEach(input=>input.value ="")
    // else in this fun will clear the  total
    getTotal()
}

// -------------------------------------------------------------------------------------------------------------
// display data (read)
function displayData()
{
    let table = ""
    for(let i = 0 ; i<dataOfProducts.length;i++)
    {
        let product =  dataOfProducts[i]
        table += `
        <tr>
        <td>#${i+1}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td><button onclick="updateProduct(${i})" >update</button></td>
        <td><button onclick=deleteProudct(${i})>delete</button></td>
    </tr>
        `
    }
    document.getElementById("tbody").innerHTML=table
    // delete all btn when there is a data 
    let btnDelete = document.getElementById("deleteAll")
    if(dataOfProducts.length>0)
    {
        btnDelete.innerHTML=`<button onclick="deleteAllData()">deleteAll(${dataOfProducts.length})</button>`
    }else
    {
        btnDelete.innerHTML = ""

    }
}
// -----------------------------------------------------------------------------------------------------------
// delete function 
 function deleteProudct(i)
 {
    // remove form array 
    dataOfProducts.splice(i,1)
    // update localStorage after remove data 
    localStorage.Products = JSON.stringify(dataOfProducts)
    // to load the data that is exist only
    displayData()
 }
//  delet all data 
function deleteAllData()
{
    localStorage.clear()
    dataOfProducts.splice(0)
    displayData()
}
// ------------------------------------------------------------------------------------------------------------
// when i click on update  the value of the elemnt go in the input field 
function updateProduct(i)
{
    title.value = dataOfProducts[i].title
    price.value = dataOfProducts[i].price
    taxes.value = dataOfProducts[i].taxes
    ads.value = dataOfProducts[i].ads
    discount.value = dataOfProducts[i].discount
    category.value = dataOfProducts[i].category
    getTotal()
    count.style.display="none"
    submit.innerHTML = "Update"
    mood = "update"
    temp = i ;
    scroll({top:0,behavior:"smooth"})
    inputIN.forEach((input)=>{
        input.style.border = "1px solid rgb(192, 255, 4)"
    })
}
// -------------------------------------------------------------------------------------------------------------
// get the button the user click 
function getSearchMode(id) 
{
    if(id=="searchTitle")
    {
        searchMood = "title"
    }else
    {
        searchMood="category"
    }
    searchIN.placeholder ="Search By "+searchMood

    searchIN.focus()
    searchIN.value = ""
    displayData()
}
// search proccess 
// value is the user key up words
function SearchData (value)
{
    let table ="" ;
    for(let i = 0 ; i<dataOfProducts.length;i++){
        if(searchMood=="title")
        {
    
                if(dataOfProducts[i].title.includes(value.toLowerCase()))
                {
                    let product = dataOfProducts[i]
                    
                    table += `
            <tr>
            <td>#${i}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}$</td>
            <td>${product.category}</td>
            <td><button onclick="updateProduct(${i})" >update</button></td>
            <td><button onclick=deleteProudct(${i})>delete</button></td>
        </tr>
            `
                }
            
        }
        else 
        {
            
                    let product = dataOfProducts[i]
                    if(dataOfProducts[i].category.includes(value.toLowerCase())){
                    table += `
            <tr>
            <td>#${i}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}$</td>
            <td>${product.category}</td>
            <td><button onclick="updateProduct(${i})" >update</button></td>
            <td><button onclick=deleteProudct(${i})>delete</button></td>
        </tr>
            `
                    }
        }
    }
    document.getElementById("tbody").innerHTML=table
}





// dark and light mode 
const dayNight = document.querySelector(".day-night")
dayNight.addEventListener("click",()=>{
    dayNight.querySelector("i").classList.toggle("fa-sun")
    dayNight.querySelector("i").classList.toggle("fa-moon")
    document.body.classList.toggle("sun")
})
window.addEventListener("load",function()
{
    if(document.body.classList.contains("dark"))
    {
        dayNight.querySelector("i").classList.add("fa-sun")
    }
    else
    {
        dayNight.querySelector("i").classList.add("fa-moon")
    }
})



