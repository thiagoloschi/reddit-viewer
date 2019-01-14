import styled from 'styled-components';

export const FilterSection = styled.section`
  display: flex;
  align-items: center;
`;

export const Heading = styled.h1`
  margin: 0 0 1rem;
`;

export const NavigationBar = styled.nav`
  position: fixed;
  width: 100%;
  padding: 1.5rem 2rem;
  background-color: #333;
  color: white;
`;

export const Viewport = styled.section`
  display: flex;
  justify-content: space-around;
`;

export const ViewFrame = styled.iframe`
  width: 60%;
  height: 85vh;
  margin-top: 8.5rem;
  border: 1px solid #333;
  border-radius: 0.25rem;
`;
