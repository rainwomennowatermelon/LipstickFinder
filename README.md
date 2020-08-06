# Lipstick Finder
In this project we built a mobile application, Lipstick Finder, to recognize the lipstick from images, do lip digital makeup and recommend lipsticks to users.

The lipstick recognition module incorporates a novel lipstick RGB color calculation algorithm (RMBD) and a close-to-real-world lipstick color database. The quantitative evaluation result shows that our approach has a plausible recognition accuracy.

The lip makeup module overlays target lipstick color on the profile image in the HSV color space. The makeup algorithm is capable to synthesize convincing lip makeup images.

To recommend personalized lipsticks, the recommendation module conducts database filtering mainly for new users based on users’ preferences towards lipsticks, and collaborative filtering for existing users based on users’ interactions with lipsticks.

Lipstick Finder is constructed to support aforementioned modules using React Native framework, wishing to provide an intelligent lipstick assistant for everyone.

For more details, please visit [the website of Lipstick Finder](https://i.cs.hku.hk/~msp19019/). Backend repository: [LipstickFinder-Backend](https://github.com/rainwomennowatermelon/LipstickFinder-Backend). Project report: [Lipstick Finder: A Mobile Application for Lipstick Recognition, Makeup, and Recommendation.pdf](https://drive.google.com/file/d/1q-VDsfE68LNeNTS8KZzClKLqlieA2pn-/view?usp=sharing).

![Lipstick Reconition](https://github.com/rainwomennowatermelon/LipstickFinder/blob/master/images/demo-3.png?raw=true)
![Lip Makeup](https://github.com/rainwomennowatermelon/LipstickFinder/blob/master/images/demo-4.png?raw=true)
![Lipstick Recommendation](https://github.com/rainwomennowatermelon/LipstickFinder/blob/master/images/demo-2.png?raw=true)
![Account Management](https://github.com/rainwomennowatermelon/LipstickFinder/blob/master/images/demo-1.png?raw=true)

## Environment
React Native `0.63.2`

Pytorch `1.5.0`

MongoDB server `4.2.8`

Flask `1.1.2`

In order to run this project locally, we recommend you to install the environment according to the above version, and build a simulator of **Galaxy Nexus API 28 AVD with Android 9.0 x86_64 operation system**. 

## Installation

1. Download 

You can download the Zip or Clone the project from git with this command 
```sh
git clone https://github.com/rainwomennowatermelon/LipstickFinder.git
```
2. Install package form npm
```sh
npm install
npx pod-install
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

### Debug
If there is a `com.android.ddmlib.InstallException: INSTALL_FAILED_INSUFFICIENT_STORAGE` error when install, try to install a NDK `21.3.6528147` in `SDK Tools` for a bigger space.
