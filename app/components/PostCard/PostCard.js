/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, Link, DarkLink, Thumbnail, Title } from './look';

function PostCard({ data }) {
  const {
    title,
    subreddit_name_prefixed,
    author,
    created_utc,
    permalink,
    thumbnail,
    thumbnail_width,
    url,
  } = data;
  const createdAt = moment.utc(created_utc * 1000).fromNow();
  const homePath = 'https://reddit.com';
  const subredditLink = `${homePath}/${subreddit_name_prefixed}`;
  const authorLink = `${homePath}/user/${author}`;
  const commentsLink = `${homePath}${permalink}`;
  const authorPath = `u/${author}`;
  const isThereAThumbnail = !(!thumbnail || thumbnail === 'default');

  return (
    <Card href={commentsLink}>
      <div>
        <p>
          <DarkLink href={subredditLink}>{subreddit_name_prefixed}</DarkLink> •
          Posted by
          <Link href={authorLink}> {authorPath} </Link>
          <Link href={commentsLink}>{createdAt}</Link>
        </p>
        <Title>{title}</Title>
      </div>
      {isThereAThumbnail && (
        <Link href={url} title={url}>
          <Thumbnail alt="thumbnail" src={thumbnail} width={thumbnail_width} />
        </Link>
      )}
    </Card>
  );
}

PostCard.propTypes = {
  data: PropTypes.object,
};

export default PostCard;
