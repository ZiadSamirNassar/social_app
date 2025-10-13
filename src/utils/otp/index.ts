
export const generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();//6 digits
}

export const generateOtpExpiry = (minutes: number): Date => {
    return new Date(Date.now() + 1000 * 60 * minutes);
}
