const pause_ms = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${ms}ms Passed!`);
        }, ms);
    });
}

export default pause_ms;