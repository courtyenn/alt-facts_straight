import alt from '../alt';
import Immutable from 'immutable';
import IdGenerator from '../IdGenerator.js';
import Answer from '../models/answer.js';
import DragDropManger from '../DragDropManager';

const _dragDropManager = new DragDropManger();
export default _dragDropManager;

class AppStore{
	constructor(){
		// this.answer = new Answer(1, 'cat');
		this.registerDroppable = _dragDropManager.registerDroppable;
		this.dropTargetIds = Immutable.List([100]);
	}
}

module.exports = alt.createStore(AppStore, 'AppStore');
