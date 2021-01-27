
// Get the element with id="defaultOpen" and click on it
document.getElementById('defaultOpen').click();

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

  }


//////////////////////////////////////////////////////////////////

// Listen for Inputs on Request Tab
    document.querySelector('.request-input input').oninput = () => calRequests();
    document.querySelector('.request-input #jsRendering').onclick = () => calRequests();
    document.querySelector('.request-input #geotargeting').onclick = () => calRequests();
    document.querySelector('.request-input #residentialIPs').onclick = () => calRequests();
    document.querySelector('.request-input #cookies').onclick = () => calRequests();
    document.querySelector('.request-input #sessions').onclick = () => calRequests();
    document.querySelector('.request-input #browserProfiles').onclick = () => calRequests();


// Listen for Inputs on Bandwidth Tab
    document.querySelector('.bandwidth-input input').oninput = () => calBandwidth();
    document.querySelector('.bandwidth-input #jsRendering2').onclick = () => calBandwidth();
    document.querySelector('.bandwidth-input #geotargeting2').onclick = () => calBandwidth();
    document.querySelector('.bandwidth-input #residentialIPs2').onclick = () => calBandwidth();
    document.querySelector('.bandwidth-input #cookies2').onclick = () => calBandwidth();
    document.querySelector('.bandwidth-input #sessions2').onclick = () => calBandwidth();
    document.querySelector('.bandwidth-input #browserProfiles2').onclick = () => calBandwidth();

////////////////////////////////////////////////////////////////////

// Gather Input Data

function calRequests(){

    let requests = document.querySelector('.request-input input').value;

    let requestsNoCommaString = requests.replace(",","");
    requestsNoCommaString = requestsNoCommaString.replace(",","");
    requestsNoCommaString = requestsNoCommaString.replace(",","");
    requestsNoCommaString = requestsNoCommaString.replace(",","");


    let requestNumber = Number(requestsNoCommaString);

    if(isNaN(requestNumber)){
        requestNumber = 0;
    }

    if(requestNumber > 100000000){
        requestNumber = 100000000;
        document.querySelector('.request-input .errorAlert').innerHTML = '<p>If you require more than 100 million requests, then <a href="https://danni057272.typeform.com/to/sMpSSx">please contact sales</a>.</p>'
        document.querySelector('.request-input input').style.color = '#ef0b0b';
    } else{
        document.querySelector('.request-input .errorAlert').innerHTML = '';
        document.querySelector('.request-input input').style.color = '#6b6b6b'
    }

    let bandwidth = Math.ceil(calculateBandwidth(requestNumber));

    //add comma into the input box
    document.querySelector('.request-input input').value = `${convertToComma(requestNumber)}`;




    if (bandwidth >= 1000){
        document.querySelector('.request-input .bandwidthConversion span').innerText = `${bandwidth/1000}TB`;
    } else {
        document.querySelector('.request-input .bandwidthConversion span').innerText = `${bandwidth}GB`;
    }

    /// Check if checkboxes are checked or not - returns true or false
    jsRendering = document.querySelector('.request-input #jsRendering').checked;
    residential = document.querySelector('.request-input #residentialIPs').checked;
    geotargeting = document.querySelector('.request-input #geotargeting').checked;
    cookies = document.querySelector('.request-input #cookies').checked;
    sessions = document.querySelector('.request-input #sessions').checked;
    browserProfiles = document.querySelector('.request-input #browserProfiles').checked;

    displayRequestPlans(requestNumber, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles);

}


