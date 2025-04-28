export function isValidCity(city) {
    return typeof city === 'string' && city.trim().length > 0;
}
