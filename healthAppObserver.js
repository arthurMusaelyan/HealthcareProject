// healthAppObserver.js
const { Observer } = require('./observer.js');

class HealthAppObserver extends Observer {
    update(activity) {
        console.log(`Health App Observer: New activity logged - ${activity.name}`);

    }
}

module.exports = { HealthAppObserver };