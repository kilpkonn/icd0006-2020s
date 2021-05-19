
export default (timestamp: Date): string => {
    const time = new Date(timestamp)
    const mins = time.getMinutes() > 10 ? time.getMinutes().toString( ): `0${time.getMinutes()}`
    const days = time.getDay() > 10 ? time.getDay().toString( ): `0${time.getDay()}`
    const months = time.getMonth() > 10 ? time.getMonth().toString( ): `0${time.getMonth()}`
    if (localStorage.getItem('lang')?.toLowerCase()?.includes('ee')) {
        return `${time.getHours()}:${mins} ${days}.${months}.${time.getFullYear()}`
    }
    return `${time.getHours()}:${mins} ${months}/${days}/${time.getFullYear()}`
}
