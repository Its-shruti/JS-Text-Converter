let btnBox = document.querySelector(".btn-box");
let inputTextArea = document.getElementById("inputTextArea");
let input = document.getElementById("input");
let toggleButton = document.querySelector(".toggleButton")
let root = document.querySelector(":root");


//** applying event on parent - event delegation */
const buttonClick = (event) =>{
    let targetElem = event.target;
    let inputVal = input.value.trim();

    //** uppercase */
    if(targetElem.classList.contains("upperCase")){
        let result = inputVal.toString().toUpperCase();
        inputTextArea.value = result.trim();
    }

    //** lower case */
    else if(targetElem.classList.contains("lowerCase")){
        let result = inputVal.toString().toLowerCase();
        inputTextArea.value = result;
    }

    //**title case */
    else if(targetElem.classList.contains("titleCase")){
        let str = inputVal.toString();
        let arr = str.split(" ");

        let newArr =  arr.map((curElem)=>{
            return curElem.charAt(0).toUpperCase() + curElem.slice(1).toLowerCase();
        })

        inputTextArea.value =  newArr.join(" ");
    }


    //** word count */
    else if(targetElem.classList.contains("wordCount")){
        let str = inputVal.toString();
        let arr = str.split(" ");
        let sum = 0;

        arr.map((curElem)=>{
            curElem.trim();
            if(curElem.length == 0){
                sum = sum;
            }
            else if(curElem.length == 1 || curElem.length > 1){
                sum = sum+1;
            }
        })
        inputTextArea.value = sum;
    }


    //** character count */
    else if(targetElem.classList.contains("charCount")){
        let str = inputVal.toString();
        let arr = str.split(" ");
        sum = 0;

        arr.map((curElem)=>{
            curElem.trim();
            if(curElem.length == 0){
                sum = sum;
            }
            else if(curElem.length == 1 || curElem.length > 1){
                sum = sum + curElem.length;
            }
        })
        inputTextArea.value = sum;
    }


    //** copy Text on clipboard */
    else if(targetElem.classList.contains("copyText")){
        let str = inputTextArea.value.toString();
        navigator.clipboard.writeText(str);
        console.log(str)
        alert("Text Copied...");
    }


    //** clear Text from input field */
    else if(targetElem.classList.contains("clearText")){
        input.value = "";
        inputTextArea.value = "";
    }



    //** English to hindi*/
    else if(targetElem.classList.contains("meaning")){

        let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputVal}`;

        let response = fetch(apiUrl, {
            headers: { 
                Accept: "application/json",
            },
        })
        .then((response)=>{
            console.log("res : ",response);
            return response.json();
        })
        .then((data)=>{
            // console.log("data : ", data);
            inputTextArea.value = data[0].meanings[0].definitions[0].definition;

        })
        .catch((error)=>{
            console.log("API is not working...");
            console.log(error);
        })

    }
        
}


//** to change the theme of page */
const changeTheme = () =>{
    toggleButton.classList.toggle("div-sun");
    toggleButton.classList.toggle("div-moon");

    if(toggleButton.classList.contains("div-moon")){
        toggleButton.style.transform = `translateX(3rem)`;
        toggleButton.nextElementSibling.style.display = "none"; 
        toggleButton.nextElementSibling.nextElementSibling.style.display = "block";
        document.body.style.backgroundColor = "#0f0e29";

        root.style.setProperty('--col-black', '#f4f4f4');
        root.style.setProperty('--col-white', '#272121');
        root.style.setProperty('--col-dark', '#9290C3');
        root.style.setProperty('--col-light', '#0f0e29');
        root.style.setProperty('--filter', 'invert(100%) sepia(100%) saturate(1%) hue-rotate(154deg) brightness(106%) contrast(101%)');
    }

    else if(toggleButton.classList.contains("div-sun")){
        toggleButton.style.transform = `translateX(0)`;
        toggleButton.nextElementSibling.style.display = "block"; 
        toggleButton.nextElementSibling.nextElementSibling.style.display = "none";
        document.body.style.backgroundColor = "#fff";

        root.style.setProperty('--col-black', '#272121');
        root.style.setProperty('--col-white', '#f4f4f4');
        root.style.setProperty('--col-dark', '#0f0e29');
        root.style.setProperty('--col-light', '#9290C3'); 
        root.style.setProperty('--filter', 'invert(0%) sepia(96%) saturate(7447%) hue-rotate(284deg) brightness(87%) contrast(97%)');
    }
}
    




toggleButton.addEventListener("click", changeTheme);
btnBox.addEventListener("click", buttonClick);