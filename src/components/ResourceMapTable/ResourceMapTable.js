
import React, { Component, PropTypes } from 'react';

// Constants
import Table from '../A10-UI/Table/Table';

import ResourceMapTableHeader from './ResourceMapTableHeader.js';
import ResourceMapTableBody from './ResourceMapTableBody.js';
import ResourceMapModalWorkLog from './ResourceMapModalWorkLog.js';

class ResourceMapTable extends Component {

	render() {

		const {
			startDate,
			totalDays,
			data,
			show,
			onModalHander,
            onSubmitStatus,
            onSubmitMulti,
            onDeleteItemHander,
            upsertWorklogItem,
            defaultModalInfos
		} = this.props;
		return (
			<div>
				<Table className="bug-review-table">
					<ResourceMapTableHeader
						startDate={startDate}
						totalDays={totalDays}
					/>
					<ResourceMapTableBody
                        data={data}
                        startDate={startDate}
                        onModalHander={onModalHander}
                        onSubmitStatus={onSubmitStatus}
                        onDeleteItemHander={onDeleteItemHander}
                    />
                </Table>
                <ResourceMapModalWorkLog
                	show={show}
                	onModalHander={onModalHander}
                    onModalSubmit={upsertWorklogItem}
                    onModalSubmitMulti={onSubmitMulti}
                    defaultModalInfos={defaultModalInfos}
                />
            </div>
        );
	};
}

ResourceMapTable.propTypes = {
    startDate          : PropTypes.string.isRequired,
    totalDays          : PropTypes.number.isRequired,
    show               : PropTypes.bool.isRequired,
    data               : PropTypes.array.isRequired,
    defaultModalInfos  : PropTypes.object.isRequired,
    upsertWorklogItem  : PropTypes.func.isRequired,
    onModalHander      : PropTypes.func.isRequired,
    onSubmitStatus     : PropTypes.func.isRequired,
    onSubmitMulti      : PropTypes.func.isRequired,
    onDeleteItemHander : PropTypes.func.isRequired
};

ResourceMapTable.defaultProps = {
	startDate          : new Date(),
	totalDays          : 10,
	show               : false,
	data               : [],
    defaultModalInfos  : {}
};

export default ResourceMapTable;