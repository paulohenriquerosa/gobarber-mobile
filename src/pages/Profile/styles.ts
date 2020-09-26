import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0px 40px 100px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 16px 0;
`;

export const BackButton = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const PowerButton = styled.TouchableOpacity``;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-bottom: 32px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 93px;
  align-self: center;
`;
