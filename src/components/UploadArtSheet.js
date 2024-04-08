import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Button from './Button';
import { COLORS, FONTS, RADIUS } from '../constants';
import Icon from '../core/Icon';
import { launchImageLibrary } from 'react-native-image-picker';

const UploadArtSheet = ({ setUploadArt, setSelectedImage, setuploadImage, selectedImage }) => {
    const hideSheet = () => {
        setUploadArt(false)
    }

    const pickImageFromGallery = () => {

        let options = {
            title: 'Select Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else {
                setSelectedImage(response.assets[0].uri);
                setuploadImage({
                    uri: response.assets[0].uri,
                    name: `${Date.now().toString()}-${response.assets[0].fileName}`,
                    type: response.assets[0].type,
                });
            }
        });
    };

    return (
        <>
            <Text
                style={{
                    color: COLORS.secondary,
                    fontSize: 16,
                    fontFamily: FONTS.regular,
                    marginBottom: 25,
                }}>
                By uploading your artwork you agree to our image upload terms and acknowledge that you have full legal rights to use the images you upload.
            </Text>
            <Text
                style={{
                    color: COLORS.secondary,
                    fontSize: 16,
                    fontFamily: FONTS.regular,
                    marginBottom: 25,
                }}>
                Recommended file formats:
                SVG, PNG, JPG, TIFF, GIF, PDF, EPS
            </Text>
            <Text
                style={{
                    color: COLORS.secondary,
                    fontSize: 16,
                    fontFamily: FONTS.regular,
                    marginBottom: 25,
                }}>
                Maximum upload file size
                25 MB
            </Text>
            <Text
                style={{
                    color: COLORS.secondary,
                    fontSize: 16,
                    fontFamily: FONTS.regular,
                    fontWeight: '800',
                    marginBottom: 10,
                }}>
                Upload Photo
            </Text>

            <View style={{ marginBottom: 25, alignItems: 'center', paddingVertical: 25, borderStyle: 'dashed', borderRadius: RADIUS, borderColor: COLORS.green, borderWidth: 1 }}>
                {
                    selectedImage ?
                        <>
                            <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                        </>

                        :
                        <TouchableOpacity onPress={() => pickImageFromGallery()} style={{ marginBottom: 10, width: 45, height: 45, backgroundColor: COLORS.green, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon
                                name={'cloud-upload-outline'}
                                iconFamily={'Ionicons'}
                                size={25}
                                color={COLORS.white}
                            />
                        </TouchableOpacity>
                }
                <Text onPress={() => pickImageFromGallery()} style={{ fontSize: 16, fontWeight: '600', color: COLORS.gryLight, marginTop: 10 }}>
                    {
                        selectedImage ?
                            "Re upload file? click here"
                            :
                            "Choose file to upload"
                    }
                </Text>
                <Text style={{ fontSize: 14, color: COLORS.gryLight }}>Supported formats : Jpeg, png</Text>
            </View>

            <Button
                text="Done"
                type="primary"
                onPressFunc={hideSheet}
            />
        </>
    );
};

export default UploadArtSheet;
