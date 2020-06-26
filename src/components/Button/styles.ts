import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background-color: #ff9000;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 10px;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
  font-size: 14px;
  line-height: 18px;
`;
