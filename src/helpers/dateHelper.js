
const checkDateBefore = (date) => {
    const dateBefore = new Date(date)
    const today = new Date()
    return dateBefore < today
}

const checkDateBeforeDate = (dateBefore, dateAfter) => {
    const before = new Date(dateBefore)
    const after = new Date(dateAfter)
    return before < after
}

module.exports = {
    checkDateBefore,
    checkDateBeforeDate
};
