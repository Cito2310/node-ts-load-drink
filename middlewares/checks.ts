export const checkSizeUnit = ( size: string ) => {
    const unitToSize = size.match(/[a-zA-Z]+/gi)

    // check unit exist
    if (unitToSize === null) {return false}

    // check multiple units exist
    if (unitToSize.length !== 1) {return false}

    // check valid units
    const validUnits = [ "ml", "l", "oz", "cc" ]
    if (!validUnits.includes(unitToSize[0])) {return false}

    
    return true
}