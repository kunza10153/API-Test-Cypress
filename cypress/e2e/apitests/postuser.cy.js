describe('post user request', () => {
    let accresstoken = '726a5beff7d17f92de18bdcbba6c4e1a893b9666bdf007d8e73ca0b1d15d0fab';
    let randomtext = ''
    let testemail = ''
    
    it('create user test', () => {
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 10; i++)
            randomtext += pattern.charAt(Math.floor(Math.random() * pattern.length));
        testemail = randomtext + '@gmail.com';

        cy.fixture('createuser').then((payload) => {
            // Create user (POST)
            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/users',
                headers: {
                    'Authorization': 'Bearer ' + accresstoken
                },
                body: {
                    "name": payload.name,
                    "email": testemail,
                    "gender": payload.gender,
                    "status": payload.status
                },
                failOnStatusCode: false
            }).then((res) => {
                cy.log(JSON.stringify(res.body));
                expect(res.status).to.eq(201);
                expect(res.body).has.property('name', payload.name);
                expect(res.body).has.property('email', testemail);
                expect(res.body).has.property('gender', payload.gender);
                expect(res.body).has.property('status', payload.status);
                
                // Check if res.body and res.body.id exist
                if (res.body && res.body.id) {
                    const userid = res.body.id;
                    cy.log('user id is: ' + userid);
                    
                    // Get user (GET)
                    cy.request({
                        method: 'GET',
                        url: 'https://gorest.co.in/public/v2/users/' + userid,
                        headers: {
                            'Authorization': 'Bearer ' + accresstoken
                        },
                        failOnStatusCode: false
                    }).then((res) => {
                        expect(res.status).to.eq(200);
                        expect(res.body).has.property('id', userid);
                        expect(res.body).has.property('name', payload.name);
                        expect(res.body).has.property('email', testemail);
                        expect(res.body).has.property('gender', payload.gender);
                        expect(res.body).has.property('status', payload.status);
                    });
                } else {
                    throw new Error("User ID not found in response");
                }
            });
        });
    });
});
