describe('post user request', () => {
    let accresstoken = '726a5beff7d17f92de18bdcbba6c4e1a893b9666bdf007d8e73ca0b1d15d0fab';
    let randomtext = '';
    let testemail = '';
    
    it('create user test', () => {
        // create user (POST)
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'Authorization': 'Bearer ' + accresstoken
            },
            body: {
                "name": "delete789",
                "email": "delate789@sdfdf.example",
                "gender": "male",
                "status": "active"
            },
            failOnStatusCode: false
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(201);
            expect(res.body).to.have.property('name').and.to.equal('delete789'.trim());
            expect(res.body).to.have.property('email').and.to.equal('delate789@sdfdf.example');
            
            // Check if res.body and res.body.id exist
            if (res.body && res.body.id) {
                const userid = res.body.id;
                cy.log('user id is: ' + userid);
                
                // delete user (DELETE)
                cy.request({
                    method: 'DELETE',
                    url: 'https://gorest.co.in/public/v2/users/' + userid,
                    headers: {
                        'Authorization': 'Bearer ' + accresstoken
                    },
                    failOnStatusCode: false
                }).then((res) => {
                    expect(res.status).to.eq(204);
                });
            } else {
                throw new Error("User ID not found in response");
            }
        });
    });
});
