import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Keyboard,
    ImageBackground,
} from 'react-native';
import Button from '../../../components/Button';
import { GlobalStyle, Color, Window, Font } from '../../../globalStyle/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import { LogoIcon, LogoSvg } from '../../../assets/svgs/Logo';
import TextField2 from '../../../components/TextFeild2';
import { handleCreateAccessToken } from '../../../apis/auth';
import { SEND_PASSWORD_RESET_EMAIL } from '../../../graphql/mutations/Auth';
import { useMutation } from '@apollo/client';
import AppBar from '../../../components/AppBar';

const ForgetPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const [sendPasswordResetEmail, { loading, error, data }] = useMutation(
        SEND_PASSWORD_RESET_EMAIL
    );

    const handleSubmit = async () => {

        Keyboard.dismiss();

        if (email === '') {
            showMessage({
                message: "Email can't be blank",
                type: 'danger',
            });
            return;
        }


        try {
            const result = await sendPasswordResetEmail({
                variables: {
                    email: email,
                },
            });

            // Handle the result here (data, errors, etc.)
            console.log('Password Reset Email Result:', result);
        } catch (error) {
            console.error('Mutation error:', error);
        }

    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#021851' }}>
            <StatusBar backgroundColor={Color.tertiary} barStyle={'light-content'} />
            <ScrollView
                contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
                keyboardShouldPersistTaps="handled"
            >

                <ImageBackground
                    style={{ ...GlobalStyle.Container, backgroundColor: '#021851', paddingVertical: Window.fixPadding * 2 }}
                    source={require('../../../assets/images/pics/auth.bg.png')}>
                    <AppBar
                    />
                    <View style={{ alignItems: 'center', marginTop: Window.height / 15 }}>
                        <LogoSvg />
                    </View>
                    <Text
                        style={{
                            ...GlobalStyle.heading,
                            color: Color.white,
                            marginTop: Window.fixPadding * 4,
                            marginBottom: Window.fixPadding * 1.5,
                        }}>
                        Forget Password
                    </Text>

                    <TextField2
                        icon={'email-outline'}
                        label="Email"
                        isDark={true}
                        onChanged={setEmail}
                        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                    />

                    <View style={{ marginVertical: Window.fixPadding }}>
                        <Button
                            text="Forget Password"
                            isIcon={false}
                            theme="white"
                            loading={loading}
                            onPressFunc={handleSubmit}
                        />
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView >
    );
};

export default ForgetPassword;
