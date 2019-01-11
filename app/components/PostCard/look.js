import styled from 'styled-components';

export const Card = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: 0 0 1px 0 #ddd;
  max-width: 60%;
  color: #8b8b8b;
  font-family: 'helvetica';
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer noopener',
})`
  font-weight: 100;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const DarkLink = styled(Link)`
  color: #333;
  font-weight: bold;
`;

export const Thumbnail = styled.img`
  height: auto;
  margin-left: 1rem;
  border: 1px solid #000;
  border-radius: 4px;
`;

export const Title = styled.h1`
  font-size: 14px;
  font-weight: 500;
  color: black;
`;
