window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDesription = document.querySelector(
        '.temperature-description'
    );
    let temperatureDegree = document.querySelector(
        '.temperature-degree'
    );
    let locationTimezone = document.querySelector(
        '.location-timezone'
    );
    let temperatureSection = document.querySelector(
        '.degree-section'
    );
    const temperatureSpan = document.querySelector(
        '.degree-section span'
    );
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';

            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json
                })
                .then(data => {
                   // console.log('data');
                    const { temperature, summary , icon } = data.currently;
                    //Set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDesription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // celsius formula
                    let celsius= (temperature -32 *(5/9))
                    // icon setting
                    setIcons(icon, document.querySelector('.icon'));

                    // degree Event lister Celsius/Farenheit

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                            
                        }
                    });
 
                });
        });
    } else {
        h1.textContent = ' Please Allow Us To Know Your Location'
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: 'white' });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.setIcons(iconID, Skycons[currentIcon]);
        
    };
   
});