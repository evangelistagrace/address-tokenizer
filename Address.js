function Address(freeformText) {
    let tokenized = {}

    // public methods
    this.getFreeform = () => {
        return freeformText
    }

    this.getTokenized = () => {
        tokenized = mergeObjects()
        return tokenized
    }

    // private methods
    let mergeObjects = () => {
        let text = freeformText
        let separatedByComma = separateByComma(text),
                arr = []
    
        if (separatedByComma.length >=0) {
            separatedByComma.forEach(val => {
                let aptNum = checkAptNo(val),
                        city = checkCity(val),
                        state = checkState(val),
                        postcode = checkPostcode(val),
                        street = checkStreet(val)
                        
                if (aptNum !== null) {
                    arr.push({'apt': aptNum})
                }
                
                else if (postcode !==null && city !== null) {
                    arr.push({'postcode': postcode})
                    arr.push({'city': city})
                }
                
                else if (postcode !== null) {
                    arr.push({'postcode': postcode})
                }
                
                else if (city !== null) {
                    arr.push({'city': city})
                }
                
                else if (state !== null) {
                    arr.push({'state': state})
                }
                
                else if (street !== null) {
                    arr.push({'street': street})
                }
                
                else {
                    arr.push({'section': val.replace(/,|\./g, '').trim()})
                }
            })
        }
        
        let res = arr.reduce(function(result, currentObject) {
        for(var key in currentObject) {
            if (currentObject.hasOwnProperty(key)) {
                result[key] = currentObject[key]
            }
        }
        return result
    }, {});
        
        return res
    }

    let separateByComma = (text) => {
        let regex = /([^,]+)/g
        let res = text.match(regex)
      
        res.forEach(match => {
          match = match.trim().split('.').join('')
        })
      
        return res;
      }

    let checkAptNo = (text) => {
        let regex = /^\s*No\s[0-9]+/g
        let match = text.match(regex)
        
        if (match) return match[0].replace(/,|\./g, '').trim()
        else return null
    }

    let checkCity = (text) => {
        let regex = /(\W|\s)*(Kuala Terengganu|Kuala Lumpur|Kajang|Bangi|Damansara|Petaling Jaya|Puchong|Subang Jaya|Cyberjaya|Putrajaya|Mantin|Kuching|Seremban)(\W|\s)*/g
        let match = text.match(regex)
        
        if (match) return match[0].replace(/,|\./g, '').trim()
        else return null
    }

    let checkState = (text) => {
        let regex = /(\W|\s)*(Selangor|Terengganu|Pahang|Kelantan|Melaka|Pulau Pinang|Kedah|Johor|Perlis|Sabah|Sarawak)(\W|\s)*/g
        let match = text.match(regex)
        
        if (match) return match[0].replace(/,|\./g, '').trim()
        else return null
    }

    let checkPostcode = (text) => {
        let regex = /\b\d{5}\b/g
        let match = text.match(regex)
        
        if (match) {
            // return match[0]
            if (!(/^0/).test(match[0]) && parseInt(match[0]) >=1000 && parseInt(match[0]) <= 9999) {
                    //add leading 0
                    return '0' + match[0]
                }
                return match[0]
        } else {
            return null
        }
    }

    let checkStreet = (text) => {
        let regex = /^\s*(Jalan|Jln|Lorong|Persiaran)\s([a-zA-Z]|[0-9])*/g
        let match = text.match(regex)
        
        if (match) return match[0].replace(/,|\./g, '').trim()
        else return null
    }
}

module.exports = Address