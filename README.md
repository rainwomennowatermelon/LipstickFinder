# LipstickFinder
In this project we built a mobile application, Lipstick Finder, to recognize the lipstick from images, do lip digital makeup and recommend lipsticks to users.

The lipstick recognition module incorporates a novel lipstick RGB color calculation algorithm (RMBD) and a close-to-real-world lipstick color database. The quantitative evaluation result shows that our approach has a plausible recognition accuracy.

The lip makeup module overlays target lipstick color on the profile image in the HSV color space. The makeup algorithm is capable to synthesize convincing lip makeup images.

To recommend personalized lipsticks, the recommendation module conducts database filtering mainly for new users based on users’ preferences towards lipsticks, and collaborative filtering for existing users based on users’ interactions with lipsticks.

Lipstick Finder is constructed to support aforementioned modules using React Native framework, wishing to provide an intelligent lipstick assistant for everyone.

For more details, please visit [the website of Lipstick Finder](https://i.cs.hku.hk/~msp19019/).

## Environment
React Native `0.63.2`

Pytorch `1.5.0`

MongoDB server `4.2.8`

Flask `1.1.2`

## Installation
1. Download 
You can download the Zip or Clone the project from git with this command 
```sh
git clone https://github.com/rainwomennowatermelon/LipstickFinder.git
```
2. Install package form npm
```sh
npm install
```
3. Permission settings
```sh
cd android 
chmod +x gradlew
```
4. Run
```sh
npx react-native run-android
```
