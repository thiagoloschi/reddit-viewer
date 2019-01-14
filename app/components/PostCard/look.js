import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  width: 100%;
  margin: 0.5rem 0;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 0.25rem;

  &:hover {
    border: 1px solid;
  }
`;

export const Card = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer noopener',
})`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;
  background-color: #fff;
  color: #8b8b8b;
  border-bottom-right-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  font-family: 'helvetica';
  font-size: 12px;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer noopener',
})`
  font-weight: 400;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const DarkLink = styled(Link)`
  margin: 0.5rem 0;
  color: #000;
  font-weight: bold;
`;

export const Thumbnail = styled.img`
  height: auto;
  border: 1px solid #000;
  border-radius: 0.25rem;
`;

export const Title = styled.h1`
  padding-bottom: 22px;
  margin-right: 1rem;
  color: black;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
`;
