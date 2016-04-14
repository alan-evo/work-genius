import React, { Component, PropTypes } from 'react';

// Components
import {
	Modal
} from 'react-bootstrap';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

let ModalHeader = () => {
	return (
		<Modal.Header closeButton>
            <Modal.Title>Append A Work Log</Modal.Title>
        </Modal.Header>
	);
};

let ModalFooter = ({onSubmit, onCancelHandler}) => {
	return (
		<Modal.Footer>
            <RaisedButton label="Apply" secondary={true} onClick={onSubmit} />
            <RaisedButton label="Cancel" onClick={onCancelHandler} />
        </Modal.Footer>
	);
};

class ResourceMapModalWorkLog extends Component {
	constructor() {
		super();
		// this.setState({});
		this._onCloseModelHandler = ::this._onCloseModelHandler;
		this._onSubmitFormData = ::this._onSubmitFormData;
	}

	_onCloseModelHandler() {
		const { onModalHander } = this.props;
		onModalHander(false, {});
	}

	_onSubmitFormData() {
		const { workLogField, processField } = this.refs;
		const { defaultModalInfos, onModalSubmit } = this.props;

		let worklogValue = workLogField.getValue();
		let processValue = processField.getValue();
		// let tag = this.state.tag;
		// console.log(tag);
		let tag = '';
		let newItem = {
			tag: tag,
			content: worklogValue,
			process: processValue,
			id: defaultModalInfos.id,
			employee_id: defaultModalInfos.userId,
			date: defaultModalInfos.date
		};

		onModalSubmit(newItem);
		this._onCloseModelHandler();
	}

	_onSelectTagColor(e) {
		let tag = e.target.getAttribute('data-tag');
		console.log(tag);
	}


	render() {
		const {
			show,
			defaultModalInfos
		} = this.props;

		defaultModalInfos.process = defaultModalInfos.process ? defaultModalInfos.process : 0;

		return (
			<Modal show={show} onHide={this._onCloseModelHandler}>
				<ModalHeader />
				<Modal.Body>
				<form className="form-horizontal">
					<div className="form-group">
						<label className="col-xs-3 control-label">Work Log</label>
						<div className="col-xs-9">
							<TextField
								className="text-area-style"
								multiLine={true}
								rowsMax={6}
								defaultValue={defaultModalInfos.content}
								rows={3}
								ref="workLogField"
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-xs-3 control-label">Process</label>
						<div className="col-xs-9">
							<TextField
								type="number"
								min="0"
								max="100"
								className="text-area-style"
								defaultValue={defaultModalInfos.process}
								ref="processField"
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-xs-3 control-label">Tag Color</label>
						<div className="col-xs-9">
							<div className="event-tag">
							<span><i className="material-icons">done</i></span>
	                        	<span onClick={this._onSelectTagColor} data-tag="bgm-teal"   className="bgm-teal"/>
	                            <span onClick={this._onSelectTagColor} data-tag="bgm-red"    className="bgm-red"/>
	                            <span onClick={this._onSelectTagColor} data-tag="bgm-pink"   className="bgm-pink"/>
	                            <span onClick={this._onSelectTagColor} data-tag="bgm-blue"   className="bgm-blue"/>
	                            <span onClick={this._onSelectTagColor} data-tag="bgm-lime"   className="bgm-lime"/>
	                            <span onClick={this._onSelectTagColor} data-tag="bgm-green"  className="bgm-green"/>
	                            <span onClick={this._onSelectTagColor} data-tag="bgm-cyan"   className="bgm-cyan"/>
	                            <span onClick={this._onSelectTagColor} data-tag="bgm-orange" className="bgm-orange"/>
	                            <span onClick={this._onSelectTagColor} data-tag="bgm-purple" className="bgm-purple"/>
	                            <span onClick={this._onSelectTagColor} data-tag="bgm-gray"   className="bgm-gray"/>
	                            <span onClick={this._onSelectTagColor} data-tag="bgm-black"  className="bgm-black"/>
	                        </div>
						</div>
                    </div>
                </form>
				</Modal.Body>
				<ModalFooter onSubmit={this._onSubmitFormData} onCancelHandler={this._onCloseModelHandler}/>
			</Modal>
		);
	}
}

ResourceMapModalWorkLog.propTypes = {
	show               : PropTypes.bool.isRequired,
	defaultModalInfos  : PropTypes.object.isRequired,
	onModalSubmit      : PropTypes.func.isRequired,
	onModalHander      : PropTypes.func.isRequired
};

ResourceMapModalWorkLog.defaultProps = {
	show                   : false,
	defaultModalInfos      : {},
	onModalSubmit          : () => {},
	onCancelHandler        : () => {}
};

export default ResourceMapModalWorkLog;
