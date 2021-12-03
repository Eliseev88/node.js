const colors = require("colors/safe");
const proccesVar = process.argv.slice(2);

function getSimpleIntegers(arr) {
    const [from, to] = arr;
    const result = [];
    let color = 'green';

    if (isNaN(from) || isNaN(to)) throw new Error('Wrong input type!');
    
    firstStep:
    for (let i = from; i <= to; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j === 0) continue firstStep;
        }
        result.push(i)
        console.log(colors[color](i))
        if (color === 'green') color = 'yellow';
        else if (color === 'yellow') color = 'red';
        else color = 'green';
    }
    
    if (!result.length) return console.log(colors.red('Empty'))
}

getSimpleIntegers(proccesVar);