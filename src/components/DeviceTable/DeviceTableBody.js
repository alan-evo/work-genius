
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import Td from '../A10-UI/Table/Td';
import { Button, ButtonGroup } from 'react-bootstrap';
import Select from 'react-select';

class DeviceTableBody extends Component {

  static propTypes = {
    data             : PropTypes.array.isRequired,
    releases         : PropTypes.object.isRequired,
    builds           : PropTypes.array.isRequired,
    upgradeDevice    : PropTypes.func.isRequired,
    updateDevice     : PropTypes.func.isRequired,
    currentUser      : PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      isEdit: {},
      data: [],
      releaseOptions: [],
      buildOptions: {},
      vcsLabel: [
        {label: 'Master', value: 'Master'},
        {label: 'Blade', value: 'Blade'},
        {label: 'No', value: 'No'}
      ],
      yesOrNo: [
        {label: 'Yes', value: 'Yes'},
        {label: 'No', value: 'No'},
        {label: 'Yes(If necessary)', value: 'Yes(If necessary)'}
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data, releases } = nextProps;
    this.setState( {data: data });
    const releaseOptions = [];
    const buildOptions = {};
    for (let release in releases) {
      if (releases.hasOwnProperty(release)) {
        releaseOptions.push({label: release, value: release});
        const builds = releases[release];
        const options = [];
        for (let build in builds) {
          if (builds.hasOwnProperty(build)) {
            options.push({label: build, value: build});
          }
        }
        buildOptions[release] = options;
      }
    }
    this.setState({
      releaseOptions: releaseOptions,
      buildOptions: buildOptions
    });
  }

  changeRelease(item, value) {
    const data = this.state.data;
    const itemIn = data.find((one) => {
      return one.ip === item.ip;
    });
    if (!itemIn._release) {
      itemIn._release = itemIn.release;
    }
    if (!itemIn._build) {
      itemIn._build = itemIn.build;
    }
    if (itemIn._release !== value) {
      itemIn.build = '';
    }
    itemIn.release = value;
    this.setState({data: data});
  }

  changeBuild(item, value) {
    const data = this.state.data;
    const itemIn = data.find((one) => {
      return one.ip === item.ip;
    });
    if (!itemIn._build) {
      itemIn._build = itemIn.build;
    }
    itemIn.build = value;
    this.setState({data: data});
  }

  upgradeAxServer(item) {
    const {upgradeDevice} = this.props;
    upgradeDevice(item);
    if ((item._release && item._release !== item.release)
        || (item._build && String(item.build) !== String(item._build))) {
      // const {upgradeDevice} = this.props;
      upgradeDevice(item);
    }
  }

  changeSelectConfig(row, field, value) {
    // let value = event.target.value;
    row[field] = value;
  }

  changeInputConfig(row, field, event) {
    let value = event.target.value;
    row[field] = value;
  }

  toEditItem(item) {
    const isEdit = this.state.isEdit;
    isEdit[item.ip] = true;
    this.setState({isEdit: isEdit});
  }

  toApplyItem(item) {
    const isEdit = this.state.isEdit;
    isEdit[item.ip] = false;
    this.setState({isEdit: isEdit});

    const { updateDevice } = this.props;
    updateDevice(item);
  }

  toLock(item, lock) {
    const data = this.state.data;
    const itemIn = data.find((one) => {
      return one.ip === item.ip;
    });

    const { updateDevice, currentUser } = this.props;

    if (lock) {
      itemIn.locked_by = currentUser.nickname;
      itemIn.locked_date = moment().format('x');
    } else {
      itemIn.locked_by = '';
      itemIn.locked_date = '';
    }

    updateDevice(itemIn);

    this.setState({ data: data });

  }

