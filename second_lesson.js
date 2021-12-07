const EventEmitter = require('events');
const proccesVar = process.argv.slice(2);


class MyEmitter extends EventEmitter {};
class Timer {
    constructor(date, index) {
        const year = date[3];
        const month = date[2] - 1;
        const day = date[1];
        const hour = date[0];

        this.index = index;
        this.date = new Date(year, month, day, hour)
    }

    activate() {
        emitterObject.emit('start', this);
    }
}
class Factory {
    static createTimer(arrayOfDates) {
        return arrayOfDates.map((el, i) => new Timer(el.split('-'), ++i));
    }
}
class Handler {
    static start(timer) {
        console.log(`Timer № ${timer.index} has started`);
        const interval = setInterval(() => {
            const timeToFinish = new Date(timer.date.getTime() - Date.now())

            const year = timeToFinish.getFullYear() - 1970;
            const month = timeToFinish.getMonth();
            const day = timeToFinish.getDate() - 1;
            const hour = timeToFinish.getHours() - 3;
            const minute = timeToFinish.getMinutes();
            const second = timeToFinish.getSeconds();

            if(year == -1 || month == -1 || day == -1 || hour == -1) {
                clearInterval(interval)
                return emitterObject.emit('stop', timer)
            }
            console.log(`Timer № ${timer.index}: ${year}-${month}-${day}-${hour}:${minute}:${second}`)
        }, 1000)
    }

    static stop(timer) {
        console.log(`Timer № ${timer.index} has finished`);
    }
}

const emitterObject = new MyEmitter();
const arrayOfTimers = Factory.createTimer(proccesVar)

emitterObject.on('start', Handler.start);

emitterObject.on('stop', Handler.stop);

arrayOfTimers.forEach(element => {
    element.activate()
});
