import { getVideoId } from './YoutubeUtils';

it('test video url', () => {
  expect(getVideoId('https://www.youtube.com/watch?v=giTxCWlJ8RE')).toBe('giTxCWlJ8RE');
});
