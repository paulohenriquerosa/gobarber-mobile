import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: Record<string, unknown>;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, containerStyle = {}, icon, ...rest },
  ref,
) => {
  const { registerField, fieldName, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const hanldeInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);
  const hanldeInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(refe: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [registerField, fieldName]);

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        onFocus={hanldeInputFocused}
        onBlur={hanldeInputBlur}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
        placeholderTextColor="#666360"
      />
    </Container>
  );
};

export default forwardRef(Input);
