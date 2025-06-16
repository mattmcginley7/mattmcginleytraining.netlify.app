function validateForm() {
    var name = document.forms["contactForm"]["name"].value;
    var email = document.forms["contactForm"]["email"].value;
    var message = document.forms["contactForm"]["message"].value;
    if (name == "" || email == "" || message == "") {
        alert("All fields are required");
        return false;
    }
}
document.querySelector('#smolovCalculator').addEventListener('click', smolovNumbers)
function smolovNumbers(){
    let smolovJr = document.querySelector('#smolovInput').value
    let smolovJr70 = smolovJr * (7/10)
    let smolovJr75 = smolovJr * (75/100)
    let smolovJr80 = smolovJr * (80/100)
    let smolovJr85 = smolovJr * (85/100)
    document.querySelector("#week1Day1").innerHTML = Math.floor(smolovJr70) + " 6 sets of 6 reps"
    document.querySelector("#week1Day2").innerHTML = Math.floor(smolovJr75) + " 7 sets of 5 reps"
    document.querySelector("#week2Day1").innerHTML = Math.floor(smolovJr80) + " 8 sets of 4 reps"
    document.querySelector("#week2Day2").innerHTML = Math.floor(smolovJr85) + " 10 sets of 3 reps"
    document.querySelector("#week3Day1").innerHTML = Math.floor(smolovJr70 + 10) + " 6 sets of 6 reps"
    document.querySelector("#week3Day2").innerHTML = Math.floor(smolovJr75 + 10) + " 7 sets of 5 reps"
    document.querySelector("#week4Day1").innerHTML = Math.floor(smolovJr80 + 10) + " 8 sets of 4 reps"
    document.querySelector("#week4Day2").innerHTML = Math.floor(smolovJr85 + 10) + " 10 sets of 3 reps"
    document.querySelector("#week5Day1").innerHTML = Math.floor(smolovJr70 + 20) + " 6 sets of 6 reps"
    document.querySelector("#week5Day2").innerHTML = Math.floor(smolovJr75 + 20) + " 7 sets of 5 reps"
    document.querySelector("#week6Day1").innerHTML = Math.floor(smolovJr80 + 20) + " 8 sets of 4 reps"
    document.querySelector("#week6Day2").innerHTML = Math.floor(smolovJr85 + 20) + " 10 sets of 3 reps"
}

document.querySelector("#mattButton").addEventListener('click', mattBenchPress)
function mattBenchPress(){
    let maxBenchPress = document.querySelector("#maxBenchInput").value
    let maxBenchPress90 = maxBenchPress * (90/100)
    let maxBenchPress80 = maxBenchPress * (80/100)
    let maxBenchPress75 = maxBenchPress * (75/100)
    let maxBenchPress70 = maxBenchPress * (70/100)
    document.querySelector("#mattWeek1Day1").innerHTML = Math.floor(maxBenchPress75) + " 5x5"
    document.querySelector("#mattWeek1Day2").innerHTML = Math.floor(maxBenchPress90) + " 5x1 " + Math.floor(maxBenchPress80) + " 3x3 " + Math.floor(maxBenchPress70) + " 3x7"
    document.querySelector("#mattWeek2Day1").innerHTML = Math.floor(maxBenchPress75 + 5) + " 5x5"
    document.querySelector("#mattWeek2Day2").innerHTML = Math.floor(maxBenchPress90 + 5) + " 5x1 " + Math.floor(maxBenchPress80 + 5) + " 3x3 " + Math.floor(maxBenchPress70 + 5) + " 3x7"
    document.querySelector("#mattWeek3Day1").innerHTML = Math.floor(maxBenchPress75 + 10) + " 5x5"
    document.querySelector("#mattWeek3Day2").innerHTML = Math.floor(maxBenchPress90 + 10) + " 5x1 " + Math.floor(maxBenchPress80 + 10) + " 3x3 " + Math.floor(maxBenchPress70 + 10) + " 3x7"
    document.querySelector("#mattWeek4Day1").innerHTML = Math.floor(maxBenchPress75 + 15) + " 5x5"
    document.querySelector("#mattWeek4Day2").innerHTML = Math.floor(maxBenchPress90 + 15) + " 5x1 " + Math.floor(maxBenchPress80 + 15) + " 3x3 " + Math.floor(maxBenchPress70 + 15) + " 3x7"
    document.querySelector("#mattWeek5Day1").innerHTML = Math.floor(maxBenchPress75 + 20) + " 5x5 "
    document.querySelector("#mattWeek5Day2").innerHTML = Math.floor(maxBenchPress90 + 20) + " 5x1 " + Math.floor(maxBenchPress80 + 20) + " 3x3 " + Math.floor(maxBenchPress70 + 20) + " 3x7"
    document.querySelector("#mattWeek6Day1").innerHTML = Math.floor(maxBenchPress75 + 25) + " 5x5"
    document.querySelector("#mattWeek6Day2").innerHTML = Math.floor(maxBenchPress90 + 25) + " 5x1 " + Math.floor(maxBenchPress80 + 25) + " 3x3 " + Math.floor(maxBenchPress70 + 25) + " 3x7"
}