function calBandwidth(){

    let bandwidthInput = document.querySelector('.bandwidth-input input').value;

    let bandwidthNoCommaString = bandwidthInput.replace(",","");
    bandwidthNoCommaString = bandwidthNoCommaString.replace(",","");
    bandwidthNoCommaString = bandwidthNoCommaString.replace(",","");
    bandwidthNoCommaString = bandwidthNoCommaString.replace(",","");


    let bandwidthNumber = Number(bandwidthNoCommaString);

    if(isNaN(bandwidthNumber)){
        bandwidthNumber = 0;
    }

    let requests = bandwidthToRequests(bandwidthNumber);

    if(requests > 100000000){
        bandwidthNumber = 100000;
        document.querySelector('.bandwidth-input .errorAlert').innerHTML = '<p>If you require more than 100TB of bandwidth, then <a href="https://danni057272.typeform.com/to/sMpSSx">please contact sales</a>.</p>'
        document.querySelector('.bandwidth-input input').style.color = '#ef0b0b';
    } else{
        document.querySelector('.bandwidth-input .errorAlert').innerHTML = '';
        document.querySelector('.bandwidth-input input').style.color = '#6b6b6b';
    }

    //add comma into the input box
    document.querySelector('.bandwidth-input input').value = `${convertToComma(bandwidthNumber)}`;

    if (requests >= 1000000){
        document.querySelector('.bandwidth-input .bandwidthConversion span').innerText = `${Math.ceil(requests/1000000)} million`;
    } else {
        document.querySelector('.bandwidth-input .bandwidthConversion span').innerText = `${convertToComma(requests)}`;
    }

    /// Check if checkboxes are checked or not - returns true or false
    jsRendering = document.querySelector('.bandwidth-input #jsRendering2').checked;
    residential = document.querySelector('.bandwidth-input #residentialIPs2').checked;
    geotargeting = document.querySelector('.bandwidth-input #geotargeting2').checked;
    cookies = document.querySelector('.bandwidth-input #cookies2').checked;
    sessions = document.querySelector('.bandwidth-input #sessions2').checked;
    browserProfiles = document.querySelector('.bandwidth-input #browserProfiles2').checked;

    displayBandwidthPlans(requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles);

}

/////////////////////////////////////////////////////////////////////

// Display Outputs - Requests
function displayRequestPlans(requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles){

    let orderedPlansArray = comparePlans(requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles);

    let newPlan = document.querySelectorAll(".planRow")[0].cloneNode(true);
    document.querySelectorAll(".plansOutput")[0].innerHTML = '';


    orderedPlansArray.forEach((plan, count) => {

        if(document.querySelectorAll(".plansOutput")[0].innerHTML == ''){

        } else{
            newPlan = document.querySelectorAll(".planRow")[0].cloneNode(true);
        }

        createNewRow(newPlan, plan, count);

        document.querySelectorAll(".request-input .plansOutput")[0].appendChild(newPlan);

        resetTemporaryValues();

    });

  }


