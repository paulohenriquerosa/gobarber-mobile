import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  background-color: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 16px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
export const Icon = styled(Feather)`
  margin-right: 16px;
`;
