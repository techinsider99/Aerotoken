/* eslint-disable prettier/prettier */
import Sound from 'react-native-sound';

Sound.setCategory('Ambient', true);

const buttonPress = new Sound('click.mp3', Sound.MAIN_BUNDLE, err => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Duration: '+ buttonPress.getDuration() + ' Channels: '+ buttonPress.getNumberOfChannels())
    }
});

export const playButtonPress = () => {

    buttonPress.play((success) => {
        if (success) {
            console.log('Success');
            buttonPress.reset();
        } else {
            console.log('Error')
        }
    });
};


