describe('intercept cypress', () => {
    it('test api interception', () => {
        cy.visit('https://jsonplaceholder.typicode.com/');
        
        cy.intercept({
            path: '/posts'
        }).as('posts')

        cy.get("table:nth-of-type(1) a[href='/posts']").click();
        cy.wait('@posts').then(inter=>{
            cy.log(JSON.stringify(inter))
            console.log(JSON.stringify(inter))
            expect(inter.response.body).to.have.lenght(100)
        })
    });


    it.only('mocking intercept test static response', () => {
        cy.visit('https://jsonplaceholder.typicode.com/');
        cy.intercept('GET','/posts',{totalpost:5 ,name:'test'}).as('posts') //static
        cy.get("table:nth-of-type(1) a[href='/posts']").click();
        cy.wait('@posts')
    });

    it.skip('mocking intercept test dynamic fixture ', () => {
        cy.visit('https://jsonplaceholder.typicode.com/');
        cy.intercept('GET','/posts',{fixture:'createuser.json'}).as('posts') //static
        cy.get("table:nth-of-type(1) a[href='/posts']").click();
        cy.wait('@posts')
    });
});