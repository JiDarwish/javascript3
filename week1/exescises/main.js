//1
let numbers = [1, 2, 3, 4];
let newNumbers = numbers.filter((a) => a % 2 != 0).map((a) => a * 2);
console.log("The doubled numbers are", newNumbers); // [2, 6]

//2
let numbers2 = [1, 2, 3, 4];
let newNumbers2 = numbers2.reduce((a, b) => {
    a.push(b);
    (b % 2 == 0) ? a.push(b): null;
    return a;
}, [])
console.log(newNumbers2); // [1 ,2, 2, 3, 4 ,4]



// insight in maartje's work example
let monday = [
    {
        name: 'Write a summary HTML/CSS',
        duration: 180
        },
    {
        name: 'Some web development',
        duration: 120
        },
    {
        name: 'Try to convince teachers to fix homework class10',
        duration: 30
        },
    {
        name: 'Fix homework for class10 myself',
        duration: 20
        },
    {
        name: 'Talk to a lot of people',
        duration: 200
        }
    ];

let tuesday = [
    {
        name: 'Keep writing summery',
        duration: 240
        },
    {
        name: 'Some more web development',
        duration: 180
        },
    {
        name: 'Staring out the window', // the coolest task ever!!
        duration: 10
        },
    {
        name: 'Talk to a lot of people',
        duration: 200
        },
    {
        name: 'Look at application assignments new students',
        duration: 40
        }
    ];


let tasks = [monday, tuesday];

let hoursNum = tasks.map((i) => i.map((a) => a.duration /= 60).filter((a) => a > 2))
    .map((a) => a.reduce(((a, b) => a += b), 0))
    .reduce(((a, b) => a += b), 0);

let loon = (hoursNum * 20).toFixed(2);

console.log("Maartje would make in these two days: " + loon + "€.")







