function currentDate() {
    const str = (new Date()).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
    return str
}

module.exports = currentDate;