export default function(oxg, temp) {
    let risk

    risk = ((oxg < 91) && (temp > 37.8))
    return risk
}