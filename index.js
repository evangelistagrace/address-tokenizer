const Address = require('./Address'),
    prompt = require('prompt')

    const properties = [
        {
            name: 'freeform_address',
            validator: /(.*[a-z]){3}/,
            warning: 'Please enter at least 3 characters'
        }
    ];
    
    prompt.start();
    
    prompt.get(properties, function (err, result) {
        if (err) { return onErr(err); }
        console.log('Command-line input received:');
        console.log('  Freeform address: ' + result.freeform_address);
        let address = new Address(result.freeform_address)
        console.log('  Tokenized address: ', address.getTokenized())
    });
    
    function onErr(err) {
        console.log(err);
        return 1;
    }


//sample input
// let address = new Address('No 11, Jalan abc, Chendering, 21080 Kuala Terengganu, Terengganu.')
// console.log(address.getTokenized())

// tests
//1. deviant apt no
// let address = new Address('No, 11, Jalan abc, Chendering, 21080 Kuala Terengganu, Terengganu.')
// console.log(address.getTokenized())
//2. missing apt no
// let address = new Address('Jalan abc, Chendering, 21080 Kuala Terengganu, Terengganu.')
// console.log(address.getTokenized())
//3. deviant street
// let address = new Address('No 11,Jalann abc, Chendering, 21080 Kuala Terengganu, Terengganu.')
// console.log(address.getTokenized())
//4. missing street 
// let address = new Address('No 11, Chendering, 21080 Kuala Terengganu, Terengganu.')
// console.log(address.getTokenized())
//5. deviant postcode
// let address = new Address('No 11, Jalan abc, Chendering, 021080 Kuala Terengganu, Terengganu.')
// console.log(address.getTokenized())
//6. missing postcode
// let address = new Address('No 11, Jalan abc, Chendering, Kuala Terengganu, Terengganu.')
// console.log(address.getTokenized())
//7. deviant city
// let address = new Address('No 11, Jalan abc, Chendering, 21080 Kuala , Terengganu.')
// console.log(address.getTokenized())
//8. missing city
// let address = new Address('No 11, Jalan abc, Chendering, 21080, Terengganu.')
// console.log(address.getTokenized())
//9. deviant state
// let address = new Address('No 11, Jalan abc, Chendering, 21080 Kuala Terengganu, Terenggan.')
// console.log(address.getTokenized())
//10. missing state
// let address = new Address('No 11, Jalan abc, Chendering, 21080 Kuala Terengganu')
// console.log(address.getTokenized())
