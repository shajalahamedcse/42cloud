import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './Login.css';
import { login } from './actions';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(login(values));
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.login}>
        <Form onSubmit={this.handleSubmit} className={styles.form}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.btnLogin}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);
export default connect(null, null)(Login);