export function validPassword(
    password,
    confirmPassword,
    setValidLowerCase,
    setValidUpperCase,
    setValidSpecialCharacter,
    setValidNumber,
    setValidLength,
    setMatchPassword
) {
    setValidLowerCase(/[a-z]/.test(password) ? true : false);
    setValidUpperCase(/[A-Z]/.test(password) ? true : false);
    setValidSpecialCharacter(/[!@#$%^&*]/.test(password) ? true : false);
    setValidNumber(/[0-9]/.test(password) ? true : false);
    setValidLength(password.length >= 8 ? true : false);
    setMatchPassword(password === confirmPassword ? true : false);
}

export function MatchPassword(password, confirmPassword, setMatchPassword) {
    setMatchPassword(password === confirmPassword ? true : false);
}