const opencage = require("opencage-api-client")
const {OPENCAGE_KEY_API} = require("../config/secrets")
const openmeteo = require("openmeteo")

const indexRoute = (req,res) =>{
        res.render("Search")
}

const searchRoute = (req,res) =>{
        const query = req.query["q"]
        const getWeather = async () =>{
                try{
                        //Getting the latitude and longitude for the location
                        const response = await opencage.geocode({key: OPENCAGE_KEY_API,q: query})

                        if (response.status.code === 200 && response.results.length > 0){
                                const coord = response.results[0]
                                const url = "https://api.open-meteo.com/v1/forecast"
                                const params = {
                                        "latitude":coord.geometry["lat"],
                                        "longitude":coord.geometry["lng"],
                                        "current": ["temperature_2m", "wind_speed_10m", "wind_direction_10m"],
	                                "hourly": ["temperature_2m", "weather_code"],
                                        "timezone": "auto",
	                                "forecast_days": 1
                                }
                                //Getting the weather based on the latitude and longitude
                                const meteoResponse = await openmeteo.fetchWeatherApi(url,params)

                                const range = (start, stop, step) =>
                                        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

                                const place = meteoResponse[0]

                                const utcOffsetSeconds = place.utcOffsetSeconds
                                const current = place.current()
                                const hourly = place.hourly()
                                const weatherData = {
                                        current: {
                                                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                                                temperature2m: current.variables(0).value(),
                                                windSpeed10m: current.variables(1).value(),
                                                windDirection10m: current.variables(2).value(),
                                        },
                                        hourly: {
                                                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                                                        (t) => new Date((t + utcOffsetSeconds) * 1000)
                                                ),
                                                temperature2m: hourly.variables(0).valuesArray(),
                                                weatherCode: hourly.variables(1).valuesArray(),
                                        },
                                
                                }
                                //Passing the results into results.ejs and rendering them
                                res.render("Results",
                                        {
                                                "Location": coord.formatted,
                                                "latitude":place.latitude(),
                                                "longitude":place.longitude(),
                                                "temperature":weatherData.current.temperature2m.toFixed(1),
                                                "windSpeed":weatherData.current.windSpeed10m.toFixed(1),
                                                "windDirection":weatherData.current.windDirection10m.toFixed(1),
                                                "weathercode":weatherData.hourly.weatherCode,
                                                "hourlyTemp":weatherData.hourly.temperature2m
                                        })
                                
                        }else{
                                //render the error page if location not found
                                res.render("Error",{
                                        "title":"Location Not Exist"
                                })
                        }
                }catch(error){
                        res.json({
                                "error": error.message
                        })
                }
        }
        getWeather()
}

module.exports = {indexRoute,searchRoute}