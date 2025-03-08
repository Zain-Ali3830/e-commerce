// let array=JSON.parse(localStorage.getItem('objects')||[]);
// let array=[]
let array=JSON.parse(localStorage.getItem('objects'))||[];
let tSum=0;
let mainDiv=document.getElementById('mainDiv')
fetch('https://fakestoreapi.com/products?limit=4')
.then(response=>response.json())
.then(data=>{
    console.log(data)
    data.forEach(res=>{
        let sum=0;
        let y=0;
        let inc=0;
            let container=document.createElement('div')
            let buttonContainer=document.createElement('div')
            let priceContainer=document.createElement('div');
            priceContainer.innerHTML="Price"
            priceContainer.classList.add('price')
            buttonContainer.classList.add('buttonContainer')
             // Increment Button
             let increment=document.createElement('button')
             increment.innerHTML='+'
             increment.addEventListener('click',()=>{
                inc+=1;
                console.log(inc)
                sum=(res.price)+y
                console.log(sum.toFixed(0));
                y=sum;
                priceContainer.innerHTML=sum.toFixed(0);
             })


             // Decrement Button
             let decrement=document.createElement('button')
             decrement.innerHTML="-"
             decrement.classList.add('decrement')
             decrement.addEventListener('click',()=>{
                y=0;
                 if((sum.toFixed(0))!==(res.price.toFixed(0))){
                    sum=sum-res.price
                    inc-=1;
                    console.log(sum.toFixed(0));
                    priceContainer.innerHTML=sum.toFixed(0);
                }
                else if(sum.toFixed(0)===res.price.toFixed(0)){
                    priceContainer.innerHTML="Price";
                }
             })
             
            //  Add to Cart
            let addToCart=document.createElement('button');
            addToCart.classList.add('addToCart')
            addToCart.innerHTML="Cart"
            addToCart.addEventListener('click',()=>{
                //  let array=JSON.parse(localStorage.getItem('objects'))||[];
                // let array=[]
                let obj={
                    img:res.image,
                    title:res.title,
                    price:res.price,
                    tprice:sum.toFixed(0),
                    noOfItems:inc,
                }
               let exist=array.some(item=>item.title===obj.title)
               if(!exist&&obj.noOfItems>0){
                alert("Added to cart")
                array.push(obj)
                priceContainer.innerHTML="Price";
               }
               if(exist||obj.noOfItems<=0){
                alert("Can't added to cart")
                return
               }
                // array.push(obj)
                // alert("Added to Cart") 
                localStorage.setItem('objects',JSON.stringify(array))
                // localStorage.setItem("tSum",tSum)
                // console.log(obj)
                console.log(array)
            })
     
            container.innerHTML=`<img src='${res.image}' alt='${res.title}'style="height:150px; width:150px ; padding-top:20px "></img>
            <h2 style="text:centre; padding:15px">${res.title}</h2><h2>${res.price}</h2>`
           
            // Increment Styling
            increment.classList.add('increment')
            //Appending Increment Button in container
            buttonContainer.append(increment,decrement,priceContainer,addToCart)
            container.append(buttonContainer)
            container.classList.add('container')
            mainDiv.append(container)
    })
})
