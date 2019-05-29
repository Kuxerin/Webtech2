import { Dispatcher } from 'flux'
import axios from "axios/index";
import ShutterConstants from '../constants/shutterConstants'
import ShutterStore from '../stores/shutterStore'

class ShutterDispatcher extends Dispatcher {

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    }
}

const dispatcher = new ShutterDispatcher();

dispatcher.register((data) => {
    if(data.action.actionType !== ShutterConstants.REFRESH_SHUTTER_COLORS){
        return;
    }

    axios.get("/shutter/readShutterColors")
        .then((response) => {
            ShutterStore._shutterColors = response.data.colors;
            ShutterStore.emitShutterColorsChange()
        })
});

dispatcher.register((data) => {
    if(data.action.actionType !== ShutterConstants.REFRESH_SHUTTER_MATS){
        return;
    }

    axios.get("/shutter/readShutterMats")
        .then((response) => {
            ShutterStore._shutterMats = response.data.mats;
            ShutterStore.emitShutterMatsChange()
        })
});

export default dispatcher;
