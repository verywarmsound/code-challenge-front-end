import styled from 'styled-components';
import MainImg from '../../utils/projectImg.jpg';


export const Content = styled.section`
  height: 100vh;
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 550px 150px;
  padding: 20px;
  background-image: url(${MainImg});
  background-size: cover;
`;

export const MapWrapper = styled.section`
  justify-items: center;
  grid-column-start: 2;
  padding: 20px;
  background-color: rgba(228, 255, 252, 0.3);
`;

export const ButtonWrapper = styled.section`
  padding: 20px;
  grid-column-start: 2;
  grid-row-start: 2;
  justify-content: center;
  background-color: rgba(228, 255, 252, 0.3);
`;