  render() {
    const { currentUser } = this.props;
    const username = currentUser.nickname;
    const wellStyles = {margin: '5px auto', width: '100%'};

    const bodyHtml = this.state.data.map((row, index) => {
      return (
        <tr key={index}>
          <Td>{row.ip}</Td>
          <Td>{row.address}</Td>
          <Td>{row.apc && (
            <div>
              ID:&nbsp;{row.apc.id}&nbsp;&nbsp;
              <a href={row.apc.url} target="_black">APC</a>
              <br />
              {row.apc.username}
              <br />
              {row.apc.password}
            </div>)}</Td>
          <Td>
            { !this.state.isEdit[row.ip]
              ? (<span>{row.console}</span>)
              : (<input
                    className="form-control"
                    type="text"
                    defaultValue={row.console}
                    onChange={ ::this.changeInputConfig.bind(this, row, 'console') }
                    ref={row.ip + '-vcs'}/>)}
          </Td>
          <Td>
            { !this.state.isEdit[row.ip]
              ? (<span>{row.model}</span>)
              : (<input
                    className="form-control"
                    type="text"
                    defaultValue={row.model}
                    onChange={ ::this.changeInputConfig.bind(this, row, 'model') }
                    ref={row.ip + '-vcs'}/>)}
          </Td>
          <Td>
            { !this.state.isEdit[row.ip]
              ? (<span>{row.product_id_magic}</span>)
              : (<Select
                  className="text-left"
                  value={ row.product_id_magic }
                  options={ this.state.yesOrNo }
                  onChange={ ::this.changeSelectConfig.bind(this, row, 'product_id_magic') }/>) }
          </Td>
          <Td>
            { !this.state.isEdit[row.ip]
              ? (<span>{row.vcs_configured}</span>)
              : (<Select
                  className="text-left"
                  value={ row.vcs_configured }
                  options={ this.state.vcsLabel }
                  onChange={ ::this.changeSelectConfig.bind(this, row, 'vcs_configured') }/>) }
          </Td>
          <Td>
            { !this.state.isEdit[row.ip]
              ? (<span>{row.is_e2e_machine}</span>)
              : (<Select
                  className="text-left"
                  value={ row.is_e2e_machine }
                  options={ this.state.yesOrNo }
                  onChange={ ::this.changeSelectConfig.bind(this, row, 'is_e2e_machine') }/>) }
          </Td>
          <Td>
            { !this.state.isEdit[row.ip]
              ? (<span>{row.can_send_traffic}</span>)
              : (<Select
                  className="text-left"
                  value={ row.can_send_traffic }
                  options={ this.state.yesOrNo }
                  onChange={ ::this.changeSelectConfig.bind(this, row, 'can_send_traffic') }/>) }
          </Td>
          <Td>
            <Select
              className="text-left hidden"
              value={ row.release }
              options={ this.state.releaseOptions }
              onChange={ ::this.changeRelease.bind(this, row) }/>

            { !this.state.isEdit[row.ip]
              ? (<span>{row.release}</span>)
              : (<Select
                    className="text-left"
                    value={ row.release }
                    options={ this.state.releaseOptions }
                    onChange={ ::this.changeRelease.bind(this, row) }/>) }
          </Td>
          <Td>
            <Select
              className="text-left hidden"
              value={row.build}
              options={ this.state.buildOptions[row.release] }
              onChange={ ::this.changeBuild.bind(this, row) }/>
            <Button
              className="hidden"
              style={wellStyles}
              bsSize="xsmall"
              bsStyle="success"
              onClick={ ::this.upgradeAxServer.bind(this, row) }>
                Upgrade</Button>

            { !this.state.isEdit[row.ip]
              ? (<span>{row.build}</span>)
              : (<Select
                    className="text-left"
                    value={row.build}
                    options={ this.state.buildOptions[row.release] }
                    onChange={ ::this.changeBuild.bind(this, row) }/>) }
          </Td>
          <Td>
            <ButtonGroup>
              { !this.state.isEdit[row.ip]
                ? (<Button bsSize="xsmall" bsStyle="primary"
                    onClick={ ::this.toEditItem.bind(this, row) }>Edit</Button>)
                : (<Button bsSize="xsmall" bsStyle="primary"
                    onClick={ ::this.toApplyItem.bind(this, row) }>Apply</Button>) }
              { (!!row.locked_by && row.locked_by !== '' && row.locked_by !== 'N/A' )
                ? (username === row.locked_by
                  ?(<Button bsSize="xsmall" bsStyle="danger"
                      onClick={ ::this.toLock.bind(this, row, false)}>Unlock</Button>)
                  :(<Button bsSize="xsmall" bsStyle="warning">{row.locked_by}</Button>))
                : (<Button bsSize="xsmall" bsStyle="success"
                    onClick={ ::this.toLock.bind(this, row, true)}>Lock</Button>)}
            </ButtonGroup>
          </Td>
        </tr>
      );
    });
    return (
      <tbody>
        {bodyHtml}
      </tbody>
    );
  };
}


DeviceTableBody.defaultProps = {
  data: []
};

export default DeviceTableBody;