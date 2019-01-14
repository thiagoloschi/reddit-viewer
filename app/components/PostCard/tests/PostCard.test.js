/* eslint-disable camelcase */
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { data } from 'utils/mockedPost.json';
import ScoreBar from 'components/ScoreBar';
import PostCard from '../index';
import { Wrapper, Card, Link, DarkLink, Thumbnail, Title } from '../look';

const defaultProps = {
  data,
};
const render = props => shallow(<PostCard {...defaultProps} {...props} />);

describe('<PostCard />', () => {
  const {
    title,
    subreddit_name_prefixed,
    author,
    created_utc,
    permalink,
    thumbnail,
    thumbnail_width,
    score,
    url,
  } = defaultProps;
  const createdAt = moment.utc(created_utc * 1000).fromNow();
  const homePath = 'https://reddit.com';
  const subredditLink = `${homePath}/${subreddit_name_prefixed}`;
  const authorLink = `${homePath}/user/${author}`;
  const commentsLink = `${homePath}${permalink}`;
  const authorPath = `u/${author}`;

  describe('when there is a valid thumbnail', () => {
    const withThumb = render({ data: { thumbnail: '123' } });

    it('should render correctlty with a thumbnail', () => {
      expect(
        withThumb.containsMatchingElement(
          <Wrapper>
            <ScoreBar score={score} />
            <Card href={commentsLink}>
              <section>
                <p>
                  <DarkLink href={subredditLink}>
                    {subreddit_name_prefixed}
                  </DarkLink>
                  {' • Posted by '}
                  <Link href={authorLink}> {authorPath} </Link>
                  <Link href={commentsLink}>{createdAt}</Link>
                </p>
                <Title>{title}</Title>
              </section>
              <Link href={url} title={url}>
                <Thumbnail
                  alt="thumbnail"
                  src={thumbnail}
                  width={thumbnail_width}
                />
              </Link>
            </Card>
          </Wrapper>,
        ),
      ).toBeTruthy();
    });
  });

  describe('when there is no valid thumbnail', () => {
    const withThumb = render({ data: { thumbnail: 'image' } });

    it('should render correctlty with no thumbnail', () => {
      expect(
        withThumb.containsMatchingElement(
          <Wrapper>
            <ScoreBar score={score} />
            <Card href={commentsLink}>
              <section>
                <p>
                  <DarkLink href={subredditLink}>
                    {subreddit_name_prefixed}
                  </DarkLink>
                  {' • Posted by '}
                  <Link href={authorLink}> {authorPath} </Link>
                  <Link href={commentsLink}>{createdAt}</Link>
                </p>
                <Title>{title}</Title>
              </section>
            </Card>
          </Wrapper>,
        ),
      ).toBeTruthy();
    });
  });
});