// Display Outputs - Bandwidth
function displayBandwidthPlans(requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles){

    let orderedPlansArray = comparePlans(requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles);

    let newPlan = document.querySelectorAll(".bandwidth-input .planRow")[0].cloneNode(true);
    document.querySelectorAll(".bandwidth-input .plansOutput")[0].innerHTML = '';

    orderedPlansArray.forEach((plan, count) => {

        if(document.querySelectorAll(".bandwidth-input .plansOutput")[0].innerHTML == ''){

        } else{
            newPlan = document.querySelectorAll(".bandwidth-input .planRow")[0].cloneNode(true);
        }

        createNewRow(newPlan, plan, count);


        document.querySelectorAll(".bandwidth-input .plansOutput")[0].appendChild(newPlan);

        resetTemporaryValues();

    });

  }

  function createNewRow(newPlan, plan, count){

        newPlan.querySelector('h4').innerText = plan.Plan;
        newPlan.querySelector('h3').innerText = `${plan.Name} Plan`;

        if(plan.Price > 0){
            newPlan.querySelector('h5').innerText = `${convertToDollar(plan.Price)}`;
        } else {
            newPlan.querySelector('h5').innerText = `Free`;
        }

        newPlan.querySelector('img').src = findCompanyUiData(plan.Plan,'logo');
        newPlan.querySelector('.price a').href = findCompanyUiData(plan.Plan,'buttonLink');
        newPlan.querySelector('.price button').innerText = findCompanyUiData(plan.Plan,'buttonText');
        newPlan.querySelector('.price .belowPrice').innerText = findCompanyUiData(plan.Plan,'buttonSubText');
        newPlan.querySelector('.companyDescription').innerText = findCompanyUiData(plan.Plan,'description');

        if(plan.Plan == 'Scraper API'){
            newPlan.querySelector('.hiddenElement').style.display = 'block';
            newPlan.style.borderColor = "#7A35BF";
            newPlan.querySelector('button[class="expandButton"]').style.display = 'none';
        } else if (count==0){
            newPlan.querySelector('.hiddenElement').style.display = 'block';
            newPlan.style.borderColor = "#EAEAF2";
            newPlan.querySelector('button[class="expandButton"]').style.display = 'none';
        } else {
            newPlan.querySelector('.hiddenElement').style.display = 'none';
            //newPlan.querySelector('.hiddenElement').style.display = 'block';
            newPlan.querySelector('button[class="expandButton"]').style.display = 'block';
            newPlan.style.borderColor = "#EAEAF2";
        }

        if(plan.Plan == 'Scraper API' && plan.Price > 249){
            newPlan.querySelector('.price .abovePrice').innerText = 'Starting from...';
            newPlan.querySelector('.price .belowPrice').innerText = 'Enterprise Trial With 3M Free Requests';
            newPlan.querySelector('.price button').innerText = 'Contact Sales';
            newPlan.querySelector('.price a').href = 'https://danni057272.typeform.com/to/sMpSSx';
        } else {
            newPlan.querySelector('.price .abovePrice').innerText = '';
        }

        // Simple Feature Checks
        checkFeature(newPlan, plan.browserProfiles, 'browserProfiles');
        checkFeature(newPlan, plan.customCookies, 'customCookies');
        checkFeature(newPlan, plan.sessionSupport, 'customSessions');
        checkFeature(newPlan, plan.geolocation, 'geotargeting');
        checkFeature(newPlan, plan.residentialIPs, 'residential');

        // Edge Case Feature Checks
        if(!plan.Requests){
            newPlan.querySelector('.requests td span').innerText = 'Unlimited';
        } else {
            newPlan.querySelector('.requests td span').innerText = convertToComma(plan.Requests);
        }

        // if(!plan.Concurrency){
        //     newPlan.querySelector('.concurrency td span').innerText = 'Unlimited';
        // } else {
        //     newPlan.querySelector('.concurrency td span').innerText = convertToComma(plan.Concurrency);
        // }


        if(!plan.maxBandwidth){
            newPlan.querySelector('.bandwidth td span').innerText = 'Unlimited';
        } else if (plan.maxBandwidth >= 1000){
            newPlan.querySelector('.bandwidth td span').innerText = `${plan.maxBandwidth/1000}TB`;
        } else {
            newPlan.querySelector('.bandwidth td span').innerText = `${plan.maxBandwidth}GB`;
        }

        if(plan.JS){
            newPlan.querySelector('.JS_Rendering').innerHTML = '<td><span><i class="far fa-check"></i></span></td><td class="rightCol">JS Rendering</td>';
        } else if (plan.headlessBrowserSupport){
            newPlan.querySelector('.JS_Rendering').innerHTML = '<td><span><i class="far fa-check"></i></span></td><td class="rightCol">Headless Browser Support</td>';
        } else{
            newPlan.querySelector('.JS_Rendering td span').innerHTML = '<i class="far fa-times"></i>';
        }


        newPlan.querySelector('.expandButton').innerText = 'Plan includes';

        newPlan.querySelector('button[class="expandButton"]').addEventListener('click', changeButtonEvent);

  };


  ////////////////////////////////////////////////////////////////
  test = 0;

  // Find Cheapest Plan From Each Company
  function comparePlans(requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles) {

    let planArray = [];

    planArray.push(scraperApiPricing (scraperapi_plans, requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles));
    planArray.push(residentialPricing(luminati_residential_plans, requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles));
    planArray.push(residentialPricing(luminati_mobile_plans, requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles));
    planArray.push(residentialPricing(oxylabs_plans, requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles));
    planArray.push(residentialPricing(geosurf_plans, requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles));

    planArray.push(residentialPricing(netnut_plans, requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles));
    planArray.push(residentialPricing(intoli_plans, requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles));
    planArray.push(residentialPricing(smartproxy_plans, requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles));
    planArray.push(ipPricing(microleaves_plans, requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles));

    let crawlerPrice = crawleraPricing(crawlera_plans, requests, jsRendering, residential, geotargeting, sessions, cookies, browserProfiles)

    if(crawlerPrice){
        planArray.push(crawlerPrice);
    }

    planArrayChecked = priceCheck(planArray)

    let orderedPlans = planArrayChecked.sort((a, b) => compare(a.Price, b.Price));

    return orderedPlans;

  }

  function priceCheck(planArray){

    scraperapi = planArray.reduce(plan => {if(plan.Plan=='Scraper API'){return plan}});
    planArray.forEach(plan => {if(plan.Price < scraperapi.Price){planArray.splice(planArray.indexOf(plan),1);}});
    return planArray;

  }

  // Find Cheapest --- SCRAPER API --- Plan
