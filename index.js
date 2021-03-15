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