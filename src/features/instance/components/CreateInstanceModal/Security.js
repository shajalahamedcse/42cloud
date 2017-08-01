import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Form, Input, Radio, Select } from 'antd';

import { selectKeypairs } from 'app/selectors/nova';
import { selectSecurityGroups } from 'app/selectors/neutron';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

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
      let selectArrs = [
        <Select key="sl">
          <Option value="ssh1">ssh1</Option>
          <Option value="ssh2">ssh2</Option>
        </Select>
      ];

      let radioGroupArrs = [
        <RadioGroup key="rg">
          <Radio value="sg1">s1</Radio>
          <Radio value="sg2">s2</Radio>
          <Radio value="sg3">s3</Radio>
        </RadioGroup>
      ];

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
            {
              getFieldDecorator('select')(
                <div>
                {selectArrs}
                </div>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="安全组">
            {
              getFieldDecorator('radio-group')(
                <div>
                {radioGroupArrs}
                </div>
              )
            }
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

Security = Form.create()(Security);
export default connect(mapStateToProps, null)(Security);