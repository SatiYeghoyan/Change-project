"use strict"

window.addEventListener("DOMContentLoaded", () => {

   const table = document.querySelector("table");
   const tbody = table.querySelector("tbody");
   const thead = table.querySelector("thead")
   getApi()

   async function getApi() {
      const responce = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");

      const data = await responce.json();
      //const result = await data;
      console.log(data);
      getThead(data);
      convertValue(data);
   }

   function getThead(res) {
      thead.innerHTML += `
       <tr>
       <td>ID</td>
        <td>CharCode</td>
         <td>Name</td>
          <td>Value</td>
       </tr> 
        
        `
      let arr = [];
      for (let item in res.Valute) {
         arr.push(res.Valute[item])

      }
      arr.forEach(({ ID, CharCode, Name, Value }) => {
         tbody.innerHTML += `

    <tr>
    <td>${ID}</td>
     <td>${CharCode}</td>
      <td>${Name}</td>
       <td>${Value}</td>
    </tr>
    `
      })
      selectControl(arr)
   
   }

   function convertValue(result) {
      const valueUSD = document.querySelector('[data-value="USD"]');
      const valueEur = document.querySelector('[data-value="EUR"]');
      const valueAmd = document.querySelector('[data-value="AMD"]');
      valueUSD.textContent = result.Valute.USD.Value.toFixed(1);
      valueEur.textContent = result.Valute.EUR.Value.toFixed(1);
      valueAmd.textContent = result.Valute.AMD.Value.toFixed(1)

   }

   function selectControl(res) {
    
      const selector1 = document.querySelector("#exampleFormControlSelect1");
      const selector2 = document.querySelector("#select");
      const input = document.querySelector("#input");
      const result = document.querySelector("#result")
      console.log(result);
      res.forEach(({ ID, NumCode, CharCode, Nominal, Value, Previous, Name }) => {
         selector1.innerHTML += `
     <option class = "opt1" value = "${CharCode}">${Name}</option>`;
         selector2.innerHTML += `
      <option class = "opt2" value = "${CharCode}">${Name}</option>
     `
selector1.addEventListener("input", () =>{
 const filter1 = res.filter(item => item.CharCode === selector1.value)
  if(selector1.value = filter1[0].CharCode){
input.value = result.value
  }
  else{
   result.value =  (parseFloat(selector1.value) / filter1[0].Value).toFixed(2)
  }
  result.value = input.value;
  });



      })
    

   }


})
