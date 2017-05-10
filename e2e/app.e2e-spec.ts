import { VideoPokerPage } from './app.po';

describe('video-poker App', () => {
  let page: VideoPokerPage;

  beforeEach(() => {
    page = new VideoPokerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
