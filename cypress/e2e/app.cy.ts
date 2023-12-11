describe('Carrot Auction', () => {
  beforeEach(() => {
    cy.viewport(1800, 1200);
    cy.visit('/');
  });

  it('[RENDER] 렌더링 테스트', () => {
    cy.findAllByText('Carrot Auction').should('exist');
  });

  it('[SUCCESS] 로그인 테스트', () => {
    cy.get(':nth-child(3) > a').click();
    cy.get('[data-testid="id-input"]').type('sun123123');
    cy.get('[data-testid="password-input"]').type('123123');
    cy.findByRole('button', { name: '로그인' }).click();
    cy.get('.swal2-confirm').click();
  });

  it('[SUCCESS] 글 쓰기 테스트', () => {
    cy.setToken();
    cy.getCookie('token').should('have.property', 'value', '1');

    cy.findByText('글 쓰기').click({ multiple: true });
    cy.wait(5000);

    const imagePath = '../fixtures/images/carrot.png';
    cy.get('label')
      .click({ multiple: true })
      .get('input[type="file"]')
      .attachFile({ filePath: imagePath });

    cy.get(
      '.PostProductInfo_postProductInfo__8S14h > :nth-child(1) > input',
    ).type('당근이');

    cy.get(':nth-child(2) > input').type('5000');

    cy.get('textarea').type('신선한 당근 급쳐합니다');

    cy.get('.CategorySelect_selectBox__FDZPd').click({ multiple: true });

    cy.get('.Options_options__BCRBr > :nth-child(5)').click({ multiple: true });
    // cy.screenshot();
    cy.findByRole('button', { name: '완료' }).click({ multiple: true });
  });

  it('[SUCCESS] 물건 보러가기 페이지 테스트', () => {
    cy.setToken();
    cy.get(':nth-child(1) > a').click({ multiple: true });
    cy.get('.DataSearch_input__TN7E2').type('탕후루', { force: true });
    cy.findByRole('button', { name: '검색' }).click({ force: true });
  });
});
