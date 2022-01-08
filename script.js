let KEY = "5c8c2517814a40d2af6abc29a136e33b"
const userinput = document.getElementById("getWeather")
const city = document.querySelector("input")


let weather = {

    fetchWeather: function (city) {
        fetch(
            `https://api.weatherbit.io/v2.0/current?&city=${city}&key=${KEY}&lang=sv`
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch(function (error){
                setMessage(`(${city}) hittades tyvärr inte`);
            })
            ;
        console.log(city)
        
    },

    

    displayWeather: function (data) {
        const { city_name, temp, rh, wind_spd } = data.data[0];
        const { icon, description } = data.data[0].weather;

        console.log(city_name, icon, description, temp, rh, wind_spd)

        document.querySelector(".city").innerHTML = "Väder i " + city_name;
        document.querySelector(".icon").src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".humidity").innerHTML = "Luftfuktighet: " + rh + "%";
        document.querySelector(".wind").innerHTML = "Vindhastighet: " + wind_spd + "m/s";
        document.querySelector(".weather").classList.remove("loading")
    },


    search: function () {
        
        
        this.fetchWeather(document.querySelector(".search-bar").value);
        
    }


};




    function fetchWeather (city) {
        fetch(
            `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${KEY}&lang=sv`
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather2(data))
            .catch(function (error){
                setMessage(`(${city}) hittades tyvärr inte inte`);
                
            })
            ;

        console.log(city)
    }
   

    function displayWeather2 (data) {
        for (let i = 1; i < 6; i++) {


            const { valid_date, temp } = data.data[i];
            const { icon, description } = data.data[i].weather;

            let fivedays = document.getElementById("fivedays")
            const makeFiveDivs = document.createElement("div");
            const cityTitleDiv = document.createElement("h2");
            const weatherIconDiv = document.createElement("img");
            const cityDescDiv = document.createElement("p");
            const cityTempDiv = document.createElement("p");

            cityTitleDiv.innerText = data.data[i].valid_date;
            weatherIconDiv.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
            cityTempDiv.innerText = data.data[i].temp + " " + "°C"
            cityDescDiv.innerText = data.data[i].weather.description;

            makeFiveDivs.appendChild(cityTitleDiv);
            makeFiveDivs.appendChild(weatherIconDiv);
            makeFiveDivs.appendChild(cityTempDiv);
            makeFiveDivs.appendChild(cityDescDiv);
            fivedays.appendChild(makeFiveDivs);

            console.log(i)
            console.log(valid_date, temp, icon, description)
        }
    }
    function search () {
        this.fetchWeather(document.querySelector(".search-bar").value);

    }






document.querySelector(".search button").addEventListener("click", function (event) {

    
    event.preventDefault();
    
     setMessage(""); ///////////
    

    if((userinput).value === ""){
        alert("Type the name off a city")
    }
    else{

    
     
        clearSecondDiv();
        weather.search();
        search();
        animation.play();
    }
});






weather.fetchWeather("stockholm")






function clearSecondDiv() {
    const divEl = document.querySelectorAll("#fivedays *")
    for (let i = 0; i < divEl.length; i++) {
        let el = divEl[i];
        el.remove();
    }
}

function setMessage(message) {
    const h2 = document.querySelector("#message");
    h2.innerText = message;
  
    if(message === ''){
      h2.style.display = "none";
    }
    else{
      h2.style.display = "flex";
      
    }
}

function showDiv(){
    document.getElementById("conCode").style.display = "block";
    help.style.display = "none"
}
function closeDiv(){
    document.getElementById("conCode").style.display = "none";
    document.getElementById("help").style.display ="block"
}
