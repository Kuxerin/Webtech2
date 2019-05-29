import ShutterConstants from '../constants/shutterConstants'
import ShutterDispatcher from '../dispatchers/shutterDispatcher'

class ShutterActions {

    refreshShutterColors() {
        ShutterDispatcher.handleViewAction({
            actionType : ShutterConstants.REFRESH_SHUTTER_COLORS
        });
    }

    refreshShutterMats(){
        ShutterDispatcher.handleViewAction({
            actionType : ShutterConstants.REFRESH_SHUTTER_MATS
        });
    }
}

export default new ShutterActions();
