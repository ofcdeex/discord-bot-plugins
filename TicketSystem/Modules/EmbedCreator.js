function Create(etitle, ecolor, edescription) {
    return defaultBase = {
        color: `0x${ecolor}`,
        title: etitle,
        description: edescription
    };
}

module.exports = {
    Create
}