import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Form, Input, Checkbox, Select } from 'antd';

import { selectKeypairs } from 'app/selectors/nova';
import { selectSecurityGroups } from 'app/selectors/neutron';

import {
  filledInstance,
  choosedKeypair,
  choosedSecurityGroup
} from 'features/instance/actions';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class Security extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 4 },
      wrapperCol: {span: 8}
    };

    if (this.props.keypairs.loading ||
        this.props.securityGroups.loading) {
      return (
        <Spin />
      )
    } else {
      let optionArrs = [];
      this.props.keypairs.data.forEach(item => {
        optionArrs.push(
            <Option
              key={item.keypair.name}
              value={item.keypair.name}
            >
              {item.keypair.name}
            </Option>
        )
      });

      let checkboxArrs = [];
      this.props.securityGroups.data.forEach(item => {
        checkboxArrs.push(
          item.name
        )
      });

      return (
        <Form>
          <FormItem
            {...formItemLayout}
            label="主机名">
            {
              getFieldDecorator('input')(
                <Input />
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="SSH密钥对">
            {getFieldDecorator('select')(
              <Select>
                {optionArrs}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="安全组">
            {getFieldDecorator('radio-group')(
              <CheckboxGroup
                options={checkboxArrs}
              >
              </CheckboxGroup>
            )}
          </FormItem>
        </Form>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  keypairs: selectKeypairs(state),
  securityGroups: selectSecurityGroups(state)
});

Security = Form.create({
  onFieldsChange (props, changedFields) {
    let fieldName = Object.keys(changedFields);
    if (fieldName[0] === 'input') {
      props.dispatch(filledInstance(changedFields['input'].value));
    } else if (fieldName[0] === 'select') {
      props.dispatch(choosedKeypair(changedFields['select'].value));
    } else if (fieldName[0] === 'radio-group') {
      props.dispatch(choosedSecurityGroup(changedFields['radio-group'].value));
    }
  }
})(Security);
export default connect(mapStateToProps, null)(Security);