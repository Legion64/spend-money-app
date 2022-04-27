const moneyConvertor = (money: number) => {
    return money.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        unitDisplay: 'short',
        minimumFractionDigits: 0
    })
}

export {
    moneyConvertor
}