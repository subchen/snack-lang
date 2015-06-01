module.exports = {
    string: require('snack-string'),
    object: require('./object/'),
    array: require('./array/'),
    number: require('./number/'),
    date: require('./date/'),
    regexp: require('./regexp/'),
    func: {
        noop: require('./function/noop')
    }
};
