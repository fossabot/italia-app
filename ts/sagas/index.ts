/**
 * The root saga that forks and includes all the other sagas.
 */

import { networkEventsListenerSaga } from "react-native-offline";
import { all, Effect, fork } from "redux-saga/effects";

import deeplinkSaga from "./deeplink";
import mainSaga from "./main";
import messagesSaga from "./messages";
import notificationsSaga from "./notifications";
import onboardingSaga from "./onboarding";
import pinLoginSaga from "./pinlogin";
import profileSaga from "./profile";
import sessionSaga from "./session";
import walletSaga from "./wallet";

// Parameters used by the withNetworkConnectivity HOC of react-native-offline.
// We use `withRedux: true` to store the network status in the redux store.
// More info at https://github.com/rauliyohmc/react-native-offline#withnetworkconnectivity
const connectionMonitorParameters = {
  withRedux: true,
  timeout: 5000,
  pingServerUrl: "https://google.com",
  withExtraHeadRequest: true,
  checkConnectionInterval: 2500
};

export default function* root(): Iterator<Effect> {
  yield all([
    fork(deeplinkSaga),
    fork(mainSaga),
    fork(messagesSaga),
    fork(networkEventsListenerSaga, connectionMonitorParameters),
    fork(notificationsSaga),
    fork(onboardingSaga),
    fork(pinLoginSaga),
    fork(profileSaga),
    fork(sessionSaga),
    fork(walletSaga)
  ]);
}
