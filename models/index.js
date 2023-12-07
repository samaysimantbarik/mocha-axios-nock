import { faker } from '@faker-js/faker';

export const getRegisterUserPayload =(
    {
    email= faker.internet.exampleEmail(),
    ashramfcnum = faker.number.int(5),
    line1 = faker.location.streetAddress(),
    line2 = faker.location.secondaryAddress(),
    suburb = faker.location.city(),
    postcode = faker.location.zipCode(),
    state = faker.location.state({countryCode: 'AU'}),
    password,
    phone = faker.phone.number('+6140#######'),
    country,
    name = faker.person.firstName(),
    memberType
}
)=>{



    return {
        email,
        ashramfcnum,
        address: {
            line1,
            line2,
            suburb,
            postcode,
            state
        },
        password,
        terms: true,
        phone,
        country,
        name,
        memberType,
        ritwik: {
            "firstName": "JARINDRA NATH",
            "lastName": "MOHANTY",
            "address": "",
            "fullName": "JARINDRA NATH MOHANTY",
            "saID": "SPR5160"
        }
    }
}