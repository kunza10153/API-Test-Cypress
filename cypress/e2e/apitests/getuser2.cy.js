describe('get api user tests', () => {
    let accresstoken = '726a5beff7d17f92de18bdcbba6c4e1a893b9666bdf007d8e73ca0b1d15d0fab';

    it('get users some id', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/',
            headers: {
                'Authorization': 'Bearer ' + accresstoken
            }
        }).then((res) => {
            const id = res.body[0].id;
            return id;
        }).then((id) => {
            // request first id
            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v2/users/' + id,
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('id', id);
            });
        });
    });

    it.only('get users all gender', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'Authorization': 'Bearer ' + accresstoken
            }
        }).then((resp) => {
            const users = resp.body;
            return users;
        }).then((users) => {
            for (let i = 0; i < users.length; i++) {
                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v2/users/' + users[i].id,
                    headers: {
                        'Authorization': 'Bearer ' + accresstoken
                    }
                }).then((resp) => {
                    expect(resp.status).to.eq(200);
                    expect(resp.body).to.have.property('gender', users[i].gender);
                });
            }
        });
    });
    
});
