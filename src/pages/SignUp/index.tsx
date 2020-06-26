import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Keyboard,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import ImgLogo from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, BackButton, BackButtonText } from './styles';

const SignUp: React.FC = () => {
  const [keyboardActived, setkeyboardActived] = useState(false);
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setkeyboardActived(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setkeyboardActived(false);
    });

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, [keyboardActived]);

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
            <Image source={ImgLogo} />
            <View>
              <Title>Faça seu cadastro</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="Email" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      {!keyboardActived && (
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackButtonText>Voltar para login</BackButtonText>
        </BackButton>
      )}
    </>
  );
};

export default SignUp;
