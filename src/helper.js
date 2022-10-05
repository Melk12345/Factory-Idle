function format(amount) {
    let power = Math.floor(Math.log10(Math.floor(amount)));
    let mantissa = amount/Math.pow(10, power);
    if (power < 6) return formatWithCommas(amount.toFixed(2));
    else return mantissa.toFixed(2) + "e" + power;
}

function formatWithCommas(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}