function scraperApiPricing (inputObject, inputRequests, renderTrue, premiumTrue, geoTrue, sessions, cookies, browserProfiles){

    let planCost = [];

    inputObject.forEach(plan => {

        if(inputRequests <= plan.Requests && renderTrue <= plan.JS && geoTrue <= plan.geolocation && premiumTrue <= plan.residentialIPs && sessions <= plan.sessionSupport && cookies <= plan.customCookies){
            planCost.push(plan);
        }

    });

    //If outside price range
    if(planCost.length == 0){

        return {   Plan: 'Scraper API',
            Name: 'Enterprise',
            Requests: inputRequests,
            Concurrency: 5,
            Price: (inputRequests/1000000)*25,
            JS: true,
            geolocation: true,
            Countries: ['US','CA', 'UK', 'DE', 'FR', 'ES', 'BR', 'MX', 'IN', 'JP', 'CN', 'AU'],
            residentialIPs: true,
            Autoparse: ['Google', 'Amazon'],
            customCookies: true,
            sessionSupport: true};

    } else {
        return findLowestPrice(planCost);
    }

}

// Find Cheapest --- Crawlera --- Plan
function crawleraPricing(inputObject, requestInput, renderTrue, premiumTrue, geoTrue, sessions, cookies, browserProfiles){

    let planCost = [];

    inputObject.forEach(plan => {

        let baseCost = plan.minimumPrice;
        let additionalCost = 0;

        if(requestInput > plan.baseRequests){
            additionalCost = plan.perAdditional * Math.ceil(requestInput/plan.baseRequests);
        }

        plan.Price = baseCost + additionalCost;
        plan.Requests = Math.max(requestInput, plan.baseRequests);

        if(plan.Price < 1000 && renderTrue <= plan.headlessBrowserSupport && geoTrue <= plan.geolocation && premiumTrue <= plan.residentialIPs && sessions <= plan.sessionSupport && cookies <= plan.customCookies && browserProfiles <= plan.browserProfiles){
            planCost.push(plan);
        }
        //planCost.push(plan);

    });

    return findLowestPrice(planCost);

}

    // Find Cheapest --- Residential IP --- Plan
function residentialPricing(inputObject, requestInput, renderTrue, premiumTrue, geoTrue, sessions, cookies, browserProfiles){

    let planCost = [];

    inputObject.forEach(plan => {

        let intCost = plan.perGB * calculateBandwidth(requestInput) + plan.IPs * getConcurrency(requestInput);
        plan.Price = Math.max(intCost, plan.minimumPrice);

        //planCost.push({Plan: plan.Plan, Name: plan.Name, Price: cost, Image: plan.logo});

        if(renderTrue <= plan.headlessBrowserSupport && geoTrue <= plan.geolocation && premiumTrue <= plan.residentialIPs && sessions <= plan.sessionSupport && cookies <= plan.customCookies){

            if(plan.Bandwidth == 0){ //deals with Pay-As-You-Go
                plan.maxBandwidth = Math.ceil(calculateBandwidth(requestInput));
            } else if (plan.Bandwidth < Math.ceil(calculateBandwidth(requestInput))){
                plan.maxBandwidth = Math.ceil(calculateBandwidth(requestInput));
            }else {
                plan.maxBandwidth = plan.Bandwidth;
            }

            planCost.push(plan);

        }

    });

    return findLowestPrice(planCost);


}


    // Find Cheapest --- IP Based Plan
    function ipPricing(inputObject, requestInput, renderTrue, premiumTrue, geoTrue, sessions, cookies, browserProfiles){

        let latency = 30;
        let planCost = [];

        inputObject.forEach(plan => {

            let maxRPMperProxy = 60/latency;
            let maxPlanRPM = plan.IPs * maxRPMperProxy;
            let maxMonthlyRequests = maxPlanRPM * 60 * 24 * 30;

            if(requestInput <= maxMonthlyRequests && renderTrue <= plan.headlessBrowserSupport && geoTrue <= plan.geolocation && premiumTrue <= plan.residentialIPs && sessions <= plan.sessionSupport && cookies <= plan.customCookies){

                plan.Price = plan.minimumPrice;
                planCost.push(plan);
            }

        });

        return findLowestPrice(planCost);


    }