document.querySelector("#edCoanButton").addEventListener("click", edCoanRoutine)

function edCoanRoutine(){
    let edCoanMax = document.querySelector("#edCoanInput").value
    let edCoan60 = edCoanMax * (60/100)
    let edCoan65 = edCoanMax * (65/100)
    let edCoan70 = edCoanMax * (70/100)
    let edCoan75 = edCoanMax * (75/100)
    let edCoan80 = edCoanMax * (80/100)
    let edCoan85 = edCoanMax * (85/100)
    let edCoan90 = edCoanMax * (90/100)
    let edCoan95 = edCoanMax * (95/100)
    let edCoan105 = edCoanMax * (105/100)

    document.querySelector("#deadOne").innerHTML = "Deadlift: 1x2 " + Math.floor(edCoan75)
    document.querySelector('#speedOne').innerHTML = "Speed Deadlift: 8x3 " + Math.floor(edCoan60) + " (90 seconds rest between sets)"
    document.querySelector("#deadTwo").innerHTML = "Deadlift: 1x2 " + Math.floor(edCoan80)
    document.querySelector('#speedTwo').innerHTML = "Speed Deadlift: 8x3 " + Math.floor(edCoan65) + " (90 seconds rest between sets)"
    document.querySelector("#deadThree").innerHTML = "Deadlift: 1x2 " + Math.floor(edCoan85)
    document.querySelector('#speedThree').innerHTML = "Speed Deadlift: 6x3 " + Math.floor(edCoan70) + " (90-120 seconds rest between sets)"
    document.querySelector("#deadFour").innerHTML = "Deadlift: 1x2 " + Math.floor(edCoan90)
    document.querySelector('#speedFour').innerHTML = "Speed Deadlift: 5x3 " + Math.floor(edCoan75) + " (90-120 seconds rest between sets)"
    document.querySelector("#deadFive").innerHTML = "Deadlift: 3x3 " + Math.floor(edCoan80)
    document.querySelector('#speedFive').innerHTML = "Speed Deadlift: 3x3 " + Math.floor(edCoan65) + " (120 seconds rest between sets)"
    document.querySelector("#deadSix").innerHTML = "Deadlift: 1x2 " + Math.floor(edCoan85)
    document.querySelector('#speedSix').innerHTML = "Speed Deadlift: 3x3 " + Math.floor(edCoan70) + " (120 seconds rest between sets)"
    document.querySelector("#deadSeven").innerHTML = "Deadlift: 1x2 " + Math.floor(edCoan90)
    document.querySelector('#speedSeven').innerHTML = "Speed Deadlift: 3x3 " + Math.floor(edCoan75) + " (120 seconds rest between sets)"
    document.querySelector("#deadEight").innerHTML = "Deadlift: 1x2 " + Math.floor(edCoan95)
    document.querySelector('#speedEight').innerHTML = "Speed Deadlift: 3x3 " + Math.floor(edCoan70) + " (120 seconds rest between sets)"
    document.querySelector("#deadNine").innerHTML = "Deadlift: 1x1 " + Math.floor(edCoanMax)
    document.querySelector('#speedNine').innerHTML = "Speed Deadlift: 2x3 " + Math.floor(edCoan70) + " (3 minutes rest between sets)"
    document.querySelector("#deadTen").innerHTML = "Deadlift: 1x1 " + Math.floor(edCoan105)
    document.querySelector('#speedTen').innerHTML = "Speed Deadlift: 2x3 " + Math.floor(edCoan60) + " (3 minutes rest between sets)"

}

document.querySelector('#ffmiButton').addEventListener('click', calculateFFMI)

function calculateFFMI(){
    let weight = parseFloat(document.querySelector('#ffmiWeight').value)
    let bodyFat = parseFloat(document.querySelector('#ffmiBodyfat').value)
    let height = parseFloat(document.querySelector('#ffmiHeight').value)

    if(isNaN(weight) || isNaN(bodyFat) || isNaN(height)){
        document.querySelector('#ffmiResult').innerHTML = 'Please enter valid numbers'
        return
    }

    let weightKg = weight / 2.20462
    let heightM = height * 0.0254
    let ffm = weightKg * (1 - bodyFat/100)
    let ffmi = ffm / (heightM * heightM)
    ffmi = ffmi.toFixed(1)

    let category = ''
    if(ffmi < 17){
        category = 'below average'
    } else if(ffmi < 19){
        category = 'average'
    } else if(ffmi < 21){
        category = 'above average'
    } else if(ffmi < 23){
        category = 'excellent'
    } else {
        category = 'elite'
    }

    document.querySelector('#ffmiResult').innerHTML = 'Your FFMI is ' + ffmi + '. This is considered ' + category + ' relative to the general population.'
}