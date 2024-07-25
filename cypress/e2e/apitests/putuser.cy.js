describe('post user request', () => {
    let accresstoken = '726a5beff7d17f92de18bdcbba6c4e1a893b9666bdf007d8e73ca0b1d15d0fab';
    let randomtext = ''
    let testemail = ''
    
    it('create user test', () => {
            // create user (POST)
            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/users',
                headers: {
                    'Authorization': 'Bearer ' + accresstoken
                },
                body: {
                    "name": "testest",
                    "email": "testtest@testtest.com",
                    "gender": "male",
                    "status": "active"
                },
                failOnStatusCode: false
            }).then((res) => {
                cy.log(JSON.stringify(res.body));
                expect(res.status).to.eq(201);
                expect(res.body).has.property('name', 'testest');
                expect(res.body).has.property('email', 'testtest@testtest.com');
                expect(res.body).has.property('gender', "male");
                expect(res.body).has.property('status', 'active');
                
                // Check if res.body and res.body.id exist
                if (res.body && res.body.id) {
                    const userid = res.body.id;
                    cy.log('user id is: ' + userid);
                    
                    // update user (GET)
                    cy.request({
                        method: 'PUT',
                        url: 'https://gorest.co.in/public/v2/users/' + userid,
                        headers: {
                            'Authorization': 'Bearer ' + accresstoken
                        },
                        body:{
                            "name": "testest update",
                            "email": "testtestupdate@testtest.com",
                            "gender": "male",
                            "status": "active"
                        },
                        failOnStatusCode: false
                    }).then((res) => {
                        expect(res.status).to.eq(200);
                        expect(res.body).has.property('id', userid);
                        expect(res.body).has.property('name', 'testest update');
                        expect(res.body).has.property('email', 'testtestupdate@testtest.com');
                        expect(res.body).has.property('gender', 'male');
                        expect(res.body).has.property('status', 'active');
                    });
                } else {
                    throw new Error("User ID not found in response");
                }
            });
        });
    });

