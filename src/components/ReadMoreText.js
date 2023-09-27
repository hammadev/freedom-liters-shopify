import * as React from 'react';
import {
    Text, View
} from 'react-native';

const ReadMoreText = ({ readMoreStyle, text, textStyle }) => {
    const [showMoreButton, setShowMoreButton] = React.useState(false);
    const [textShown, setTextShown] = React.useState(false);
    const [numLines, setNumLines] = React.useState(undefined);

    const toggleTextShown = () => {
        setTextShown(!textShown);
    };

    React.useEffect(() => {
        setNumLines(textShown ? undefined : 2);
    }, [textShown]);

    const onTextLayout = React.useCallback(
        (e) => {
            console.log(e.nativeEvent.lines.length);
            if (e.nativeEvent.lines.length > 2 && !textShown) {
                setShowMoreButton(true);
                setNumLines(2);
            }
        },
        [textShown],
    );

    return (
        <View style={{ flexDirection: 'column' }}>
            <Text onTextLayout={onTextLayout} numberOfLines={numLines} style={textStyle} ellipsizeMode="tail">
                {text}
            </Text>

            {showMoreButton ? (
                <Text onPress={toggleTextShown} style={readMoreStyle}>
                    {textShown ? 'Read Less' : 'Read More'}
                </Text>
            ) : null}
        </View>
    );
};

export default ReadMoreText;