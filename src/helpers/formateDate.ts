
export const formateDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0")
    const day = String(date.getUTCDate() + 1).padStart(2, "0")
    return `${year}-${month}-${day}`

}