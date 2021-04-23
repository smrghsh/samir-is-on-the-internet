var visited = localStorage.getItem('visited')
if (visited == null){
    localStorage.setItem('visited',1)
} else {

    greetings = [
    "Good to see you again",
    "How's it going?",
    "hi!",
    ]
    document.getElementById('greeting').innerHTML = greetings[Math.floor(Math.random()*greetings.length)]
}