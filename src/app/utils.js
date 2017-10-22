export const formatTelephoneNumber = number => {
    number = number.toString();
    if (number.length < 4) {
        return number
    } else if (number.length < 7) {
        return number.replace(/(\d{3})(\d*)/, '$1-$2');
    } else {
        return number.replace(/(\d{3})(\d{3})(\d*)/, '$1-$2-$3');
    }
}

export const generateRandomUUID = () => {
    const time_id = (new Date).getTime().toString(36).substring(3);
    const length_needed = 10-time_id.length;
    const pad_chacters = Math.floor(Math.random()*123456789).toString(36).substring(0, length_needed);
    return `${time_id}${pad_chacters}`
}