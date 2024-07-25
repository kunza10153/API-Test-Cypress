describe('get api user tests', () => {

    let accresstoken ='726a5beff7d17f92de18bdcbba6c4e1a893b9666bdf007d8e73ca0b1d15d0fab'

    it('get users id', () => {
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v2/users/7018213',
            headers : {
                'Authorization' :'Bearer' + accresstoken
            }

        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq('Kamla Marar')
        })
    });
});