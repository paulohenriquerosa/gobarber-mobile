import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import imagePicker from 'react-native-image-picker';

import api from '../../services/api';
import getValidationErros from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Header,
  BackButton,
  Title,
  PowerButton,
  UserAvatarButton,
  UserAvatar,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface SignUpFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const { user, signOut, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatória'),
            otherwise: Yup.string(),
          }),

          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Confirmação obrigatória'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('profile', formData);
        updateUser(response.data);
        navigation.navigate('Dashboard');

        Alert.alert('Cadastro Realizado');
      } catch (err) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    },
    [navigation, updateUser],
  );

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePowerOff = useCallback(() => {
    signOut();
  }, [signOut]);

  const handleUpdateAvatar = useCallback(() => {
    imagePicker.showImagePicker(
      {
        title: 'Escolher uma foto',
        takePhotoButtonTitle: 'Tirar uma foto',
        cancelButtonTitle: 'Cancelar',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Um erro ocorreu!');
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          uri: response.uri,
          name: `${user.id}.jpeg`,
        });

        api.patch('user/avatar', data).then(apiResponse => {
          updateUser(apiResponse.data);
        });
      },
    );
  }, [updateUser, user.id]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Header>
              <BackButton onPress={handleBack}>
                <Icon name="chevron-left" size={32} color="#999591" />
              </BackButton>

              <Title>Meu perfil</Title>

              <PowerButton onPress={handlePowerOff}>
                <Icon name="power" size={24} color="#999591" />
              </PowerButton>
            </Header>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <Form initialData={user} ref={formRef} onSubmit={handleSubmit}>
              <Input
                autoCorrect={false}
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="Email"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={oldPasswordInputRef}
                containerStyle={{ marginTop: 16 }}
                secureTextEntry
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
