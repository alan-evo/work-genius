// Styles
import './PTO-Table.css';
// Libraries
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
// Constants
import {
    PENDING,
    APPROVED,
    DENIED,
    CANCEL_REQUEST_PENDING,
    CANCEL_REQUEST_APPROVED
} from '../../constants/pto-constants';
import Table from '../A10-UI/Table/Table';
import Th from '../A10-UI/Table/Th';
import Td from '../A10-UI/Table/Td';
import RestoreButton from '../A10-UI/Button/Restore-Button';
import ApproveButton from '../A10-UI/Button/Approve-Button';
import DenyButton from '../A10-UI/Button/Deny-Button';

let TableHeaders = ({ titleKeyMap, onSortHandler, sortBy, enableSort }) => {
    let headerHtml = titleKeyMap.map((headerObj, index) => {
        let header = headerObj.title;
        const ascendingButtonClassNames = classnames('glyphicon glyphicon-menu-up', {
            'hide': sortBy.category !== header || sortBy.status !== 1
        });
        const descendingButtonClassNames = classnames('glyphicon glyphicon-menu-down', {
            'hide': sortBy.category !== header || sortBy.status !== -1
        });
        let filterIconHtml = (<span></span>);
        if (enableSort) {
            filterIconHtml = (
                <span data-name={header}>
                    <i
                        className={ascendingButtonClassNames}
                        data-name={header}>
                    </i>
                    <i
                        className={descendingButtonClassNames}
                        data-name={header}>
                    </i>
                </span>
            );
        }

        return (
            <Th
                key={index}
                className="pto-table__header"
                data-name={header}
                onClick={onSortHandler}>
                <span data-name={header}>{header}</span>
                {filterIconHtml}
            </Th>
        );
    });
    return (
        <thead>
            <tr>
                {headerHtml}
            </tr>
        </thead>
    );
};

let TableBody = ({ data, titleKeyMap, onStatusUpdateHandler, isUserAdmin, currentUserName }) => {
    let bodyHtml = (
        <tr>
            <Td
                colSpan={titleKeyMap.length}
                className="pto-table__body--empty">
                No Match Result!
            </Td>
        </tr>
    );

    if (data.length > 0) {
        bodyHtml = data.map((task, bodyIndex) => {
            const cellHtml = titleKeyMap.map((header, cellIndex) => {
                let actionsHTML;
                if (header['key'] === 'id') {
                    if (task.status === PENDING) {
                        if (isUserAdmin && task['applicant'] === currentUserName) {
                            actionsHTML = (
                                <Td key={cellIndex}>
                                    <ApproveButton onClick={() => {onStatusUpdateHandler({...task, status: APPROVED});}} title="Approve"/>
                                    <DenyButton onClick={() => {onStatusUpdateHandler({...task, status: DENIED});}} title="Deny" />
                                    <RestoreButton onClick={() => {onStatusUpdateHandler({...task, status: CANCEL_REQUEST_PENDING});}} title="Cancel Request" />
                                </Td>
                            );
                        } else if (isUserAdmin) {
                            actionsHTML = (
                                <Td key={cellIndex}>
                                    <ApproveButton onClick={() => {onStatusUpdateHandler({...task, status: APPROVED});}} title="Approve" />
                                    <DenyButton onClick={() => {onStatusUpdateHandler({...task, status: DENIED});}} title="Deny" />
                                </Td>
                            );
                        } else if (task['applicant'] === currentUserName) {
                            actionsHTML = (
                                <Td key={cellIndex}>
                                    <RestoreButton onClick={() => {onStatusUpdateHandler({...task, status: CANCEL_REQUEST_PENDING});}} title="Cancel Request" />
                                </Td>
                            );
                        } else {
                            actionsHTML = (
                                <Td key={cellIndex}>
                                    No actions!
                                </Td>
                            );
                        }
                    } else if (task.status === CANCEL_REQUEST_PENDING && isUserAdmin) {
                        actionsHTML = (
                            <Td key={cellIndex}>
                                <ApproveButton onClick={() => {onStatusUpdateHandler({...task, status: CANCEL_REQUEST_APPROVED});}} title="Approve" />
                            </Td>
                        );
                    } else if (task.status === APPROVED && task['applicant'] === currentUserName) {
                        actionsHTML = (
                            <Td key={cellIndex}>
                                <RestoreButton onClick={() => {onStatusUpdateHandler({...task, status: CANCEL_REQUEST_PENDING});}} title="Cancel Request" />
                            </Td>
                        );
                    } else {
                        actionsHTML = (
                            <Td key={cellIndex}>
                                No actions!
                            </Td>
                        );
                    }
                    return actionsHTML;
                } else if (header['key'] === 'start_time' || header['key'] === 'end_time' || header['key'] === 'apply_time') {
                    actionsHTML = (
                        <Td key={cellIndex}>
                            {moment(+task[header['key']]).format('YYYY-MM-DD HH:mm')}
                        </Td>
                    );
                    return actionsHTML;
                }

                return (
                    <Td key={cellIndex}>{task[header['key']]}</Td>
                );
            });

            return (
                <tr key={bodyIndex}>
                    {cellHtml}
                </tr>
            );
        });
    }

    return (
        <tbody className="pto-table__body">
            {bodyHtml}
        </tbody>
    );
};

class PTOTable extends Component {
    constructor(props) {
        super(props);
        this._onSortHandler = ::this._onSortHandler;
    }
    _onSortHandler(e) {
        const category = e.target.dataset.name;
        this.props.onSortHandler(category);
    }
    render() {
        return (
            <div className="pto-table">
                <Table className="pto-table__table-content">
                    <TableHeaders
                        {...this.props}
                        onSortHandler={this._onSortHandler} />
                    <TableBody {...this.props} />
                </Table>
            </div>
        );
    }
}

PTOTable.propTypes = {
    data                 : PropTypes.array.isRequired,
    titleKeyMap          : PropTypes.array.isRequired,
    enableSort           : PropTypes.bool,
    isUserAdmin          : PropTypes.bool,
    sortBy               : PropTypes.object,
    onSortHandler        : PropTypes.func,
    onStatusUpdateHandler: PropTypes.func,
    onDeleteHandler      : PropTypes.func
};

PTOTable.defaultProps = {
    enableSort: false,
    sortBy: {
        category: '',
        status: 0
    },
    onSortHandler        : () => {},
    onStatusUpdateHandler: () => {},
    onDeleteHandler      : () => {}
};

export default PTOTable;