////////////////////  Misc Calculation Functions  ///////////////////////////

function compare(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
    }

function calculateBandwidth(inputRequests){
    let bandwidth_per_page_gb = 250/1000000;
    let bandwidth_pm = bandwidth_per_page_gb * inputRequests;
    return bandwidth_pm;
}


function bandwidthToRequests(bandwidthInput){
    let bandwidth_per_page_gb = 250/1000000;
    let requests = bandwidthInput/bandwidth_per_page_gb;
    return requests;
}


function convertToDollar(numberInput){
    let rounded = Math.floor(numberInput);
    let comma = new Intl.NumberFormat().format(rounded);
    return `$${comma}`;
}

function convertToComma(numberInput){
    let comma = new Intl.NumberFormat().format(numberInput);
    return comma;
}

function resetTemporaryValues(){
    this.maxBandwidth = 0;
}

function findLowestPrice(plansArray){
    let lowestCost = plansArray.sort((a, b) => compare(a.Price, b.Price));
    return lowestCost[0];
}

function getConcurrency(requestInput){
    let latency = 6;
    let requests_day = requestInput/30;

    let RPM_requirement = (requests_day/(24))/60;
    let latency_RPM = 60/latency;

    let min_concurrency = RPM_requirement/latency_RPM;

    return Math.floor(min_concurrency) * 1;
  }

//////////////////// Misc UI Display Functions //////////////////////////////////

function findCompanyUiData (companyName,returnValue){
    if (companyName == 'Scraper API'){
        return companyDetails.ScraperAPI[returnValue]
    }  if(companyName == 'Crawlera'){
        return companyDetails.Crawlera[returnValue];
    }  if(companyName == 'OxyLabs'){
        return companyDetails.Oxylabs[returnValue];
    } if(companyName == 'GeoSurf'){
        return companyDetails.Geosurf[returnValue];
    }  if(companyName == 'Luminati Residential' || companyName == 'Luminati Mobile'){
        return companyDetails.Luminati[returnValue];
    } if(companyName == 'Microleaves'){
        return companyDetails.Microleaves[returnValue];
    } if(companyName == 'Smartproxy'){
        return companyDetails.Smartproxy[returnValue];
    } if(companyName == 'Intoli'){
        return companyDetails.Intoli[returnValue];
    } if(companyName == 'NetNut'){
        return companyDetails.NetNut[returnValue];
    }
}

function checkFeature(plan, planProperty, domSelector){

    let tempDOM = `.${domSelector} td span`;

    if(planProperty === false){
        plan.querySelector(tempDOM).innerHTML = '<i class="far fa-times"></i>';
    } else{
        plan.querySelector(tempDOM).innerHTML = '<i class="far fa-check"></i>';
    }
}

function changeButtonEvent(event){
    event.stopImmediatePropagation();
    this.removeEventListener("click", changeButtonEvent);
    this.querySelector('button[class="expandButton"]').onclick = displaySection();
}

function displaySection(){
    let activeButton = event.currentTarget;
    let nextNode = activeButton.nextElementSibling;
    nextNode.style.display = 'block';
    activeButton.style.display = 'none';
  }


// Run Default Values
calRequests();
calBandwidth();


