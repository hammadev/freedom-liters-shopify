import React, { useRef } from 'react';
import { Alert, Animated, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, CONTAINER_PADDING, FONTS, HEIGHT, WIDTH } from '../../../constants';
import Header from '../../../components/Header';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
import Icon from '../../../core/Icon';
import Button from '../../../components/Button';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import Logout from '../../../components/Logout';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import BottomSheetPopup from '../../../components/UploadArtSheet';
import UploadArtSheet from '../../../components/UploadArtSheet';
import AddTextSheet from '../../../components/AddTextSheet';
import AddArtSheet from '../../../components/AddArtSheet';
import { Window } from '../../../globalStyle/Theme';

const CustomDesign = ({ navigation }) => {
    const { auth } = useSelector(state => ({ ...state }));
    const [uploadArt, setUploadArt] = useState(false)
    const [textsheet, setTextSheet] = useState(false)
    const [addArtSheet, setAddArtSheet] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedText, setSelectedText] = useState(null)
    const [uploadImage, setuploadImage] = useState(null)
    const [pan, setPan] = useState(new Animated.ValueXY());

    console.log(selectedImage)

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false },
            ),
            onPanResponderRelease: () => {
                setPan(pan)  // Do nothing when the touch is released
            },
        })
    ).current;



    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar
                animated={true}
                backgroundColor={COLORS.white}
                barStyle={'dark-content'}
                showHideTransition={'fade'}
            />
            <Header label="Design Now" />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: CONTAINER_PADDING }}>
                <View style={{ width: '48%' }}>
                    <Button
                        type="alternate"
                        text="Save"
                    />
                </View>

                <View style={{ width: '48%' }}>
                    <Button
                        type="primary"
                        text="Next Step"
                        onPressFunc={() => {
                            if (selectedImage) {
                                navigation.navigate('CustomDesignQty', { selectedImage })
                            } else {
                                Alert.alert('Alert', 'Please customize design first')
                            }
                        }}
                    />
                </View>
            </View>

            <View style={{ position: "relative", width: '100%', height: "50%", marginTop: 100, alignItems: 'center' }}>
                <Image style={{ flex: 1 }}
                    source={require('../../../assets/images/images/sample_tshirt.png')}
                // style={{ width: Window.width }}
                />


                <View style={{ position: "absolute", width: "100%", height: "100%", alignItems: 'center', justifyContent: "center" }}>
                    {
                        selectedImage &&
                        /* <Text>here i am</Text> */
                        <Animated.Image
                            {...panResponder.panHandlers}
                            // source={require('../../../assets/images/images/artSample.png')}
                            source={{ uri: selectedImage }}
                            style={[
                                { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
                                { width: 100, height: 100 }
                            ]}
                        />
                    }

                    {
                        selectedText &&
                        <Animated.Text
                            // {...panResponder.panHandlers}
                            style={[
                                { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
                                { color: COLORS.black, marginTop: 10, fontSize: 20, fontFamily: FONTS.bold }
                            ]}
                        >
                            {selectedText}
                        </Animated.Text>

                    }
                </View>
            </View>

            <View style={{
                position: 'absolute',
                bottom: 0,
                height: 80,
                width: '100%',
                zIndex: 1000,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: CONTAINER_PADDING,
            }}>
                <TouchableOpacity onPress={() => setUploadArt(true)} style={{ alignItems: 'center' }}>
                    <Icon
                        name={'cloud-upload'}
                        iconFamily={'SimpleLineIcons'}
                        size={25}
                        color={COLORS.gryLight}
                    />
                    <Text style={styles.bottamBarText}>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTextSheet(true)} style={{ alignItems: 'center' }}>
                    <Icon
                        name={'text-color'}
                        iconFamily={'Foundation'}
                        size={25}
                        color={COLORS.gryLight}
                    />
                    <Text style={styles.bottamBarText}>Add Text</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAddArtSheet(true)} style={{ alignItems: 'center' }}>
                    <Icon
                        name={'magnifier-add'}
                        iconFamily={'SimpleLineIcons'}
                        size={25}
                        color={COLORS.gryLight}
                    />
                    <Text style={styles.bottamBarText}>Add Art</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <Icon
                        name={'save-outline'}
                        iconFamily={'Ionicons'}
                        size={25}
                        color={COLORS.gryLight}
                    />
                    <Text style={styles.bottamBarText}>SAVE</Text>
                </TouchableOpacity>
            </View>

            {/* UPLOAD IMAGE */}
            <BottomPopupHOC
                title="Upload Art"
                color={COLORS.black}
                PopupBody={<UploadArtSheet selectedImage={selectedImage} setUploadArt={setUploadArt} setSelectedImage={setSelectedImage} setuploadImage={setuploadImage} />}
                visible={uploadArt}
                setVisible={setUploadArt}
                setSelectedImage={setSelectedImage}
            />

            {/* ADDTEXT */}
            <BottomPopupHOC
                title="Add Text"
                color={COLORS.black}
                PopupBody={<AddTextSheet setTextSheet={setTextSheet} setSelectedText={setSelectedText} selectedText={selectedText} />}
                visible={textsheet}
                setVisible={setTextSheet}
            />

            {/* UPLOAD ART */}
            <BottomPopupHOC
                title="Add Art"
                color={COLORS.black}
                PopupBody={<AddArtSheet setAddArtSheet={setAddArtSheet} />}
                visible={addArtSheet}
                setVisible={setAddArtSheet}
            />


        </SafeAreaView>
    )
}

export default CustomDesign;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        position: 'relative',
    },
    bottamBarText: {
        color: COLORS.gryLight,
        marginTop: 3
    }
});
