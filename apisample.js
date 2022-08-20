//this code gets the cost per minute enjoyed of a movie based on its run time, the rotten tomatoes score and average
//ticket price for a movie in  Vancouver. 
//   [ticketprice] / ([rating] * [runtime]) = cost per minute enjoyed 

const axios = require('axios');
// ENTER TITLE HERE: 
const title = 'Ruby Sparks'

async function getdata(title, apikey, ticketprice){

    //options to feed to request, includes movie  title paramater. 

    const options = {
        method: 'GET',
        url: 'http://www.omdbapi.com/?apikey='+apikey+'&',
        params:  {t: title},
    }

    //Makes API call and gets data

    const res = await axios.request(options, async(error, response)=>{
        if(error){console.log(error)}
        return response
    })

    //gets rating and runtime for film
    let rating = res.data.Ratings[1].Value; 
    let runtime = res.data.Runtime; 

    console.log(title, "|", runtime, "|", rating);

    //converts  rating to number
    rating = rating.toString().replace("%", "");
    rating =  "0."+rating;  
    rating = parseFloat(rating);

    //converts runtime to number
    runtime = runtime.toString().replace(" min", "");
    runtime = parseInt(runtime);

    //calculates the percentage of minutes enjoyed based on the runtime and Rotten Tomatoes score. 
    let minutesEnjoyed = rating * runtime; 
    //caluclates the cost of minute enjoyed - based on the average movie ticket price in  Vancouver
    // and the above minutesEnjoyed value
    let costPerMinutesEnjoyed = ticketprice / minutesEnjoyed; 

    return costPerMinutesEnjoyed;
}   


async function getCPME(title){

    //user input for movie title. values for apikey and ticketprice. 
    
    let apikey = '2ed75b81';
    let ticketprice =  12.99;

    //calling getdata function to retrieve cost per minute enjoyed. 
    let CPME = await getdata(title, apikey, ticketprice);

    console.log("Cost per minute enjoyed of", title, "is", Math.round(CPME*100), "cents")
}

getCPME(title);
