async function search(a) {
  let t = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`
  );
  if (t.ok && 400 != t.status) {
    let a = await t.json();
    displayCurrent(a.location, a.current),
      displayAnother(a.forecast.forecastday);
  }
}
document.getElementById("search").addEventListener("keyup", function (a) {
  search(a.target.value);
});
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function displayCurrent(a, t) {
  if (null != t) {
    var e = new Date(t.last_updated);

    let n = `
            <div class="col-lg-4">
                <div class="todayForcast">
                <div class="forecast-header"  id="today">
                <div class="day float-start">${days[e.getDay()]}</div>  
                <div class=" date float-end">${e.getDate()} ${
      months[e.getMonth()]
    }</div>
                <div class="clearfix"></div>
            </div>
                                    
            <div class="forecast-content" id="current"> 
                <div class="location">${a.name}</div>   
                <div class="degree"> 
                <div class="num">${t.temp_c} C</div>
                <div class="forecast-icon">
                <img src="https:${t.condition.icon}" alt="" width=90>
            </div></div> 
            <div class="custom">${t.condition.text} </div>
                <span><img src="images/icon-umberella.png" alt=""> ${
                  t.humidity
                } </span>
                <span><img src="images/icon-wind.png" alt=""> ${
                  t.wind_kph
                }</span>
                <span><img src="images/icon-compass.png" alt=""> ${
                  t.wind_dir
                }</span>
            </div>
            </div>
        </div>`;
    document.getElementById("forecast").innerHTML = n;
  }
}
function displayAnother(a) {
  let t = "";

  for (let i = 1; i < a.length; i++)
    t += `
            <div class="col-lg-4">
              <div class="futurForcast d-flex justify-content-center align-items-center flex-column">
                <div class="forecast-header" id="today">
                  <div class="day text-center">${
                    days[new Date(a[i].date.replace(" ", "T")).getDay()]
                  }</div>
                </div>

                <div class="forecast-content" id="current">
                  <img
                    src="https:${a[i].day.condition.icon}"
                    alt=""
                    width="48"
                  />
                  <div class="num"> max temp ${a[i].day.maxtemp_c} C</div>
                  <div class="num">min temp ${a[i].day.mintemp_c} C</div>
                  <div class="custom">${a[i].day.condition.text}</div>
                </div>
              </div>
            </div>
            `;
  document.getElementById("forecast").innerHTML += t;
}
search("nizhny novgorod");
