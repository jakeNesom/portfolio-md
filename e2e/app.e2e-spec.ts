import { RandomQuoteGenCLIPage } from './app.po';

describe('random-quote-gen-cli App', () => {
  let page: RandomQuoteGenCLIPage;

  beforeEach(() => {
    page = new RandomQuoteGenCLIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
