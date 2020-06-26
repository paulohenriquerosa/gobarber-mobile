import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0px 40px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  margin-top: 64px;
  margin-bottom: 24px;
  font-family: 'RobotoSlab-Medium';
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackButtonText = styled.Text`
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
  font-size: 14px;
`;
